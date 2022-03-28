// Event handler for create post form submission
const createPostFormHandler = async (event) => {
    event.preventDefault();

    // Collect values from create form
    const title = document.querySelector("#titleInput").value.trim();
    const content = document.querySelector("#textArea").value.trim();

    if (title && content) {
        // Send a POST request to API endpoint
        const response = await fetch("/api/posts", {
            method: "POST",
            body: JSON.stringify({ title, content }),
            headers: { "Content-Type": "application/json" }
        });

        if (response.ok) {
            // If successful, redirect the browser to the dashboard
            document.location.replace("/dashboard");
        }
        else {
            alert(response.statusText);
        }
    }
}

document.querySelector("#createPostForm").addEventListener("submit", createPostFormHandler);