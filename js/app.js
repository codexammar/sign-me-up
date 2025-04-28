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