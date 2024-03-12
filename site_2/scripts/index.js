window.addEventListener("DOMContentLoaded", function () {
  const swiper = new Swiper(".swiper", {
    speed: 1000,

    direction: "horizontal",
    loop: true,

    autoplay: {
      delay: 5000,
    },

    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  document
    .querySelectorAll(".section-how__step-btn")
    .forEach(function (tabsBtn) {
      tabsBtn.addEventListener("click", function (event) {
        const path = event.currentTarget.dataset.path;

        document
          .querySelectorAll(".section-how__description")
          .forEach(function (tabContent) {
            tabContent.classList.remove("tab-content-active");

            document
              .querySelectorAll(".section-how__step-btn")
              .forEach(function (tabs) {
                tabs.classList.remove("tab-active");
              });
          });

        document
          .querySelector(`[data-target="${path}"]`)
          .classList.add("tab-content-active");
        document
          .querySelector(`[data-path="${path}"]`)
          .classList.add("tab-active");
      });
    });

  $(".section-faq__accardion-answer").hide();
  $(".section-faq__accordion-list-content").click(function () {
    if ($(this).hasClass("active")) {
      $(this)
        .removeClass("active")
        .find(".section-faq__accardion-answer")
        .slideUp();
    } else {
      $(".section-faq__accardion-answer").slideUp();
      $(".section-faq__accordion-list-content.active").removeClass("active");
      $(this)
        .addClass("active")
        .find(".section-faq__accardion-answer")
        .slideDown();
    }
    return false;
  });

  document.querySelector("#burger").addEventListener("click", function () {
    document.querySelector("#menu").classList.toggle("is-active");
  });

  document.querySelector("#close-menu").addEventListener("click", function () {
    document.querySelector("#menu").classList.toggle("is-active");
  });
});
