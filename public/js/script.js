function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('show');
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

  function showLogin() {
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

  function submitLoginForm() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    alert(`Logging in with email: ${email} and password: ${password}`);
  }

  function submitRegistrationForm() {
    const email = document.getElementById('email').value;
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    alert(`Registering with email: ${email}, first name: ${firstName}, last name: ${lastName}, username: ${username}, and password: ${password}`);
  }

  function openModal(title, content, duration, difficulty) {
    const modal = document.getElementById('modal');
    modal.style.display = 'block';
    document.getElementById('modalTitle').innerText = title;
    document.getElementById('modalContent').innerText = content;
    document.getElementById('modalDuration').innerText = `Duration: ${duration}, Difficulty: ${difficulty}`;
  }

  function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
  }

  function searchFood() {
    const foodSearchInput = document.getElementById('foodSearch').value;
    alert(`Searching for food: ${foodSearchInput}`);
  }

  function showProfileModal() {
    alert('Showing profile modal!');
  }

  function submitForumPost() {
    const forumPostContent = document.getElementById('forumPostContent').value;
    alert(`Submitting forum post: ${forumPostContent}`);
  }
  