async function customFormHandler(event) {
    event.preventDefault();

    // obtain post-title and post-content from the form
    const customTitle = document.querySelector('input[name="custom-title"]').value;
    const customContent = document.querySelector('input[name="custom-content"]').value;

    // send a POST request to /api/custom
    const response = await fetch(`/api/custom`, {
        method: 'POST',
        body: JSON.stringify({
            customTitle,
            customContent,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        document.location.replace('/custom-dashboard');
    } else {
        alert(response.statusText);
    }
}

document
    .querySelector('.custom-form')
    .addEventListener('submit', customFormHandler);