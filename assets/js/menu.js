document.addEventListener("DOMContentLoaded", () => {

  document.body.classList.add("preloader-active");

  const preloader = document.getElementById("preloader");
  const logoWrapper = document.querySelector(".preloader-logo-wrapper");
  const textEl = document.getElementById("type-text");
  const cursor = document.querySelector(".cursor");
  const textContainer = document.querySelector(".preloader-text");

  setTimeout(() => {
    logoWrapper.classList.add("silver-sweep");
  }, 400);

  const text = window.innerWidth <= 600
    ? "MATTHIAS\nSILBERHAIN"
    : "MATTHIAS SILBERHAIN";

  let i = 0;
  const speed = 120;

  function typeWriter() {
    if (i < text.length) {
      textEl.innerHTML += text[i] === "\n" ? "<br>" : text[i];
      i++;
      setTimeout(typeWriter, speed);
    } else {
      cursor.style.display = "none";
      textContainer.classList.add("silver-glow");

      setTimeout(() => {
        preloader.style.opacity = "0";
      }, 1200);

      setTimeout(() => {
        preloader.style.display = "none";
        document.body.classList.remove("preloader-active");
      }, 1800);
    }
  }

  setTimeout(typeWriter, 900);

  document.getElementById("jahr").textContent =
    new Date().getFullYear();
});
