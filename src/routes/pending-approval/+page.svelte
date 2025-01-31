<script>
	let contactDetails = [
		{
			name: 'Shreya',
			email: 'gurram13775@gmail.com',
			phone: '9901618209'
		}
		// {
		//   name: "",
		//   email: "",
		//   phone: ""
		// }
	];
</script>

<div class="flex min-h-screen flex-col items-center justify-center bg-gray-900 p-8 text-center">
	<div class="max-w-md rounded-2xl bg-gray-800 p-8 text-white shadow-lg">
		<h1 class="mb-4 text-2xl font-bold">Your account is awaiting approval</h1>
		<p class="mb-4 text-gray-300">
			Please wait for an admin to review and approve your account. This process can take some time.
		</p>
		<p class="text-left text-gray-300">If you need assistance, please contact us:</p>
		<ul class="text-left text-gray-300">
			{#each contactDetails as contact}
				<li><strong>Name:</strong> {contact.name}</li>
				<li>
					<strong>Email:</strong>
					<a href={`mailto:${contact.email}`} class="text-blue-400 hover:underline"
						>{contact.email}</a
					>
				</li>
				<li>
					<strong>Phone:</strong>
					<a href={`tel:${contact.phone}`} class="text-blue-400 hover:underline">{contact.phone}</a>
				</li>
				<br />
			{/each}
		</ul>
	</div>
</div>
