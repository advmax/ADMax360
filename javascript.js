document.addEventListener("DOMContentLoaded", () => {
  const statsSection = document.querySelector(".stats-section");
  const statNumbers = document.querySelectorAll(".stat-number");
  let hasAnimated = false;

  function animateNumbers() {
    if (hasAnimated) return;
    statNumbers.forEach((stat) => {
      const target = +stat.getAttribute("data-target");
      const suffix = stat.getAttribute("data-suffix") || "";
      let count = 0;
      const increment = target / 100;

      const updateCount = () => {
        count += increment;
        if (count < target) {
          stat.textContent = Math.ceil(count) + suffix;
          requestAnimationFrame(updateCount);
        } else {
          stat.textContent = target + suffix;
        }
      };
      updateCount();
    });
    hasAnimated = true;
  }

  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  function checkScroll() {
    if (isElementInViewport(statsSection)) {
      animateNumbers();
      window.removeEventListener("scroll", checkScroll);
    }
  }

  window.addEventListener("scroll", checkScroll);
  checkScroll(); // Check on load in case already in viewport
});

document.addEventListener("DOMContentLoaded", function () {
  var swiper = new Swiper(".swiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 100,
      modifier: 2,
      slideShadows: true,
    },
    keyboard: {
      enabled: true,
    },
    mousewheel: {
      thresholdDelta: 70,
    },
    spaceBetween: 60,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    on: {
      slideChange: function () {
        // عند تغيير الشريحة، التأكد من تطبيق التأثيرات على الطبقة
        let slides = document.querySelectorAll(".swiper-slide");
        slides.forEach((slide) => {
          slide.classList.remove("swiper-slide-active");
        });
        slides[this.activeIndex].classList.add("swiper-slide-active");
      },
    },
  });
});

document.addEventListener("DOMContentLoaded", function () {
  let language = localStorage.getItem("language") || "ar";
  loadTranslation(language);
  document
    .getElementById("languageSwitcher")
    .addEventListener("click", function () {
      language = language === "ar" ? "en" : "ar";
      localStorage.setItem("language", language);
      loadTranslation(language);
    });
  function loadTranslation(language) {
    fetch("translations.json")
      .then((response) => response.json())
      .then((data) => {
        document.documentElement.setAttribute("lang", lang);
        document.dir = lang === "ar" ? "rtl" : "ltr";
        document.querySelectorAll("[data-key]").forEach((element) => {
          const key = element.getAttribute("data-key");
          if (data[lang][key]) {
            element.textContent = data[lang][key];
          }
        });
      })
      .catch((error) => console.error("Error loading translation", error));
  }
});
