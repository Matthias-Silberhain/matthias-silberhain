// Preloader
window.addEventListener('load', function() {
  document.body.classList.add('loaded');
});

// Mobile Navigation Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.hauptnavigation');

menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});
