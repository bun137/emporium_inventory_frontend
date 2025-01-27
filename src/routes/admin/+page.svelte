<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';

    let unapprovedUsers = [];
    let errorMessage = '';

    // Fetch unapproved users
// Fetch unapproved users
async function fetchUnapprovedUsers() {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Unauthorized! Redirecting to login.');
            goto('/signin');
            return;
        }

        const response = await fetch('http://localhost:3000/api/admin/users', {
            headers: { Authorization: `Bearer ${token}` }
        });

        if (response.ok) {
            const data = await response.json();
            // Handle null or undefined data
            if (data && Array.isArray(data.users)) {
                unapprovedUsers = data.users.map(user => ({
                    ...user,
                    isApproved: false,
                }));
            } else {
                unapprovedUsers = []; // Default to an empty list if no users are returned
            }
        } else {
            const errorData = await response.json();
            errorMessage = errorData.error || 'Failed to fetch unapproved users.';
        }
    } catch (error) {
        console.error('Error fetching unapproved users:', error);
        errorMessage = 'Unable to connect to the server.';
    }
}

    // Toggle user approval
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
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ userId: user.id })
            });

            if (response.ok) {
                user.isApproved = !user.isApproved; // Toggle approval locally
                alert(`${user.name} is now ${user.isApproved ? 'approved' : 'unapproved'}`);
            } else {
                const errorData = await response.json();
                alert(errorData.error || 'Failed to update user approval.');
            }
        } catch (error) {
            console.error('Error updating user approval:', error);
            alert('Failed to update user approval.');
        }
    }

    onMount(fetchUnapprovedUsers);
</script>

<div class="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
    <h1 class="text-4xl font-bold mb-8">Admin Dashboard</h1>

    {#if errorMessage}
        <p class="text-red-500 font-semibold text-center mb-6">{errorMessage}</p>
    {/if}

    <h2 class="text-2xl font-semibold mb-4">Unapproved Users</h2>

    <ul class="w-full max-w-3xl space-y-4">
        {#each unapprovedUsers as user}
            <li class="flex items-center justify-between bg-gray-800 rounded-lg p-4 shadow-md">
                <div>
                    <p class="text-lg font-medium">{user.name}</p>
                    <p class="text-sm text-gray-400">{user.email}</p>
                </div>
                <div class="flex items-center space-x-3">
                    <label for="toggle-{user.id}" class="text-sm font-medium">
                        Approve Access to Saree Details:
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
</div>
