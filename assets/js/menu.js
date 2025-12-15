document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     PRELOADER ELEMENTE
  ========================= */

  const preloader = document.getElementById("preloader");
  const logo = document.querySelector(".preloader-logo");
  const textContainer = document.querySelector(".preloader-text");
  const textEl = document.getElementById("type-text");
  const cursor = document.querySelector(".cursor");

  /* Logo Animation starten */
  if (logo) {
    logo.classList.add("animate");
  }

  /* =========================
     TYPEWRITER TEXT
  ========================= */

  const text = window.innerWidth <= 600
    ? "MATTHIAS\nSILBERHAIN"
    : "MATTHIAS SILBERHAIN";

  let index = 0;
  const speed = 110;

  function typeWriter() {
    if (index < text.length) {

      if (text.charAt(index) === "\n") {
        textEl.innerHTML += "<br>";
      } else {
        textEl.innerHTML += text.charAt(index);
      }

      index++;
      setTimeout(typeWriter, speed);

    } else {
      cursor.style.display = "none";

      /* Silber-Hauch */
      textContainer.classList.add("silver-glow");

      /* Ausblenden */
      setTimeout(() => {
        preloader.style.opacity = "0";
      }, 1400);

      setTimeout(() => {
        preloader.remove();
      }, 2000);
    }
  }

  /* Text nach Logo-Start beginnen */
  setTimeout(typeWriter, 700);

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
  if (year) {
    year.textContent = new Date().getFullYear();
  }

});
