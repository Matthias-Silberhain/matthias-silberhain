/* =========================
   PRELOADER
========================= */

console.log("menu.js geladen");

document.addEventListener("DOMContentLoaded", () => {

  const preloader = document.createElement("div");
  preloader.id = "preloader";

  preloader.innerHTML = `
    <div class="preloader-inner">
      <img src="assets/images/logo.png" class="preloader-logo" alt="Logo">
      <div class="preloader-text">
        <span id="type-text"></span><span class="cursor">|</span>
      </div>
    </div>
  `;

  document.body.appendChild(preloader);

  /* TYPEWRITER */
  const text = "MATTHIAS SILBERHAIN";
  const textEl = document.getElementById("type-text");
  const cursor = document.querySelector(".cursor");

  let i = 0;

  function typeWriter() {
    if (i < text.length) {
      textEl.textContent += text.charAt(i);
      console.log("schreibe:", text.charAt(i));
      i++;
      setTimeout(typeWriter, 80);
    } else {
      cursor.style.display = "none";
      setTimeout(() => {
        preloader.remove();
      }, 600);
    }
  }

  typeWriter();

  /* =========================
     BURGER MENÜ
  ========================= */

  const burger = document.getElementById("burger");
  const navigation = document.getElementById("navigation");

  if (burger && navigation) {
    burger.addEventListener("click", () => {
      navigation.classList.toggle("aktiv");
    });
  }

  /* =========================
     FOOTER JAHR
  ========================= */

  const year = document.getElementById("jahr");
  if (year) {
    year.textContent = new Date().getFullYear();
  }

});

