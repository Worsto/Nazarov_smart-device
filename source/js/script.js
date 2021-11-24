'use strict';
// top section button content

const MOBILE_VIEWPORT_WIDTH_MAX = 767;
const BUTTON_FREE_CONSULT_MOBILE_TEXT_CONTENT = 'Бесплатная консультация';

const viewPortWidth = window.innerWidth;
const buttonFreeConsult = document.querySelector('.top-section__button');

if (viewPortWidth <= MOBILE_VIEWPORT_WIDTH_MAX) {
  buttonFreeConsult.textContent = BUTTON_FREE_CONSULT_MOBILE_TEXT_CONTENT;
};

// popup


// menu mobile

const menuHeadings = document.querySelectorAll(`.page-footer__menu`);

const switchVisability = (evt) => {
  let wasVisible = false;
  const menu = evt.target;
  const menus = document.querySelectorAll(`.page-footer__menu`);

  wasVisible = menu.classList.contains(`page-footer__menu--opened`) ? true : false;
  menus.forEach((item) => {
    if (item.classList.contains(`page-footer__menu--opened`)) {
      item.classList.remove(`page-footer__menu--opened`);
      item.classList.add(`page-footer__menu--closed`);
    }
  });

  if (!wasVisible) {
    menu.classList.remove(`page-footer__menu--closed`);
    menu.classList.add(`page-footer__menu--opened`);
  }
};

const closedPart = document.querySelector('.page-footer__navigation');
closedPart.classList.remove('page-footer__menu--opened');
closedPart.classList.add('page-footer__menu--closed');

menuHeadings.forEach((item) => item.addEventListener(`click`, switchVisability));

// mask
