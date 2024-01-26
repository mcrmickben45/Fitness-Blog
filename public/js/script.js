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

document.addEventListener("DOMContentLoaded", function () {
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

function submitRegistrationForm() {
    const email = document.getElementById('email').value;
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;

    const loggedInUser = {
        email,
        firstName,
        lastName,
    };

    closeModal();

    showSection('forum');

}


function showProfileModal() {
    const userBio = prompt("Write a bio for yourself:");
    const firstName = prompt("Enter your first name:");
    const lastName = prompt("Enter your last name:");

    localStorage.setItem('userBio', userBio);
    localStorage.setItem('firstName', firstName);
    localStorage.setItem('lastName', lastName);

    updateUserProfile();
}

function updateUserProfile() {
    const userBioElement = document.getElementById('userBio');
    const firstName = localStorage.getItem('firstName');
    const lastName = localStorage.getItem('lastName');
    const userBio = localStorage.getItem('userBio');

    if (userBioElement && firstName && lastName && userBio) {
        userBioElement.innerHTML = `
            <p><strong>${firstName} ${lastName}</strong></p>
            <p>Bio: ${userBio}</p>
        `;
    } else {
        console.error('User profile elements not found.');
    }
}

function getCurrentUser() {
    return {
        firstName: localStorage.getItem('firstName'),
        lastName: localStorage.getItem('lastName'),
        userBio: localStorage.getItem('userBio'),
    };
}

function submitForumPost() {
    const { firstName, lastName } = getCurrentUser();
    const content = document.getElementById('forumPostContent').value;

    $.post('/forum/post', { firstName, lastName, content }, function (data) {
        if (data.success) {
            console.log(`Forum post added by ${firstName} ${lastName}`);
            getForumData();
            document.getElementById('forumPostContent').value = '';
        } else {
            console.error('Failed to add forum post:', data.message);
        }
    });
}

function submitReply(postId) {
    const { firstName, lastName } = getCurrentUser();
    const content = document.getElementById(`replyContent${postId}`).value;

    $.post('/forum/reply', { postId, firstName, lastName, content }, function (data) {
        if (data.success) {
            console.log(`Reply added by ${firstName} ${lastName}`);
            getForumData();
            document.getElementById(`replyContent${postId}`).value = '';
        } else {
            console.error('Failed to add reply:', data.message);
        }
    });
}

function getForumData() {
    $.get('/forum', function (data) {
        forumData = data;
        renderForum();
    });
}

let forumData = [];

function getCurrentDateTime() {
    const now = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return now.toLocaleDateString('en-US', options);
}

function renderForum() {
    const forumContainer = document.getElementById('forumContainer');
    forumContainer.innerHTML = '';

    forumData.posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('forum-post');

        const postInfo = document.createElement('div');
        postInfo.classList.add('post-info');
        postInfo.innerHTML = `
            <p><strong>${post.firstName} ${post.lastName}</strong></p>
            <p>${post.dateTime}</p>
        `;
        postElement.appendChild(postInfo);

        const postContent = document.createElement('div');
        postContent.classList.add('post-content');
        postContent.innerHTML = `<p>${post.content}</p>`;
        postElement.appendChild(postContent);

        if (post.replies && post.replies.length > 0) {
            const repliesContainer = document.createElement('div');
            repliesContainer.classList.add('replies-container');
            post.replies.forEach(reply => {
                const replyElement = document.createElement('div');
                replyElement.classList.add('reply');
                replyElement.innerHTML = `
                    <p><strong>${reply.firstName} ${reply.lastName}</strong></p>
                    <p>${reply.dateTime}</p>
                    <p>${reply.content}</p>
                `;
                repliesContainer.appendChild(replyElement);
            });
            postElement.appendChild(repliesContainer);
        }

        const replyForm = document.createElement('div');
        replyForm.classList.add('reply-form');
        replyForm.innerHTML = `
            <textarea id="replyContent${post._id}" placeholder="Write a reply"></textarea>
            <button onclick="submitReply('${post._id}')">Submit Reply</button>
        `;
        postElement.appendChild(replyForm);

        forumContainer.appendChild(postElement);
    });
}

getForumData();
