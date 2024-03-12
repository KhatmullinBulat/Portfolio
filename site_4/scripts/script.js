window.addEventListener("DOMContentLoaded", function () {
  /* Burger */
  document.querySelector("#burger").addEventListener("click", function () {
    document.querySelector("#menu").classList.toggle("menu__is-active");
  });

  document.querySelector("#close-menu").addEventListener("click", function () {
    document.querySelector("#menu").classList.toggle("menu__is-active");
  });

  /* Search */
  document.querySelector("#search").addEventListener("click", function () {
    document
      .querySelector("#search-menu")
      .classList.toggle("search-menu__is-active");
  });

  document
    .querySelector("#close-search-menu")
    .addEventListener("click", function () {
      document
        .querySelector("#search-menu")
        .classList.toggle("search-menu__is-active");
    });

  /* Menu */

  $(document).ready(function () {
    $("#menu").on("click", "a", function (event) {
      event.preventDefault();

      var id = $(this).attr("href"),
        top = $(id).offset().top;

      $("body,html").animate({ scrollTop: top }, 1500);
    });
  });

  /* Menu Dropdown */

  const params = {
    btnClassName: "js-header-dropdown-btn",
    dropClassName: "js-header-drop",
    activeClassName: "is-active",
    disabledClassName: "is-disabled",
  };

  function onDisable(evt) {
    if (evt.target.classList.contains(params.disabledClassName)) {
      evt.target.classList.remove(
        params.disabledClassName,
        params.activeClassName
      );
      evt.target.removeEventListener("animationend", onDisable);
    }
  }

  function setMenuListener() {
    document.body.addEventListener("click", (evt) => {
      const activeElements = document.querySelectorAll(
        `.${params.btnClassName}.${params.activeClassName}, .${params.dropClassName}.${params.activeClassName}`
      );

      if (
        activeElements.length &&
        !evt.target.closest(`.${params.activeClassName}`)
      ) {
        activeElements.forEach((current) => {
          if (current.classList.contains(params.btnClassName)) {
            current.classList.remove(params.activeClassName);
          } else {
            current.classList.add(params.disabledClassName);
          }
        });
      }

      if (evt.target.closest(`.${params.btnClassName}`)) {
        const btn = evt.target.closest(`.${params.btnClassName}`);
        const path = btn.dataset.path;
        const drop = document.querySelector(
          `.${params.dropClassName}[data-target="${path}"]`
        );

        btn.classList.toggle(params.activeClassName);

        if (!drop.classList.contains(params.activeClassName)) {
          drop.classList.add(params.activeClassName);
          drop.addEventListener("animationend", onDisable);
        } else {
          drop.classList.add(params.disabledClassName);
        }
      }
    });
  }

  setMenuListener();

  $(".search-input").focus(function () {
    $(this).removeAttr("placeholder");
  });

  $(".search-input").blur(function () {
    $(this).attr("placeholder", "Поиск по сайту");
  });

  /* Swiper */

  const hero__swiper = new Swiper(".hero__swiper", {
    direction: "horizontal",
    loop: true,

    allowTouchMove: false,

    effect: "fade",

    autoplay: {
      delay: 7000,
    },
  });

  const gallerySlider = new Swiper(".gallery__slides-container", {
    slidesPerView: 1,
    grid: {
      rows: 1,
      fill: "row",
    },
    spaceBetween: 20,
    pagination: {
      el: ".gallery__swiper-pagination",
      type: "fraction",
    },
    navigation: {
      nextEl: ".swiper-btn-next",
      prevEl: ".swiper-btn-prev",
    },

    breakpoints: {
      440: {
        slidesPerView: 2,
        grid: {
          rows: 2,
        },
        spaceBetween: 30,
      },

      1200: {
        slidesPerView: 3,
        grid: {
          rows: 2,
        },
        spaceBetween: 50,
      },
    },

    a11y: false,
    keyboard: true,

    watchSlidesProgress: true,
    watchSlidesVisibility: true,
    slideVisibleClass: "slide-visible",

    on: {
      init: function () {
        this.slides.forEach((slide) => {
          if (!slide.classList.contains("slide-visible")) {
            slide.tabIndex = "-1";
          } else {
            slide.tabIndex = "";
          }
        });
      },
      slideChange: function () {
        this.slides.forEach((slide) => {
          if (!slide.classList.contains("slide-visible")) {
            slide.tabIndex = "-1";
          } else {
            slide.tabIndex = "";
          }
        });
      },
    },
  });

  let eventsSeeMoreBtn = document.querySelector(".events__btn");
  let eventsSlider = document.querySelector(".events__swiper");
  let allEvents = document.querySelectorAll(".events__swiper-card-wrap");
  eventsSeeMoreBtn.addEventListener("click", function () {
    allEvents.forEach((eventItem) => {
      eventItem.style.display = "block";
    });
    this.style.display = "none";
  });

  let eventsSwiper;

  eventsSlider.dataset.mobile = false;
  function eventsSliderFunc() {
    if ($(window).width() < 732 && eventsSlider.dataset.mobile == "false") {
      eventsSwiper = new Swiper(eventsSlider, {
        slidesPerView: 1,
        spaceBetween: 20,
        autoHeight: true,
        pagination: {
          el: ".events__swiper-pagination",
          clickable: true,
          bulletClass: "events__swiper-pagination-item",
          bulletActiveClass: "events__swiper-pagination-item-active",
          bulletElement: "li",
          modifierClass: "events-nav-",
        },
      });
      eventsSlider.dataset.mobile = "true";
    }
    if ($(window).width() >= 732 && eventsSlider.dataset.mobile == "true") {
      eventsSlider.dataset.mobile = "false";
      if (eventsSlider.classList.contains("swiper-initialized")) {
        // destroy is a Swiper's method
        eventsSwiper.destroy();
        // reset variable value
        eventsSwiper = undefined;
      }
    }
  }

  eventsSliderFunc();

  let editionsSlider = document.querySelector(".editions__swiper-wrap");
  let editionsSwiper;

  editionsSlider.dataset.mobile = false;
  function editionsSliderFunc() {
    if ($(window).width() >= 610 && editionsSlider.dataset.mobile == "false") {
      editionsSwiper = new Swiper(".editions__swiper-wrap", {
        direction: "horizontal",
        loop: false,

        allowTouchMove: false,

        speed: 1000,

        navigation: {
          nextEl: ".editions__swiper-button-next",
          prevEl: ".editions__swiper-button-prev",
        },

        pagination: {
          el: ".editions__swiper-pagination",
          type: "fraction",
        },

        slidesPerView: 2,
        slidesPerColumn: 1,
        slidesPerGroup: 1,
        spaceBetween: 34,
        slidersPerColumnFill: "row",

        breakpoints: {
          1024: {
            slidesPerView: 2,
            spaceBetween: 50,
          },

          1280: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        },
      });
      editionsSlider.dataset.mobile = true;
    }
    if ($(window).width() < 610 && editionsSlider.dataset.mobile == "true") {
      editionsSlider.dataset.mobile = "false";
      if (editionsSlider.classList.contains("swiper-initialized")) {
        // destroy is a Swiper's method
        editionsSwiper.destroy();
        // reset variable value
        editionsSwiper = undefined;
      }
    }
  }

  editionsSliderFunc();

  const project_partners = new Swiper(".project-partners__swiper", {
    direction: "horizontal",
    loop: false,

    allowTouchMove: false,

    navigation: {
      nextEl: ".project-partners__swiper-button-next",
      prevEl: ".project-partners__swiper-button-prev",
    },

    speed: 1000,

    slidesPerView: 1,
    slidesPerColumn: 1,
    slidesPerGroup: 1,
    slidersPerColumnFill: "row",

    breakpoints: {
      590: {
        slidesPerView: 2,
        spaceBetween: 34,
      },

      1024: {
        slidesPerView: 2,
        spaceBetween: 50,
      },

      1440: {
        slidesPerView: 3,
        spaceBetween: 50,
      },
    },
  });

  /* Modals */
  const btns = document.querySelectorAll(".gallery__swiper-slide");
  const modalOverlay = document.querySelector(".gallery__modal-overlay");
  const modals = document.querySelectorAll(".modal");
  const modalCloseBtn = document.querySelectorAll(".modal__close-btn");

  btns.forEach((el) => {
    el.addEventListener("click", (e) => {
      let path = e.currentTarget.getAttribute("data-path");

      modals.forEach((el) => {
        el.classList.remove("modal--visible");
      });

      document
        .querySelector(`[data-target="${path}"]`)
        .classList.add("modal--visible");
      modalOverlay.classList.add("gallery__modal-overlay--visible");
    });
  });

  modalOverlay.addEventListener("click", (e) => {
    if (e.target == modalOverlay) {
      modalOverlay.classList.remove("gallery__modal-overlay--visible");

      modals.forEach((el) => {
        el.classList.remove("modal--visible");
      });
    }
  });

  modalCloseBtn.forEach((el) => {
    el.addEventListener("click", (e) => {
      modalOverlay.classList.remove("gallery__modal-overlay--visible");

      modals.forEach((el) => {
        el.classList.remove("modal--visible");
      });
    });
  });

  /* Choices */
  var filters__element = document.querySelector(
    ".gallery__filters-select-elements"
  );
  var filters__choices = new Choices(filters__element, {
    searchEnabled: false,
    itemSelectText: "",
    placeholder: true,
    shouldSort: false,
    position: "bottom",
  });

  /* Catalog */
  /* Tabs */
  document
    .querySelectorAll(".catalog__accordion-information-link")
    .forEach(function (tabsBtn) {
      tabsBtn.addEventListener("click", function (event) {
        event.preventDefault();
        const path = event.currentTarget.dataset.path;

        document
          .querySelectorAll(".catalog__artist")
          .forEach(function (tabContent) {
            tabContent.classList.remove("tab-content-active");

            document
              .querySelectorAll(".catalog__accordion-information-link")
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

  /* Accordion */

  $(function () {
    $("#accordion").accordion({
      collapsible: true,
      icons: false,
      heightStyle: "content",
    });
  });

  /* Editions */
  const editionsBtn = document.querySelector(".editions__category-btn");
  const editionsItem = document.querySelectorAll(
    ".editions__category-content-item"
  );
  const editionsCheckbox = document.querySelectorAll(
    ".editions__category-content-checkbox"
  );
  const editionsCategoryContentCabel = this.document.querySelectorAll(
    "editions__category-content-label"
  );
  const editionsBtnArrow = document.querySelector(".editions__btn-arrow");

  function editionsCategoryFunc() {
    if ($(window).width() >= 610) {
      editionsCheckbox.forEach((el) => {
        if (el.activeElement === true) {
          el.parentElement.parentNode.classList.add(
            "editions__category-content-item-active-color"
          );
        }
        if (el.checked === true) {
          el.parentElement.parentNode.classList.add(
            "editions__category-content-item-active-color"
          );
        } else {
          el.parentElement.parentNode.classList.remove(
            "editions__category-content-item-active-color"
          );
        }
      });
    }
    let ActiveCheckbox = () => {
      editionsCheckbox.forEach((el) => {
        if (el.checked === true) {
          el.parentElement.parentNode.classList.add(
            "editions__category-content-item-active",
            "editions__category-content-item-active-color"
          );
        }
      });
    };

    let EditionsAccordion = () => {
      editionsBtn.addEventListener("click", () => {
        editionsBtnArrow.classList.toggle("editions__btn-arrow-active");
        editionsItem.forEach((el) => {
          el.classList.toggle("editions__category-content-item-active");
          ActiveCheckbox();
        });
      });
    };

    let EditionChecker = () => {
      for (let i = 0; i < editionsCheckbox.length; i++) {
        const el = editionsCheckbox[i];
        el.addEventListener("change", () => {
          if (
            !el.checked &&
            !editionsBtnArrow.classList.contains("editions__btn-arrow-active")
          ) {
            el.parentElement.parentNode.classList.remove(
              "editions__category-content-item-active",
              "editions__category-content-item-active-color"
            );
          }
          ActiveCheckbox();
        });
      }
      ActiveCheckbox();
    };
    EditionsAccordion();
    EditionChecker();
  }

  editionsCategoryFunc();

  // Tooltip

  tippy("#tooltip-1", {
    content(reference) {
      const id = reference.getAttribute("data-template");
      const template = document.getElementById(id);
      return template.innerHTML;
    },
    theme: "tomato",
    allowHTML: true,
    animation: "fade",
    interactive: true,
    arrow: true,
  });

  tippy("#tooltip-2", {
    content(reference) {
      const id = reference.getAttribute("data-template");
      const template = document.getElementById(id);
      return template.innerHTML;
    },
    theme: "tomato",
    allowHTML: true,
    animation: "fade",
    interactive: true,
    arrow: true,
  });

  tippy("#tooltip-3", {
    content(reference) {
      const id = reference.getAttribute("data-template");
      const template = document.getElementById(id);
      return template.innerHTML;
    },
    theme: "tomato",
    allowHTML: true,
    animation: "fade",
    interactive: true,
    arrow: true,
  });

  ymaps.ready(init);
  function init() {
    var myMap = new ymaps.Map("map", {
      center: [55.758468, 37.601088],
      controls: [],
      zoom: 15,
    });

    myPlacemarkWithContent = new ymaps.Placemark(
      [55.758468, 37.601088],
      {
        hintContent: "Balanchard",
      },
      {
        iconLayout: "default#imageWithContent",
        iconImageHref: "img/other/map-point.svg",
        iconImageSize: [20, 20],
        iconImageOffset: [-24, -24],
        iconContentOffset: [15, 15],
      }
    );

    myMap.geoObjects.add(myPlacemarkWithContent);
  }

  /* Form */
  var selector = document.querySelector("input[type='tel']");
  var im = new Inputmask("+7 (999) - 999 - 99 - 99");

  im.mask(selector);

  new JustValidate("#form", {
    rules: {
      name: {
        required: true,
        minLength: 2,
        maxLength: 20,
      },
      tel: {
        required: true,
        function: (name, value) => {
          const tel = selector.inputmask.unmaskedvalue();
          return Number(tel) && tel.length === 10;
        },
      },
    },
    messages: {
      name: {
        required: "Это поле обязательное для заполнения",
        minLength: "Вы ввели слишком мало символов",
        maxLength: "Вы ввели слишком много символов",
      },
      tel: {
        required: "Это поле обязательное для заполнения",
        function: "Введите корректный номер телефона",
      },
    },
    submitHandler: function (form, values, ajax) {
      ajax({
        url: "http://jsonplaceholder.typicode.com/posts",
        method: "POST",
        data: values,
        async: true,
        callback: (_) => {
          document.querySelector(
            ".contacts__form-success-message"
          ).style.display = "inline-block";
        },
      });
    },
  });

  window.addEventListener("resize", (_) => {
    eventsSliderFunc();
    editionsCategoryFunc();
    editionsSliderFunc();
  });
});
