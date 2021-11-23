'use strict';
// top section button content

const MOBILE_VIEWPORT_WIDTH_MAX = 767;
const BUTTON_FREE_CONSULT_MOBILE_TEXT_CONTENT = 'Бесплатная консультация';

const viewPortWidth = window.innerWidth;
const buttonFreeConsult = document.querySelector('.top-section__button');

if (viewPortWidth <= MOBILE_VIEWPORT_WIDTH_MAX) {
  buttonFreeConsult.textContent = BUTTON_FREE_CONSULT_MOBILE_TEXT_CONTENT;
};
