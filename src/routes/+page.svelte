<script>
  let material = '';
  let price = '';
  let inDate = '';

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('/api/sarees', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ material, price, inDate }),
    });
    if (response.ok) {
      alert('Saree details submitted successfully!');
      material = '';
      price = '';
      inDate = '';
    } else {
      alert('Error submitting details');
    }
  };
</script>

<div class="min-h-screen bg-gray-100 flex items-center justify-center">
  <form
    on:submit={handleSubmit}
    class="w-full max-w-lg bg-white p-8 rounded-lg shadow-md"
  >
    <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">
      Add Saree Details
    </h2>

    <div class="mb-4">
      <label for="material" class="block text-sm font-medium text-gray-700">
        Material
      </label>
      <input
        type="text"
        id="material"
        bind:value={material}
        class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        required
      />
    </div>

    <div class="mb-4">
      <label for="price" class="block text-sm font-medium text-gray-700">
        Price
      </label>
      <input
        type="number"
        id="price"
        bind:value={price}
        class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        required
      />
    </div>

    <div class="mb-4">
      <label for="inDate" class="block text-sm font-medium text-gray-700">
        In Date
      </label>
      <input
        type="date"
        id="inDate"
        bind:value={inDate}
        class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        required
      />
    </div>

    <button
      type="submit"
      class="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      Submit
    </button>
  </form>
</div>

