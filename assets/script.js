// Toggle navigation menu
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('show');
}
// Show specific section
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.style.display = 'none';
    });
    // Show the selected section
    const selectedSection = document.getElementById(sectionId);
    // Check if the element exists before trying to manipulate it
    if (selectedSection) {
        selectedSection.style.display = 'block';
        // Update the app title
        const appTitle = document.getElementById('appTitle');
        // Check if the element exists before trying to manipulate it
        if (appTitle) {
            appTitle.innerText = `No Limits - ${sectionId.charAt(0).toUpperCase() + sectionId.slice(1)}`;
        } else {
            console.error('AppTitle element not found.');
        }
    } else {
        console.error(`Section element with ID ${sectionId} not found.`);
    }
}
// Modal functions
function openModal(title, content, duration, difficulty) {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    const modalDuration = document.getElementById('modalDuration');
    const modalDifficulty = document.getElementById('modalDifficulty');
    // Check if the element exists before trying to manipulate it
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
// Close modal if the user clicks outside of it
window.onclick = function (event) {
    const modal = document.getElementById('modal');
    if (modal && event.target == modal) {
        modal.style.display = 'none';
    }
};
// Show the home section by default
showSection('home');
// Additional event listener to ensure script runs after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function() {
    // Your existing JavaScript code
    // For example:
    showSection('home');
});


const sequelize = require('./sequelize'); 
const User = require('./models/user'); 


const newUser = await User.create({ name: 'DataTypes.STRING', email: 'DataTypes.STRING', password: 'DataTypes.STRING' });
