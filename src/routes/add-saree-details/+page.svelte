<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	export let data;

	const { user } = data;

	let material = '';
	let price = '';
	let inDate = '';
	let weaver = '';
	let dyeType = '';
	let ikatType = '';

	export async function load() {
		console.log('Load function executed for saree-details');
		return {};
	}

	// Redirect if token is not present
	onMount(() => {
		const token = localStorage.getItem('token');
		console.log('Token in saree-details:', token);

		Redirect to sign-in if no token is found
		if (!token) {
			alert('Unauthorized! Please log in.');
			goto('/'); // Redirect to home
		}
	});

	const handleSubmit = async (event) => {
		event.preventDefault();

		const token = localStorage.getItem('token');

		const response = await fetch('/api/sarees', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify({ material, price, inDate, weaver, dyeType, ikatType })
		});

		if (response.ok) {
			alert('Saree details submitted successfully!');
			material = '';
			price = '';
			inDate = '';
			weaver = '';
			dyeType = '';
			ikatType = '';
		} else {
			alert('Error submitting details');
		}
	};
</script>

<div class="flex min-h-screen items-center justify-center bg-gray-900">
	<form on:submit={handleSubmit} class="w-full max-w-lg rounded-lg bg-gray-800 p-8 shadow-md">
		<h2 class="mb-6 text-center text-2xl font-bold text-white">Add Saree Details</h2>

		<div class="mb-4">
			<label for="material" class="block text-sm font-medium text-gray-300">Material</label>
			<select
				id="material"
				bind:value={material}
				class="mt-1 block w-full rounded-md border border-gray-600 bg-gray-700 p-2 text-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
				required
			>
				<option value="Cotton">Cotton</option>
				<option value="Mulberry Silk">Mulberry Silk</option>
				<option value="Tussar Silk">Tussar Silk</option>
				<option value="Erri Silk">Erri Silk</option>
				<option value="Linen">Linen</option>
				<option value="Khadi">Khadi</option>
			</select>
		</div>

		<div class="mb-4">
			<label for="price" class="block text-sm font-medium text-gray-300">Price</label>
			<input
				type="number"
				id="price"
				bind:value={price}
				class="mt-1 block w-full rounded-md border border-gray-600 bg-gray-700 p-2 text-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
				required
			/>
		</div>

		<div class="mb-4">
			<label for="inDate" class="block text-sm font-medium text-gray-300">In Date</label>
			<input
				type="date"
				id="inDate"
				bind:value={inDate}
				class="mt-1 block w-full rounded-md border border-gray-600 bg-gray-700 p-2 text-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
				required
			/>
		</div>

		<div class="mb-4">
			<label for="weaver" class="block text-sm font-medium text-gray-300">Weaver</label>
			<input
				type="text"
				id="weaver"
				bind:value={weaver}
				class="mt-1 block w-full rounded-md border border-gray-600 bg-gray-700 p-2 text-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
			/>
		</div>

		<div class="mb-4">
			<label for="dyeType" class="block text-sm font-medium text-gray-300">Dye Type</label>
			<select
				id="dyeType"
				bind:value={dyeType}
				class="mt-1 block w-full rounded-md border border-gray-600 bg-gray-700 p-2 text-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
				required
			>
				<option value="Natural">Vegetable</option>
				<option value="Vat Dye">Vat Dye</option>
				<option value="Aso Free Dye">Aso Free Dye</option>
			</select>
		</div>

		<div class="mb-4">
			<label for="ikatType" class="block text-sm font-medium text-gray-300">Ikat Type</label>
			<select
				id="ikatType"
				bind:value={ikatType}
				class="mt-1 block w-full rounded-md border border-gray-600 bg-gray-700 p-2 text-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
				required
			>
				<option value="Single Ikat">Single Ikat</option>
				<option value="Double Ikat">Double Ikat</option>
			</select>
		</div>

		<button
			type="submit"
			class="w-full rounded-lg bg-sky-600 px-4 py-2 text-white shadow-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
		>
			Submit
		</button>
	</form>
</div>
