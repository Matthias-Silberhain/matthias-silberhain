/* ================= PRELOADER ================= */

document.addEventListener("DOMContentLoaded", () => {

  const text = "MATTHIAS SILBERHAIN";
  const textElement = document.getElementById("type-text");
  const cursor = document.querySelector(".cursor");
  const preloader = document.getElementById("preloader");

  let index = 0;
  const speed = 80;

  const typing = setInterval(() => {
    textElement.textContent += text.charAt(index);
    index++;

    if (index === text.length) {
      clearInterval(typing);
      cursor.classList.add("stop");

      setTimeout(() => {
        preloader.style.opacity = "0";
        preloader.style.transition = "opacity 0.4s ease";
      }, 300);

      setTimeout(() => {
        preloader.remove();
      }, 800);
    }
  }, speed);
});

/* ================= BURGER MENÜ ================= */

const burger = document.getElementById("burger");
const navigation = document.getElementById("navigation");

if (burger) {
  burger.addEventListener("click", () => {
    navigation.classList.toggle("aktiv");
  });
}

/* ================= FOOTER JAHR ================= */

const jahr = document.getElementById("jahr");
if (jahr) {
  jahr.textContent = new Date().getFullYear();
}
