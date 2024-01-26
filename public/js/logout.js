const handleLogout = async () => {
    try {
        const response = await fetch('/api/logout/user', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            window.location.replace('/');
        } else {
            alert(`Logout failed: ${response.statusText}`);
        }
    } catch (error) {
        console.error('An error occurred during logout:', error);
        alert('An unexpected error occurred. Please try again later.');
    }
};

document.querySelector('#logoutBtn').assEventListener('click', handleLogout);