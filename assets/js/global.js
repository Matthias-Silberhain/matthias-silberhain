document.addEventListener('DOMContentLoaded', () => {

  const year = document.getElementById('jahr');
  if (year) year.textContent = new Date().getFullYear();

  const text = "MATTHIAS SILBERHAIN";
  const output = document.getElementById('type-text');
  const preloader = document.getElementById('preloader');

  let i = 0;
  function type() {
    if (i < text.length) {
      output.textContent += text[i++];
      setTimeout(type, 80);
    } else {
      setTimeout(() => {
        preloader.classList.add('hidden');
        setTimeout(() => preloader.remove(), 600);
      }, 800);
    }
  }

  setTimeout(type, 300);
});
