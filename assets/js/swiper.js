// eslint-disable-next-line no-undef, no-unused-vars
const swiper = new Swiper('.swiper', {
  loop: true,
  slidesPerView: 1,
  spaceBetween: 10,
  centeredSlides: true,

  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 5,
    },
    480: {
      slidesPerView: 2,
    },

    860: {
      slidesPerView: 3,
    },
    1240: {
      slidesPerView: 4,
    },
  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});
