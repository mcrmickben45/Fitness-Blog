async function handleDeleteForm(event) {
    event.preventDefault();

    const postId = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    try {
        const response = await fetch(`/api/posts/${postId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.replace('/dashboard/');
        } else {
            alert(`Error: ${response.statusText}`);
        }
    } catch (error) {
        console.error('An unexpected error occurred:', error);
        alert('An unexpected error occurred. Please try again.');
    }
}

document.querySelector('.delete-post-btn').addEventListener('click', handleDeleteForm);