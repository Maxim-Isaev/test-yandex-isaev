document.addEventListener("DOMContentLoaded", function () {
  const cardsContainer = document.getElementById("participantsCards");
  const prevButton = document.getElementById("participantsPrev");
  const nextButton = document.getElementById("participantsNext");
  const counterSpan = document.getElementById("participantsCounter");

  if (!cardsContainer || !prevButton || !nextButton || !counterSpan) return;

  const cards = Array.from(cardsContainer.children);
  const totalCards = cards.length;

  function getVisibleCardsCount() {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 1024) return 2;
    return 3;
  }

  let currentIndex = 0;
  let visibleCount = getVisibleCardsCount();
  let totalSlides = Math.ceil(totalCards / visibleCount);
  let autoTimer = null;

  function updateCarousel() {
    visibleCount = getVisibleCardsCount();
    totalSlides = Math.ceil(totalCards / visibleCount);

    if (currentIndex >= totalSlides) currentIndex = totalSlides - 1;
    if (currentIndex < 0) currentIndex = 0;

    const card = cards[0];
    if (!card) return;
    const cardWidth = card.offsetWidth;
    const gap = parseFloat(getComputedStyle(cardsContainer).gap) || 0;
    const slideWidth = cardWidth + gap;
    const newTranslate = -currentIndex * slideWidth * visibleCount;
    cardsContainer.style.transform = `translateX(${newTranslate}px)`;

    counterSpan.textContent = `${currentIndex + 1} / ${totalSlides}`;
    prevButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex === totalSlides - 1;
  }

  function autoNextSlide() {
    if (currentIndex >= totalSlides - 1) {
      currentIndex = 0;
    } else {
      currentIndex++;
    }
    updateCarousel();
    resetAutoTimer();
  }

  function manualNextSlide() {
    if (currentIndex < totalSlides - 1) {
      currentIndex++;
      updateCarousel();
      resetAutoTimer();
    }
  }

  function manualPrevSlide() {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
      resetAutoTimer();
    }
  }

  function startAutoTimer() {
    if (autoTimer) clearInterval(autoTimer);
    autoTimer = setInterval(() => {
      autoNextSlide();
    }, 4000);
  }

  function resetAutoTimer() {
    if (autoTimer) {
      clearInterval(autoTimer);
      startAutoTimer();
    }
  }

  prevButton.addEventListener("click", manualPrevSlide);
  nextButton.addEventListener("click", manualNextSlide);

  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      updateCarousel();
      resetAutoTimer();
    }, 150);
  });

  updateCarousel();
  startAutoTimer();

  // Плавный скролл по кнопкам
  const btnLeft = document.querySelector(".button_left");
  const btnRight = document.querySelector(".button_right");

  if (btnLeft) {
    btnLeft.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(".support_tournament-text");
      const isMobile = window.innerWidth <= 768;
      const target = isMobile
        ? document.querySelector(".support_tournament-text-mobile")
        : document.querySelector(".support_tournament-text");
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }

  if (btnRight) {
    btnRight.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(".stages_transformation");
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }
});

// Карусель этапов (мобильная)
(function () {
  const cardsContainer = document.getElementById("stagesMobileCards");
  const prevButton = document.getElementById("stagesMobilePrev");
  const nextButton = document.getElementById("stagesMobileNext");
  const counterSpan = document.getElementById("stagesMobileCounter");

  if (!cardsContainer || !prevButton || !nextButton || !counterSpan) return;

  const cards = Array.from(cardsContainer.children);
  const totalCards = cards.length;
  let currentIndex = 0;

  function updateMobileStages() {
    if (!cards[0]) return;
    const cardWidth = cards[0].offsetWidth;
    const gap = parseFloat(getComputedStyle(cardsContainer).gap) || 0;
    const slideWidth = cardWidth + gap;
    const newTranslate = -currentIndex * slideWidth;
    cardsContainer.style.transform = `translateX(${newTranslate}px)`;
    counterSpan.textContent = `${currentIndex + 1} / ${totalCards}`;
    prevButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex === totalCards - 1;
  }

  prevButton.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateMobileStages();
    }
  });
  nextButton.addEventListener("click", () => {
    if (currentIndex < totalCards - 1) {
      currentIndex++;
      updateMobileStages();
    }
  });
  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      if (window.innerWidth <= 768) updateMobileStages();
    }, 150);
  });
  if (window.innerWidth <= 768) updateMobileStages();
})();
