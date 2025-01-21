<script>
	let email = '';
	let password = '';
	let errorMessage = '';
	let successMessage = '';

	async function handleSubmit() {
		errorMessage = '';
		successMessage = '';

		const response = await fetch('/api/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, password })
		});

		if (response.ok) {
			successMessage = 'Login successful!';
		} else {
			const data = await response.json();
			errorMessage = data.error || 'An error occurred';
		}
	}
</script>

<div class="mx-auto mt-8 max-w-4xl rounded bg-gray-900 p-4 text-gray-200 shadow-lg">
	<h1 class="mb-6 text-center text-3xl font-bold">Murali Saree Emporium Inventory System</h1>
	<div class="grid gap-6 pt-4 sm:grid-cols-1 md:grid-cols-2">
		<a
			href="/signup"
			class="flex transform flex-col items-center justify-center rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 p-6 text-white shadow-lg transition-transform hover:scale-105"
		>
			<div class="mb-2 text-4xl">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="2"
					stroke="currentColor"
					class="h-10 w-10"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M16 7v6m0 0v6m0-6h6m-6 0H10M12 18v4m0-4H8m4 0h4"
					/>
				</svg>
			</div>
			<p class="text-xl font-bold">Sign Up</p>
			<p class="text-sm">Don't have an account? Create one now!</p>
		</a>

		<a
			href="/signin"
			class="flex transform flex-col items-center justify-center rounded-lg bg-gradient-to-r from-green-500 to-teal-400 p-6 text-white shadow-lg transition-transform hover:scale-105"
		>
			<div class="mb-2 text-4xl">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="2"
					stroke="currentColor"
					class="h-10 w-10"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M15 12h3l-3 3m0-3l-3-3m3 3H8m4-6a4 4 0 100 8 4 4 0 000-8z"
					/>
				</svg>
			</div>
			<p class="text-xl font-bold">Sign In</p>
			<p class="text-sm">Already have an account? Log in now!</p>
		</a>
	</div>
</div>
