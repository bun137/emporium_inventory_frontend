<script>
	let name = '';
	let phone = '';
	let email = '';
	let password = '';
	let errorMessage = '';
	let successMessage = '';

	async function handleSubmit() {
		errorMessage = '';
		successMessage = '';

		const response = await fetch('/api/register', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ name, phone, email, password })
		});

		if (response.ok) {
			successMessage = 'Sign up successful!';
		} else {
			const data = await response.json();
			errorMessage = data.error || 'An error occurred';
		}
	}
</script>

<div class="mx-auto mt-8 max-w-md rounded bg-gray-900 p-4 text-gray-200 shadow-lg">
	<h2 class="text-center text-2xl font-semibold">Sign Up</h2>

	{#if successMessage}
		<div class="my-3 rounded bg-green-700 p-3 text-white">{successMessage}</div>
	{/if}
	{#if errorMessage}
		<div class="my-3 rounded bg-red-700 p-3 text-white">{errorMessage}</div>
	{/if}

	<form on:submit|preventDefault={handleSubmit}>
		<div class="mb-4">
			<label for="name" class="block text-sm font-medium">Name</label>
			<input
				id="name"
				type="text"
				bind:value={name}
				class="mt-1 block w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500"
				required
			/>
		</div>

		<div class="mb-4">
			<label for="phone" class="block text-sm font-medium">Phone Number</label>
			<input
				id="phone"
				type="tel"
				bind:value={phone}
				class="mt-1 block w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500"
				required
			/>
		</div>

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
			Sign Up
		</button>
	</form>

	<p class="mt-4 text-center text-sm">
		Already have an account? <a href="/signin" class="text-blue-400 hover:underline">Sign In</a>
	</p>
</div>
