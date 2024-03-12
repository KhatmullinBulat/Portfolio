document.querySelector("#burger").addEventListener("click", function () {
  document.querySelector("#menu").classList.toggle("is-active");
  document.querySelector("#logo").classList.toggle("logo-is-active");
});

document.querySelector("#close-menu").addEventListener("click", function () {
  document.querySelector("#menu").classList.toggle("is-active");
  document.querySelector("#logo").classList.toggle("logo-is-active");
});
