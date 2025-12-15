document.addEventListener("DOMContentLoaded", () => {

  const preloader = document.getElementById("preloader");

  setTimeout(() => {
    preloader.style.opacity = "0";
  }, 1800);

  setTimeout(() => {
    preloader.style.display = "none";
    document.body.classList.remove("preloader-active");
  }, 2600);

  const burger = document.getElementById("burger");
  const navigation = document.getElementById("navigation");

  burger.addEventListener("click", () => {
    navigation.classList.toggle("aktiv");
  });

  document.getElementById("jahr").textContent =
    new Date().getFullYear();
});
