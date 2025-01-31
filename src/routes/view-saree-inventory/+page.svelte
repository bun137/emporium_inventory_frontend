<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let user = null;
	let sarees = [];
	let loading = true;
	let error = null;

	async function checkUser() {
		const token = localStorage.getItem('token');
		if (!token) {
			goto('/signin');
			return;
		}

		try {
			const res = await fetch('/api/validate-token', {
				headers: { Authoriation: `Bearer ${token}` }
			});

			if (!res.ok) {
				localStorage.removeItem('token');
				goto('/signin');
				return;
			}

			user = await res.json();
			if (!user.isApproved) {
				error = 'Your account is pending approval.';
				return;
			}
		} catch (err) {
			console.error(err);
			goto('/signin');
		}
	}

	async function fetchSarees() {
		const token = localStorage.getItem('token');
		try {
			const res = await fetch('/api/sarees', {
				headers: { Authorization: `Bearer ${token}` }
			});

			if (!res.ok) throw new Error('Failed to fetch sarees');
			const data = await res.json();
			sarees = data.sarees;
		} catch (err) {
			error = err.message;
		} finally {
			loading = false;
		}
	}

	onMount(async () => {
		await checkUser();
		if (!error) await fetchSarees();
	});

	function logout() {
		localStorage.removeItem('token');
		goto('/signin');
	}
</script>

<main class="container mx-auto p-6">
	<div class="mb-6 flex items-center justify-between">
		<h1 class="text-2xl font-bold text-white">Saree Collection</h1>
		<button on:click={logout} class="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
			>Logout</button
		>
	</div>

	{#if loading}
		<p class="text-center text-gray-500">Loading sarees...</p>
	{:else if error}
		<p class="text-center text-red-500">{error}</p>
	{:else}
		<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
			<table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
				<thead
					class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400"
				>
					<tr>
						<th scope="col" class="px-6 py-3">Material</th>
						<th scope="col" class="px-6 py-3">Weaver</th>
						<th scope="col" class="px-6 py-3">Dye Type</th>
						<th scope="col" class="px-6 py-3">Ikat Type</th>
						<th scope="col" class="px-6 py-3">Price (₹)</th>
						<th scope="col" class="px-6 py-3">Date</th>
					</tr>
				</thead>
				<tbody>
					{#each sarees as saree}
						<tr
							class="border-b border-gray-200 odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:odd:bg-gray-900 dark:even:bg-gray-800"
						>
							<th
								scope="row"
								class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
								>{saree.material}</th
							>
							<td class="px-6 py-4">{saree.weaver || 'Unknown'}</td>
							<td class="px-6 py-4">{saree.dyeType}</td>
							<td class="px-6 py-4">{saree.ikatType}</td>
							<td class="px-6 py-4 font-semibold text-white">₹{saree.price}</td>
							<td class="px-6 py-4">{saree.inDate}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</main>
