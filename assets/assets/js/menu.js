/* =========================================================
   Matthias Silberhain – Menü & Preloader Script
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =====================================================
     PRELOADER ERZEUGEN
     (kein HTML notwendig)
  ===================================================== */

  const preloader = document.createElement("div");
  preloader.id = "preloader";

  preloader.innerHTML = `
    <div class="preloader-inner">
      <img
        src="assets/images/logo.png"
        alt="Matthias Silberhain Logo"
        class="preloader-logo"
      >
      <div id="logo-animation">
        MATTHIAS&nbsp;SILBERHAIN
      </div>
    </div>
  `;

  document.body.prepend(preloader);


  /* =====================================================
     FOOTER JAHR
  ===================================================== */

  const yearElement = document.getElementById("jahr");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }


  /* =====================================================
     BURGER MENU (MOBILE)
  ===================================================== */

  const burger = document.getElementById("burger");
  const navigation = document.getElementById("navigation");

  if (burger && navigation) {
    burger.addEventListener("click", () => {
      const isOpen = navigation.classList.toggle("aktiv");
      burger.setAttribute("aria-expanded", isOpen);
    });
  }


  /* =====================================================
     PRELOADER AUSBLENDEN
  ===================================================== */

  window.addEventListener("load", () => {

    const PRELOADER_DURATION = 3200; // Timing zur CSS-Animation

    setTimeout(() => {
      preloader.classList.add("fade-out");

      setTimeout(() => {
        preloader.remove();
      }, 600);

    }, PRELOADER_DURATION);

  });

});
