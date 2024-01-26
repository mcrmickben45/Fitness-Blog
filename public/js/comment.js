async function handleCommentSubmission(event) {
    event.preventDefault();

    const commentInput = document
        .querySelector('textarea[name="comment-body"]')
        .value.trim();

    // Extract post ID from URL
    const postId = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    // Check for non-empty comments before submission
    if (commentInput) {
        try {
            const response = await fetch('/api/comments', {
                method: 'POST',
                body: JSON.stringify({
                    post_id: postId,
                    comment_text: commentInput,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                document.location.reload();
            } else {
                alert(response.statusText);
            }
        } catch (error) {
            console.error('Error during comment submission:', error);
        }
    }
}

document
    .querySelector('.comment-form')
    .addEventListener('submit', handleCommentSubmission);