<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let isLoading = true;
	let errorMessage = '';

	const actionItems = [
		{
			title: 'Add Saree Details',
			description: 'Click to add saree details',
			href: '/add-saree-details',
			image: '/images/saree1.jpeg'
		},
		{
			title: 'View Saree Inventory',
			description: 'Browse and manage your current saree inventory.',
			href: '/view-saree-inventory',
			image: '/images/saree2.jpeg'
		}
	];

	async function checkUserStatus() {
		const token = localStorage.getItem('token');
		if (!token) {
			goto('/signin');
			return;
		}

		try {
			const response = await fetch('/api/validate-token', {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`,
					'Cache-Control': 'no-cache'
				},
				credentials: 'include'
			});

			if (response.ok) {
				const data = await response.json();
				console.log('Fetched approval status:', data);

				if (!data.isApproved) {
					goto('/pending-approval');
				} else if (data.role === 'admin') {
					goto('/admin');
				}
			} 
			
		} catch (error) {
			console.error('Error validating token:', error);
			errorMessage = 'Unable to verify user status. Please try again later.';
		} finally {
			isLoading = false;
		}
	}

	onMount(() => {
		checkUserStatus();
	});
</script>

{#if isLoading}
	<div class="flex min-h-screen items-center justify-center bg-gray-900">
		<p class="text-xl text-white">Loading...</p>
	</div>
{:else if errorMessage}
	<div class="flex min-h-screen items-center justify-center bg-gray-900">
		<p class="text-xl text-red-500">{errorMessage}</p>
	</div>
{:else}
	<section class="min-h-screen bg-gray-900 px-5 py-10">
		<div class="mx-auto max-w-6xl">
			<h1 class="mb-8 text-center text-4xl font-bold text-white">Dashboard</h1>
			<div class="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
				{#each actionItems as item}
					<a
						href={item.href}
						class="  rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800"
					>
						<img
							class="h-48 w-full rounded-t-lg object-cover"
							src={item.image}
							alt={item.title}
							loading="lazy"
						/>
						<div class="p-5">
							<h5 class="mb-2 text-2xl font-bold tracking-tight text-white">{item.title}</h5>
							<p class="mb-3 font-normal text-gray-200">{item.description}</p>
						</div>
					</a>
				{/each}
			</div>
		</div>
	</section>
{/if}

<style>
	/* Custom responsive grid adjustments */
	@media (max-width: 640px) {
		.grid {
			grid-template-columns: 1fr;
		}
	}
</style>
