<script>
	let material = '';
	let price = '';
	let inDate = '';
	let weaver = '';
	let dyeType = '';
	let ikatType = '';

	const handleSubmit = async (event) => {
		event.preventDefault();
		const response = await fetch('/api/sarees', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
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

<div class="flex min-h-screen items-center justify-center bg-gray-100">
	<form on:submit={handleSubmit} class="w-full max-w-lg rounded-lg bg-white p-8 shadow-md">
		<h2 class="mb-6 text-center text-2xl font-bold text-gray-800">Add Saree Details</h2>

		<!-- Material Dropdown -->
		<div class="mb-4">
			<label for="material" class="block text-sm font-medium text-gray-700"> Material </label>
			<select
				id="material"
				bind:value={material}
				class="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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

		<!-- Price Input -->
		<div class="mb-4">
			<label for="price" class="block text-sm font-medium text-gray-700"> Price </label>
			<input
				type="number"
				id="price"
				bind:value={price}
				class="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
				required
			/>
		</div>

		<!-- In Date Input -->
		<div class="mb-4">
			<label for="inDate" class="block text-sm font-medium text-gray-700"> In Date </label>
			<input
				type="date"
				id="inDate"
				bind:value={inDate}
				class="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
				required
			/>
		</div>

		<!-- Weaver Input -->
		<div class="mb-4">
			<label for="weaver" class="block text-sm font-medium text-gray-700"> Weaver </label>
			<input
				type="text"
				id="weaver"
				bind:value={weaver}
				class="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
				required
			/>
		</div>

		<!-- Dye Type Dropdown -->
		<div class="mb-4">
			<label for="dyeType" class="block text-sm font-medium text-gray-700"> Dye Type </label>
			<select
				id="dyeType"
				bind:value={dyeType}
				class="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
				required
			>
				<option value="Natural">Natural</option>
				<option value="Chemical">Chemical</option>
			</select>
		</div>

		<!-- Ikat Type Dropdown -->
		<div class="mb-4">
			<label for="ikatType" class="block text-sm font-medium text-gray-700"> Ikat Type </label>
			<select
				id="ikatType"
				bind:value={ikatType}
				class="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
				required
			>
				<option value="Single Ikat">Single Ikat</option>
				<option value="Double Ikat">Double Ikat</option>
			</select>
		</div>

		<!-- Submit Button -->
		<button
			type="submit"
			class="w-full rounded-lg bg-indigo-600 px-4 py-2 text-white shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
		>
			Submit
		</button>
	</form>
</div>
