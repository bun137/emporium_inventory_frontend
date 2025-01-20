import { goto } from '@sveltejs/kit';
<script>
  let email = '';
  let password = '';
  let errorMessage = '';
  let successMessage = '';

  // Handle sign in form submission
  async function handleSubmit() {
    errorMessage = '';
    successMessage = '';

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      successMessage = 'Login successful!';
      goto('/dashboard');
    } else {
      const data = await response.json();
      errorMessage = data.error || 'An error occurred';
    }
  }
</script>

<div class="max-w-md mx-auto p-4 mt-8">
  <h2 class="text-2xl font-semibold text-center">Sign In</h2>

  <!-- Display success or error messages -->
  {#if successMessage}
    <div class="bg-green-500 text-white p-3 my-3 rounded">{successMessage}</div>
  {/if}
  {#if errorMessage}
    <div class="bg-red-500 text-white p-3 my-3 rounded">{errorMessage}</div>
  {/if}

  <form on:submit|preventDefault={handleSubmit}>
    <div class="mb-4">
      <label for="email" class="block text-sm font-medium">Email</label>
      <input
        id="email"
        type="email"
        bind:value={email}
        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
        required
      />
    </div>

    <div class="mb-6">
      <label for="password" class="block text-sm font-medium">Password</label>
      <input
        id="password"
        type="password"
        bind:value={password}
        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
        required
      />
    </div>

    <button
      type="submit"
      class="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      Sign In
    </button>
  </form>

  <p class="mt-4 text-center text-sm">
    Don't have an account? <a href="/signup" class="text-blue-500 hover:underline">Sign Up</a>
  </p>
</div>

