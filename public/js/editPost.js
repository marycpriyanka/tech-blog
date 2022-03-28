// Event handler to update a post
const updatePost = async () => {
    // Collect values from handlebar
    const title = document.querySelector("#titleInput").value.trim();
    const content = document.querySelector("#textArea").value.trim();
    const id = document.querySelector("#titleInput").getAttribute("data-id");

    if (title && content && id) {
        // Send a PUT request to API endpoint
        const response = await fetch(`/api/posts/${id}`, {
            method: "PUT",
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
};

// Event handler to delete a post
const deletePost = async () => {
    // Collect values from handlebar
    const id = document.querySelector("#titleInput").getAttribute("data-id");

    if (id) {
        // Send a delete request to API endpoint
        const response = await fetch(`/api/posts/${id}`, {
            method: "DELETE",
        });

        if (response.ok) {
            // If successful, redirect the browser to dashboard
            document.location.replace("/dashboard");
        }
        else {
            alert(response.statusText);
        }
    }
};

document.querySelector("#updateButton").addEventListener("click", updatePost);
document.querySelector("#deleteButton").addEventListener("click", deletePost);
