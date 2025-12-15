document.addEventListener("DOMContentLoaded", () => {

  const preloader = document.getElementById("preloader");
  const textEl = document.getElementById("type-text");
  const cursor = document.getElementById("cursor");
  const text = "MATTHIAS SILBERHAIN";

  let i = 0;
  const speed = 80;

  document.body.style.overflow = "hidden";

  function typeWriter() {
    if (i < text.length) {
      textEl.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, speed);
    } else {
      cursor.classList.add("stop");

      setTimeout(() => {
        preloader.style.opacity = "0";
        setTimeout(() => {
          preloader.remove();
          document.body.style.overflow = "auto";
        }, 400);
      }, 600);
    }
  }

  typeWriter();
});

/* BURGER */
const burger = document.getElementById("burger");
const navigation = document.getElementById("navigation");

if (burger) {
  burger.addEventListener("click", () => {
    navigation.classList.toggle("aktiv");
  });
}

/* FOOTER JAHR */
const jahr = document.getElementById("jahr");
if (jahr) {
  jahr.textContent = new Date().getFullYear();
}
