// Dark Mode Toggle
const toggleButton = document.getElementById('theme-toggle');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

// Load saved theme if any
if (localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && prefersDark)) {
    document.body.classList.add('dark-mode');
    toggleButton.textContent = '🌞';
}

toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        toggleButton.textContent = '🌞';
        localStorage.setItem('theme', 'dark');
    } else {
        toggleButton.textContent = '🌙';
        localStorage.setItem('theme', 'light');
    }
});

// Hamburger Menu Toggle
const hamburger = document.getElementById('hamburgerBtn');
const navLinks = document.getElementById('nav-links');
const body = document.body;

// Hamburger Toggle
hamburger.addEventListener('click', () => {
    if (body.classList.contains('nav-open')) {
        navLinks.classList.remove('open');
        body.classList.remove('nav-open');
    } else {
        navLinks.classList.add('open');
        body.classList.add('nav-open');
    }
});

// Close hamburger if clicked outside
document.addEventListener('click', (event) => {
    const isClickInsideNav = navLinks.contains(event.target);
    const isClickOnHamburger = hamburger.contains(event.target);

    if (!isClickInsideNav && !isClickOnHamburger && body.classList.contains('nav-open')) {
        navLinks.classList.remove('open');
        body.classList.remove('nav-open');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const progressBar = document.querySelector('.progress-bar');
    const dots = document.querySelectorAll('.dot.small');
    const lessons = document.querySelectorAll('.lesson-card');

    const totalLessons = lessons.length;

    // Load completed lessons from localStorage
    let completedLessons = JSON.parse(localStorage.getItem('completedLessons')) || {};

    // Update the visual state based on localStorage
    updateProgress();

    // Mark lesson as completed
    lessons.forEach((lesson, index) => {
        const btn = lesson.querySelector('.complete-lesson-btn');
        const lessonKey = lesson.getAttribute('data-lesson');

        if (completedLessons[lessonKey]) {
            btn.textContent = "Completed";
            btn.disabled = true;
            dots[index].classList.add('completed');
        }

        btn.addEventListener('click', () => {
            completedLessons[lessonKey] = true;
            localStorage.setItem('completedLessons', JSON.stringify(completedLessons));
            
            btn.textContent = "Completed";
            btn.disabled = true;

            dots[index].classList.add('completed');
            updateProgress();
        });
    });

    function updateProgress() {
        const completedCount = Object.keys(completedLessons).length;
        const totalDots = dots.length + 1; // dots.length is small dots; +1 is the final big dot
    
        // Progress percentage should include last dot
        const progressPercent = (completedCount / totalLessons) * 100;
        progressBar.style.width = `${progressPercent}%`;
    
        // Check if all lessons completed, mark final big dot as completed
        const finalBigDot = document.querySelector('.dot.big:not(.completed)');
        if (completedCount === totalLessons && finalBigDot) {
            finalBigDot.classList.add('completed');
        }
    }    
});
