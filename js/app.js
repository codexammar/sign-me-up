// Dark Mode Toggle
const themeToggleBtn = document.getElementById('theme-toggle');

themeToggleBtn.addEventListener('click', () => {
  document.documentElement.classList.toggle('dark-mode');

  if (document.documentElement.classList.contains('dark-mode')) {
    localStorage.setItem('theme', 'dark');
  } else {
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
    const dots = document.querySelectorAll('.progress-dots .dot.small');
    const lessons = document.querySelectorAll('.lesson-card');
    const completedLessons = JSON.parse(localStorage.getItem('completedLessons')) || {};
  
    // Highlight completed lessons
    lessons.forEach((card) => {
      const key = card.getAttribute('data-lesson');
      if (completedLessons[key]) {
        card.classList.add('completed');
      }
    });
  
    // Highlight completed dots
    dots.forEach((dot) => {
      const key = dot.getAttribute('data-lesson');
      if (completedLessons[key]) {
        dot.classList.add('completed');
      }
    });
  
    // Calculate progress
    const totalLessons = lessons.length;
    const completedCount = Array.from(lessons).filter(card => {
      const key = card.getAttribute('data-lesson');
      return completedLessons[key];
    }).length;
  
    const progressPercent = (completedCount / totalLessons) * 100;
    progressBar.style.width = `${progressPercent}%`;
  
    // Mark final big dot
    const finalBigDot = document.querySelector('.progress-dots .dot.big:last-child');
    if (completedCount === totalLessons && finalBigDot) {
      finalBigDot.classList.add('completed');
    }
});  
