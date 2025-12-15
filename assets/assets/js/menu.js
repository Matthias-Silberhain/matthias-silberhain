/* =========================
   PRELOADER
========================= */

const preloader = document.createElement("div");
preloader.id = "preloader";

preloader.innerHTML = `
  <div class="preloader-inner">
    <img src="assets/images/logo.png" class="preloader-logo" alt="Logo">
    <div class="preloader-text">
      <span id="type-text"></span><span class="cursor" id="cursor"></span>
    </div>
  </div>
`;

document.body.appendChild(preloader);

/* Schreibeffekt */
const text = "MATTHIAS SILBERHAIN";
const textEl = document.getElementById("type-text");
const cursor = document.getElementById("cursor");

let index = 0;
const speed = 60;

const typingInterval = setInterval(() => {
  textEl.textContent += text[index];
  index++;

  if (index >= text.length) {
    clearInterval(typingInterval);

    cursor.classList.add("stop");

    setTimeout(() => {
      preloader.classList.add("fade-out");
    }, 300);

    setTimeout(() => {
      preloader.remove();
    }, 700);
  }
}, speed);

/* =========================
   BURGER MENÜ
========================= */

const burger = document.getElementById("burger");
const navigation = document.getElementById("navigation");

burger.addEventListener("click", () => {
  navigation.classList.toggle("aktiv");
});

/* =========================
   FOOTER JAHR
========================= */

document.getElementById("jahr").textContent =
  new Date().getFullYear();
