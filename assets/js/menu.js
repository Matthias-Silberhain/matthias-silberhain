/* =========================
   PRELOADER
========================= */

console.log("JS geladen");

document.addEventListener("DOMContentLoaded", () => {

  /* PRELOADER ERZEUGEN */
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

  let index = 0;

  function type() {
    if (index < text.length) {
      textEl.textContent += text.charAt(index);
      index++;
      setTimeout(type, 70);
    } else {
      cursor.style.display = "none";
      setTimeout(() => {
        preloader.classList.add("fade-out");
      }, 300);
      setTimeout(() => {
        preloader.remove();
      }, 700);
    }
  }

  type();

  /* =========================
     BURGER
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
  if (year) year.textContent = new Date().getFullYear();

});
