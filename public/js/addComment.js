const addComment = async (event) => {
    event.preventDefault();

    // Gets values from form
    const comment_content = document.querySelector("#textArea").value.trim();
    const post_id = commentForm.getAttribute("data-id");

    if (comment_content && post_id) {
        const response = await fetch("/api/comments", {
            method: "POST", 
            body: JSON.stringify({ comment_content, post_id }),
            headers: { "Content-Type": "application/json" }
        });

        if (response.ok) {
            document.location.reload();
        }
        else {
            alert(response.statusText);
        }
    }
};

const commentForm = document.querySelector("#commentForm");
commentForm.addEventListener("submit", addComment);