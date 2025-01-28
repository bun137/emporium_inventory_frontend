<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';

    let unapprovedUsers = [];
    let errorMessage = '';
    let isLoading = true;

    async function checkAuth() {
        const token = localStorage.getItem('token');
        if (!token) {
            goto('/signin');
            return false;
        }

        try {
            const response = await fetch('http://localhost:3000/api/validate-token', {
                headers: { 
                    Authorization: `Bearer ${token}`,
                    'Cache-Control': 'no-cache'
                }, credentials: 'include'
            });

            if (response.ok) {
                const data = await response.json();
                if (data.role !== 'admin') {
                    alert('Access denied: Admin privileges required');
                    goto('/signin');
                    return false;
                }
                return true;
            } else {
                goto('/signin');
                return false;
            }
        } catch (error) {
            console.error('Auth check error:', error);
            goto('/signin');
            return false;
        }
    }

    async function fetchUnapprovedUsers() {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                goto('/signin');
                return;
            }

            const response = await fetch('http://localhost:3000/api/admin/users', {
                headers: { 
                    Authorization: `Bearer ${token}`,
                    'Cache-Control': 'no-cache'
                }
            });

            if (response.ok) {
                const data = await response.json();
                unapprovedUsers = data.users || [];
            } else if (response.status === 401) {
                goto('/signin');
            } else {
                const errorData = await response.json();
                errorMessage = errorData.error || 'Failed to fetch unapproved users.';
            }
        } catch (error) {
            console.error('Error fetching unapproved users:', error);
            errorMessage = 'Unable to connect to the server.';
        } finally {
            isLoading = false;
        }
    }

    onMount(async () => {
        const isAuthed = await checkAuth();
        if (isAuthed) {
            await fetchUnapprovedUsers();
        }
    });

        async function toggleUserApproval(user) {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('Unauthorized! Redirecting to login.');
                goto('/signin');
                return;
            }

            const response = await fetch('http://localhost:3000/api/admin/approve-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                    'Cache-Control': 'no-cache'
                },
                body: JSON.stringify({ userId: user.id })
            });

            if (response.ok) {
                await fetchUnapprovedUsers(); // Refresh the list after approval
                alert(`${user.name} approval status updated successfully`);
            } else if (response.status === 401) {
                localStorage.removeItem('token');
                alert('Session expired. Please login again.');
                goto('/signin');
            } else {
                const errorData = await response.json();
                alert(errorData.error || 'Failed to update user approval.');
            }
        } catch (error) {
            console.error('Error updating user approval:', error);
            alert('Failed to update user approval.');
        }
    }


</script>

<div class="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
    <h1 class="text-4xl font-bold mb-8">Admin Dashboard</h1>

    {#if isLoading}
        <p class="text-gray-400">Loading...</p>
    {:else}
        {#if errorMessage}
            <p class="text-red-500 font-semibold text-center mb-6">{errorMessage}</p>
        {/if}

        <h2 class="text-2xl font-semibold mb-4">Unapproved Users</h2>

        {#if unapprovedUsers.length === 0}
            <p class="text-gray-400">No unapproved users found.</p>
        {:else}
            <ul class="w-full max-w-3xl space-y-4">
                {#each unapprovedUsers as user}
                    <li class="flex items-center justify-between bg-gray-800 rounded-lg p-4 shadow-md">
                        <div>
                            <p class="text-lg font-medium">{user.name}</p>
                            <p class="text-sm text-gray-400">{user.email}</p>
                        </div>
                        <div class="flex items-center space-x-3">
                            <label for="toggle-{user.id}" class="text-sm font-medium">
                                Approve Access:
                            </label>
                            <input 
                                id="toggle-{user.id}" 
                                type="checkbox" 
                                class="toggle-checkbox h-6 w-6 rounded bg-gray-700 text-green-500 focus:ring-green-500"
                                checked={user.isApproved} 
                                on:change={() => toggleUserApproval(user)} 
                            />
                        </div>
                    </li>
                {/each}
            </ul>
        {/if}
    {/if}
</div>
