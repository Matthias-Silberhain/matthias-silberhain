document.addEventListener("DOMContentLoaded", () => {
  const preloader = document.getElementById("preloader");

  setTimeout(() => {
    preloader.classList.add("fade-out");

    preloader.addEventListener("animationend", () => {
      preloader.remove();
    });
  }, 1600); // exakt Länge der Logo-Animation
});

// Mobile Menü
const burger = document.getElementById("burger");
const navigation = document.getElementById("navigation");

burger.addEventListener("click", () => {
  navigation.classList.toggle("aktiv");
});

// Jahr im Footer
document.getElementById("jahr").textContent = new Date().getFullYear();
