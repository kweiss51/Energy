document.addEventListener('DOMContentLoaded', function() {
    // Initialize navigation
    initNavigation();

    // Load courses data
    loadCourses();

    // Set up event listeners for course cards
    setupCourseCardListeners();
});

function initNavigation() {
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetPage = this.getAttribute('href');
            loadPage(targetPage);
        });
    });
}

function loadCourses() {
    // Fetch course data (this would typically be from an API)
    const courses = [
        { id: 1, title: 'Introduction to Energy', description: 'Learn the basics of energy.' },
        { id: 2, title: 'Renewable Energy Sources', description: 'Explore various renewable energy sources.' },
        { id: 3, title: 'Energy Efficiency', description: 'Understand how to use energy more efficiently.' }
    ];

    const coursesContainer = document.getElementById('courses-container');
    courses.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.className = 'course-card';
        courseCard.innerHTML = `
            <h3>${course.title}</h3>
            <p>${course.description}</p>
            <button class="enroll-button" data-id="${course.id}">Enroll Now</button>
        `;
        coursesContainer.appendChild(courseCard);
    });
}

function setupCourseCardListeners() {
    const enrollButtons = document.querySelectorAll('.enroll-button');
    enrollButtons.forEach(button => {
        button.addEventListener('click', function() {
            const courseId = this.getAttribute('data-id');
            enrollInCourse(courseId);
        });
    });
}

function enrollInCourse(courseId) {
    // Logic for enrolling in a course (e.g., redirect to enroll page)
    window.location.href = `enroll.html?courseId=${courseId}`;
}

function loadPage(page) {
    // Logic for loading different pages dynamically
    fetch(page)
        .then(response => response.text())
        .then(html => {
            document.getElementById('main-content').innerHTML = html;
        })
        .catch(error => console.error('Error loading page:', error));
}