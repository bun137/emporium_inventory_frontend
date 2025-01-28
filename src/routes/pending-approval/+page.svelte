<script>
  let contactDetails = [
    {
      name: "Shreya",
      email: "gurram13775@gmail.com",
      phone: "9901618209"
    },
    // {
    //   name: "Rahul",
    //   email: "rahul123@example.com",
    //   phone: "9876543210"
    // }
  ];
</script>

<div class="flex flex-col justify-center items-center min-h-screen bg-gray-900 text-center p-8">
  <div class="bg-gray-800 shadow-lg rounded-2xl p-8 max-w-md text-white">
    <h1 class="text-2xl font-bold mb-4">Your account is awaiting approval</h1>
    <p class="mb-4 text-gray-300">
      Please wait for an admin to review and approve your account. This process can take some time.
    </p>
    <p class="text-gray-300 text-left">
      If you need assistance, please contact us:
    </p>
    <ul class="text-gray-300 text-left">
      {#each contactDetails as contact}
        <li><strong>Name:</strong> {contact.name}</li>
        <li><strong>Email:</strong> <a href={`mailto:${contact.email}`} class="text-blue-400 hover:underline">{contact.email}</a></li>
        <li><strong>Phone:</strong> <a href={`tel:${contact.phone}`} class="text-blue-400 hover:underline">{contact.phone}</a></li>
        <br>
      {/each}
    </ul>
  </div>
</div>
