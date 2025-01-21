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

<div class="mx-auto mt-8 max-w-md rounded bg-gray-900 p-4 text-gray-200 shadow-lg">
	<h1 class="mb-2 p-4 text-center text-3xl font-bold">Murali Saree Emporium Inventory System</h1>
	<div class="m-2 grid grid-cols-2 p-4">
		<a
			href="/signup"
			class="m-4 block max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
			>Don't have an Account? Sign Up</a
		>

		<a
			href="/signin"
			class="m-4 block max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
			>Have an account? Sign In</a
		>
	</div>
</div>
