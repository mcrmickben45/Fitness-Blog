// Function to toggle the navigation menu
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// Function to show a specific section
function showSection(sectionId) {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach((section) => {
        section.style.display = section.id === sectionId ? 'block' : 'none';
    });
}

// Function to show the "Get Started" modal
function showGetStartedModal() {
    const modal = document.getElementById('getStartedModal');
    modal.style.display = 'block';
}

// Function to close the "Get Started" modal
function closeGetStartedModal() {
    const modal = document.getElementById('getStartedModal');
    modal.style.display = 'none';
}

// Function to show the login form within the modal
function showLogin() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    loginForm.style.display = 'block';
    registerForm.style.display = 'none';
}

// Function to show the registration form within the modal
function showRegisterForm() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
}

// Function to submit the login form
async function submitLoginForm() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        // Send a login request to your backend
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            // Login successful, you may want to redirect or update UI
            console.log('Login successful:', data);
        } else {
            // Login failed, display an error message
            console.error('Login failed:', data.error);
        }
    } catch (error) {
        console.error('Error during login:', error);
    }
}

// Function to submit the registration form
async function submitRegistrationForm() {
    const email = document.getElementById('email').value;
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        // Send a registration request to your backend
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, firstName, lastName, username, password }),
        });

        const data = await response.json();

        if (response.ok) {
            // Registration successful, you may want to redirect or update UI
            console.log('Registration successful:', data);
        } else {
            // Registration failed, display an error message
            console.error('Registration failed:', data.error);
        }
    } catch (error) {
        console.error('Error during registration:', error);
    }
}

// Function to search for food
async function searchFood() {
    const foodSearch = document.getElementById('foodSearch').value;

    try {
        // Send a food search request to your backend
        const response = await fetch(`/api/food?search=${foodSearch}`);

        if (response.ok) {
            // Process the search results and update UI
            const results = await response.json();
            console.log('Food search results:', results);
        } else {
            // Display an error message
            console.error('Food search failed:', response.statusText);
        }
    } catch (error) {
        console.error('Error during food search:', error);
    }
}

// Function to open a workout modal
function openModal(title, content, duration, difficulty) {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    const modalDuration = document.getElementById('modalDuration');
    const modalDifficulty = document.getElementById('modalDifficulty');

    modalTitle.textContent = title;
    modalContent.textContent = content;
    modalDuration.textContent = `Duration: ${duration}`;
    modalDifficulty.textContent = `Difficulty: ${difficulty}`;

    modal.style.display = 'block';
}

// Function to close the modal
function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}

// Function to show the profile modal
function showProfileModal() {
    const userBio = document.getElementById('userBio');
    // Retrieve user data from your backend and update the UI
    userBio.textContent = 'Loading user bio...';

    // Example: Fetch user data from the server
    fetch('/api/user/profile')
        .then(response => response.json())
        .then(data => {
            // Update the user bio with actual data from your backend
            userBio.textContent = `Username: ${data.username}, Email: ${data.email}, Bio: ${data.bio}`;
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
            userBio.textContent = 'Error loading user data';
        });
}

// Function to submit a forum post
async function submitForumPost() {
    const forumPostContent = document.getElementById('forumPostContent').value;

    try {
        // Send a forum post request to your backend
        const response = await fetch('/api/forum/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content: forumPostContent }),
        });

        const data = await response.json();

        if (response.ok) {
            // Forum post submitted successfully, you may want to update UI
            console.log('Forum post submitted:', data);
        } else {
            // Display an error message
            console.error('Forum post submission failed:', data.error);
        }
    } catch (error) {
        console.error('Error during forum post submission:', error);
    }
}