document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     TYPEWRITER PRELOADER
  ========================= */

  // Text: Desktop einzeilig, Mobile zweizeilig
  const text = window.innerWidth <= 600
    ? "MATTHIAS\nSILBERHAIN"
    : "MATTHIAS SILBERHAIN";

  const textEl = document.getElementById("type-text");
  const cursor = document.querySelector(".cursor");
  const preloader = document.getElementById("preloader");
  const textContainer = document.querySelector(".preloader-text");

  let index = 0;

  /* Schreibgeschwindigkeit */
  const speed = 110;

  function typeWriter() {
    if (index < text.length) {

      // Zeilenumbruch korrekt ausgeben
      if (text.charAt(index) === "\n") {
        textEl.innerHTML += "<br>";
      } else {
        textEl.innerHTML += text.charAt(index);
      }

      index++;
      setTimeout(typeWriter, speed);

    } else {
      /* Cursor stoppen */
      cursor.style.display = "none";

      /* Silber-Licht-Hauch */
      textContainer.classList.add("silver-glow");

      /* Nach Wirkung ausblenden */
      setTimeout(() => {
        preloader.style.opacity = "0";
      }, 1400);

      /* Preloader sicher entfernen */
      setTimeout(() => {
        preloader.remove();
      }, 2000);
    }
  }

  /* Start */
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
