function showEditProfileModal() {
    document.getElementById('editProfileModal').style.display = 'block';
}

function closeEditProfileModal() {
    document.getElementById('editProfileModal').style.display = 'none';
}

function saveProfileChanges() {
    const newBio = document.getElementById('bio').value;
    
    // Assuming you have a user object with an updateBio method on the client side
    user.updateBio(newBio);

    // Alternatively, if you're making an AJAX request to update the bio on the server
    const userId = user.id; // Replace with the actual way to get user ID
    fetch(`/api/users/${userId}/update-bio`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bio: newBio }),
    })
    .then(response => response.json())
    .then(data => {
        // Handle the response data if needed
    })
    .catch(error => {
        console.error('Error updating bio:', error);
    });

    // Update the UI with the saved changes
    document.getElementById('userBio').innerHTML = `Bio: ${newBio}`;
    closeEditProfileModal();
}