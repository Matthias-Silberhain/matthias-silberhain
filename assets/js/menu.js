document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     TYPEWRITER PRELOADER - LOGO GETRENNT
  ========================= */

  const text = "MATTHIAS SILBERHAIN";
  const textEl = document.getElementById("type-text");
  const cursor = document.querySelector(".cursor");
  const preloader = document.getElementById("preloader");

  // Prüfen ob Elemente existieren
  if (!textEl || !cursor || !preloader) {
    console.error("Preloader Elemente fehlen!");
    return;
  }

  let index = 0;
  const speed = 80;

  function typeWriter() {
    if (index < text.length) {
      textEl.textContent += text.charAt(index);
      index++;
      setTimeout(typeWriter, speed);
    } else {
      // Cursor ausblenden
      cursor.style.display = "none";
      
      // Kurz warten dann Preloader ausblenden
      setTimeout(() => {
        preloader.style.opacity = "0";
        preloader.style.transition = "opacity 0.6s ease";
      }, 800);
      
      // Preloader komplett ausblenden
      setTimeout(() => {
        preloader.style.display = "none";
      }, 1400);
    }
  }

  // Start Typewriter
  setTimeout(typeWriter, 300);

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
