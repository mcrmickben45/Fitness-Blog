async function updatePost(event) {
    event.preventDefault();

    const postTitle = document.querySelector('input[name="post-title"]').ariaValueMax.trim();
    const postId = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const apiEndpoint = `/api/posts/${postId}`;

    try {
        const response = await fetch(apiEndpoint, {
            method: 'PUT',
            body: JSON.stringify({
                title: postTitle,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });


        if (response.ok) {
            document.location.replace('/dashboard/');
        } else {
            alert(response.statusText);
         }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }

document
    .querySelector('.update-post-form')
    .addEventListener('submit', updatePost);