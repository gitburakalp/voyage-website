$(".hamburger-btn").on("click", e => {
  e.preventDefault();

  $(".header").toggleClass("is-shown");
});

let slidersArray = [];

let setCardsSlider = function() {
  var cardsSlider = null;
  var ww = $(window).width();

  if (ww < 768) {
    var sliderConfig = {
      spaceBetween: 5,
      slidesPerView: 1.0857,
      centeredSlides: true,
      containerModifierClass: "hotel-cards-slider--",
      wrapperClass: "hotel-cards-wrapper",
      slideClass: "hotel-cards-slide",
      slideActiveClass: "hotel-cards-slide--active",
      slideNextClass: "hotel-cards-slide--next",
      slidePrevClass: "hotel-cards-slide--prev",
      pagination: {
        el: ".hotel-cards-container .hotel-cards-pagination",
        bulletClass: "hotel-cards-pagination-bullet",
        bulletActiveClass: "hotel-cards-pagination-bullet--active",
        currentClass: "hotel-cards-pagination-bullet--current",
        hiddenClass: "hotel-cards-pagination-bullet--hidden",
        clickable: true
      }
    };

    cardsSlider = new Swiper(".hotel-cards-slider", sliderConfig);
  } else cardsSlider != null ? cardsSlider.destroy() : "";
};

$('[data-type="slider"]').each(function() {
  var $this = $(this);
  var thisType = $this.data("type");
  var sliderName = $this.data("slider-name");

  if (thisType == "slider") {
    switch (sliderName) {
      case "hero-slider":
        var sliderConfig = {
          slidesPerView: 1,
          spaceBetween: 0,
          speed: 1000,
          // autoplay: { delay: 5000 },
          containerModifierClass: "hero-slider--",
          wrapperClass: "hero-wrapper",
          slideClass: "hero-slide",
          slideActiveClass: "hero-slide--active",
          slideNextClass: "hero-slide--next",
          slidePrevClass: "hero-slide--prev",
          pagination: {
            el: ".hero-slider .hero-pagination",
            bulletClass: "hero-pagination-bullet",
            bulletActiveClass: "hero-pagination-bullet--active",
            currentClass: "hero-pagination-bullet--current",
            hiddenClass: "hero-pagination-bullet--hidden",
            clickable: true
          }
        };

        break;

      case "cards-slider":
        var sliderConfig = {
          slidesPerView: 3,
          spaceBetween: "1.37363%",
          containerModifierClass: "cards-slider--",
          wrapperClass: "cards-wrapper",
          slideClass: "cards-slide",
          slideActiveClass: "cards-slide--active",
          slideNextClass: "cards-slide--next",
          slidePrevClass: "cards-slide--prev",
          pagination: {
            el: ".cards-slider .cards-pagination",
            bulletClass: "cards-pagination-bullet",
            bulletActiveClass: "cards-pagination-bullet--active",
            currentClass: "cards-pagination-bullet--current",
            hiddenClass: "cards-pagination-bullet--hidden",
            clickable: true
          },
          breakpoints: {
            767.99: {
              slidesPerView: 1,
              spaceBetween: 15
            }
          }
        };

        break;
    }

    slidersArray.push(new Swiper($this, sliderConfig));
  }
});

document.addEventListener("DOMContentLoaded", function() {
  var lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));

  setVH();

  if ("IntersectionObserver" in window) {
    let lazyImageObserver = new IntersectionObserver(function(
      entries,
      observer
    ) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          let lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src;
          lazyImage.srcset = lazyImage.dataset.srcset;

          lazyImage.onload = function() {
            lazyImage.classList.remove("lazy");
          };

          lazyImageObserver.unobserve(lazyImage);
        }
      });
    });

    lazyImages.forEach(function(lazyImage) {
      lazyImageObserver.observe(lazyImage);
    });
  } else {
    // Possibly fall back to a more compatible method here
  }
});

window.addEventListener("DOMContentLoaded", () => {
  var body = document.querySelector("body");

  body.classList.remove("is-loading");
});

$(window).on({
  load: function() {
    $(".hero-slide .image").each(function() {
      var ww = $(window).width();
      setHeroSlideAR(ww);
    });

    setCardsSlider();
  },
  resize: function() {
    $(".hero-slide .image").each(function() {
      var ww = $(window).width();
      setHeroSlideAR(ww);
    });

    setCardsSlider();
  }
});
