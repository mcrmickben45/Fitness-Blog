function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('show');
}
function showSection(sectionId) {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.style.display = 'none';
    });
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.style.display = 'block';
        const appTitle = document.getElementById('appTitle');
        if (appTitle) {
            appTitle.innerText = `No Limits - ${sectionId.charAt(0).toUpperCase() + sectionId.slice(1)}`;
        } else {
            console.error('AppTitle element not found.');
        }
    } else {
        console.error(`Section element with ID ${sectionId} not found.`);
    }
}
function openModal(title, content, duration, difficulty) {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    const modalDuration = document.getElementById('modalDuration');
    const modalDifficulty = document.getElementById('modalDifficulty');
    if (modalTitle && modalContent && modalDuration && modalDifficulty) {
        modalTitle.innerText = title;
        modalContent.innerText = content;
        modalDuration.innerText = `Duration: ${duration}`;
        modalDifficulty.innerText = `Difficulty: ${difficulty}`;
        modal.style.display = 'block';
    } else {
        console.error('One or more modal elements not found.');
    }
}
function closeModal() {
    const modal = document.getElementById('modal');
    if (modal) {
        modal.style.display = 'none';
    } else {
        console.error('Modal element not found.');
    }
}
window.onclick = function (event) {
    const modal = document.getElementById('modal');
    if (modal && event.target == modal) {
        modal.style.display = 'none';
    }
};
showSection('home');
document.addEventListener("DOMContentLoaded", function() {
    showSection('home');
});
const authModal = document.getElementById('modal');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const getStartedModal = document.getElementById('getStartedModal');

function showLoginForm() {
    loginForm.style.display = 'block';
    registerForm.style.display = 'none';
}

function showRegisterForm() {
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
}

window.showAuthModal = function () {
    authModal.style.display = 'block';
    showLoginForm(); 
};

window.showGetStartedModal = function () {
    getStartedModal.style.display = 'block';
};

window.onclick = function (event) {
    if (event.target === authModal || event.target === getStartedModal || event.target.classList.contains('close')) {
        authModal.style.display = 'none';
        getStartedModal.style.display = 'none';
    }
};

document.getElementById('switchToRegister').addEventListener('click', showRegisterForm);
document.getElementById('switchToLogin').addEventListener('click', showLoginForm);

document.addEventListener("DOMContentLoaded", function () {
    showSection('home');
});

window.closeModal = function () {
document.getElementById('modal').style.display = 'none';
document.getElementById('getStartedModal').style.display = 'none';
};

function submitLoginForm() {
console.log("Login form submitted"); 
window.closeModal();
}

function submitRegistrationForm() {
console.log("Registration form submitted"); 
window.closeModal();
}

function showGetStartedModal() {
    const getStartedModal = document.getElementById('getStartedModal');
    if (getStartedModal) {
        getStartedModal.style.display = 'block';
        showLogin(); 
    } else {
        console.error('GetStartedModal element not found.');
    }
}

function closeGetStartedModal() {
    const getStartedModal = document.getElementById('getStartedModal');
    if (getStartedModal) {
        getStartedModal.style.display = 'none';
    } else {
        console.error('GetStartedModal element not found.');
    }
}

function showLogin() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    if (loginForm && registerForm) {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
        document.getElementById('getStartedModalTitle').innerText = 'Login';
    } else {
        console.error('Login or Register form elements not found.');
    }
}

function showRegister() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    if (loginForm && registerForm) {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
        document.getElementById('getStartedModalTitle').innerText = 'Register';
    } else {
        console.error('Login or Register form elements not found.');
    }
}
