function toggleNavigationMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

function showSection(sectionId) {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach((section) => {
        section.style.display = section.id === sectionId ? 'block' : 'none';
    });
}

function showGetStartedModal() {
    const modal = document.getElementById('getStartedModal');
    modal.style.display = 'block';
}

function closeGetStartedModal() {
    const modal = document.getElementById('getStartedModal');
    modal.style.display = 'none';
}

function showLoginForm() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    loginForm.style.display = 'block';
    registerForm.style.display = 'none';
}

function showRegisterForm() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
}

async function submitLoginForm() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            console.log('Login successful:', data);
        } else {
            console.error('Login failed:', data.error);
        }
    } catch (error) {
        console.error('Error during login:', error);
    }
}

async function submitRegistrationForm() {
    const email = document.getElementById('email').value;
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, firstName, lastName, username, password }),
        });

        const data = await response.json();

        if (response.ok) {
            console.log('Registration successful:', data);
        } else {
            console.error('Registration failed:', data.error);
        }
    } catch (error) {
        console.error('Error during registration:', error);
    }
}

async function searchFood() {
    const foodSearch = document.getElementById('foodSearch').value;

    try {
        const response = await fetch(`/api/food?search=${foodSearch}`);

        if (response.ok) {
            const results = await response.json();
            console.log('Food search results:', results);
        } else {
            console.error('Food search failed:', response.statusText);
        }
    } catch (error) {
        console.error('Error during food search:', error);
    }
}

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

function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}

function showProfileModal() {
    const userBio = document.getElementById('userBio');
    const userData = await fetchUserData();
    userBio.textContent = `Username: ${userData.username}, Email: ${userData.email}, Bio: ${userData.bio}`;
}

async function fetchUserData() {
    try {
        const response = await fetch('/api/user/profile');
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error(`Failed to fetch user data: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
}

async function submitForumPost() {
    const forumPostContent = document.getElementById('forumPostContent').value;

    try {
        const response = await fetch('/api/forum/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content: forumPostContent }),
        });

        const data = await response.json();

        if (response.ok) {
            console.log('Forum post submitted:', data);
        } else {
            console.error('Forum post submission failed:', data.error);
        }
    } catch (error) {
        console.error('Error during forum post submission:', error);
    }
}

// script.js

// Function to show the "Get Started" modal
function showGetStartedModal() {
    // Your implementation here
}

// Function to toggle between sections
function showSection(sectionId) {
    // Your implementation here
}

// Function to open a modal
function openModal(title, content, duration, difficulty) {
    // Your implementation here
}

// Function to close the modal
function closeModal() {
    // Your implementation here
}

// Function to search for food
function searchFood() {
    // Your implementation here
}

// Function to close the "Get Started" modal
function closeGetStartedModal() {
    // Your implementation here
}

// Function to show the login form
function showLogin() {
    // Your implementation here
}

// Function to show the registration form
function showRegisterForm() {
    // Your implementation here
}

// Function to submit the login form
function submitLoginForm() {
    // Your implementation here
}

// Function to submit the registration form
function submitRegistrationForm() {
    // Your implementation here
}

// Function to show the user profile modal
function showProfileModal() {
}

function submitForumPost() {
}
