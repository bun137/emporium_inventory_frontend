<script>
	import { goto } from '$app/navigation';
	let email = '';
	let password = '';
	let errorMessage = '';
	let successMessage = '';

	async function handleSubmit() {
		try {
			const response = await fetch('http://localhost:3000/api/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, password })
			});

			if (response.ok) {
				const data = await response.json();
				console.log('Login successful, token:', data.token);

				// Store token in both cookie and localStorage
				document.cookie = `token=${data.token}; Path=/; SameSite=Strict`;
				localStorage.setItem('token', data.token);

				// Decode the payload from JWT to access userId and role
				const payload = JSON.parse(atob(data.token.split('.')[1]));
				console.log('Decoded payload:', payload);

				// Fetch user's current approval status
				const approvalResponse = await fetch('http://localhost:3000/api/validate-token', {
					method: 'GET',
					headers: {
						Authorization: `Bearer ${data.token}`,
						'Cache-Control': 'no-cache'
					},
					credentials: 'include'
				});

				if (approvalResponse.ok) {
					const approvalData = await approvalResponse.json();
					console.log('Fetched approval status:', approvalData);

					if (!approvalData.isApproved) {
						goto('/pending-approval');
					} else if (approvalData.role === 'admin') {
						// small delay to make sure that the token is saved properly
						await new Promise((resolve) => setTimeout(resolve, 100));
						await goto('/admin');
					} else if (approvalData.role === 'user') {
						goto('/dashboard');
					} else {
						errorMessage = 'Unauthorized access. Please contact support.';
					}
				} else {
					errorMessage = 'Unable to verify user status. Please try again later.';
				}
			} else {
				const data = await response.json();
				errorMessage = data.error || 'An error occurred during login.';
			}
		} catch (error) {
			console.error('Unexpected error:', error);
			errorMessage = 'Unable to connect to the server. Please try again later.';
		}
	}
</script>

<div class="dark mx-auto mt-8 max-w-md rounded bg-gray-900 p-4 text-gray-200 shadow-lg">
	<h2 class="text-center text-2xl font-semibold">Sign In</h2>

	{#if successMessage}
		<div class="my-3 rounded bg-green-700 p-3 text-white">{successMessage}</div>
	{/if}

	{#if errorMessage}
		<div class="my-3 rounded bg-red-700 p-3 text-white">{errorMessage}</div>
	{/if}

	<form on:submit|preventDefault={handleSubmit}>
		<div class="mb-4">
			<label for="email" class="block text-sm font-medium">Email</label>
			<input
				id="email"
				type="email"
				bind:value={email}
				class="mt-1 block w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500"
				required
			/>
		</div>

		<div class="mb-6">
			<label for="password" class="block text-sm font-medium">Password</label>
			<input
				id="password"
				type="password"
				bind:value={password}
				class="mt-1 block w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500"
				required
			/>
		</div>

		<button
			type="submit"
			class="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
		>
			Sign In
		</button>
	</form>

	<p class="mt-4 text-center text-sm">
		Don't have an account? <a href="/signup" class="text-blue-400 hover:underline">Sign Up</a>
	</p>
</div>
