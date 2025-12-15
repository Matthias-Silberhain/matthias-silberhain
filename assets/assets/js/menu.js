// =========================
// PRELOADER (IMMER)
// =========================
alert("JS geladen");

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

// Schreib-Effekt
const text = "MATTHIAS SILBERHAIN";
const textEl = document.getElementById("type-text");
const cursor = document.getElementById("cursor");

let i = 0;
const speed = 100; // Geschwindigkeit der Buchstaben

const typing = setInterval(() => {
  textEl.textContent += text.charAt(i);
  i++;

  if (i === text.length) {
    clearInterval(typing);

    cursor.classList.add("stop");

    setTimeout(() => {
      preloader.classList.add("fade-out");
    }, 300);

    setTimeout(() => {
      preloader.remove();
    }, 700);
  }
}, speed);

// =========================
// BURGER MENÜ
// =========================
const burger = document.getElementById("burger");
const navigation = document.getElementById("navigation");

burger.addEventListener("click", () => {
  navigation.classList.toggle("aktiv");
});

// =========================
// FOOTER JAHR
// =========================
document.getElementById("jahr").textContent = new Date().getFullYear();
