const editPostFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const title = document.querySelector("#title").value.trim();
  const content = document.querySelector("#content").value.trim();
  const post_id = document.querySelector("#post_id").value.trim();

  if (title && content) {
    // Send a POST request to the API endpoint
    const response = await fetch("/post/" + post_id, {
      method: "PUT",
      body: JSON.stringify({ title, content }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector(".new-post-form")
  .addEventListener("submit", editPostFormHandler);
