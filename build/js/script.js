'use strict';
// top section button content

const MOBILE_VIEWPORT_WIDTH_MAX = 767;
const BUTTON_FREE_CONSULT_MOBILE_TEXT_CONTENT = 'Бесплатная консультация';

const viewPortWidth = window.innerWidth;
const buttonFreeConsult = document.querySelector('.top-section__button');
const isMobile = viewPortWidth <= MOBILE_VIEWPORT_WIDTH_MAX;

if (isMobile) {
  buttonFreeConsult.textContent = BUTTON_FREE_CONSULT_MOBILE_TEXT_CONTENT;
};

// popup

const callButton = document.querySelector(`.contacts__button`);
const closeButton = document.querySelector(`#close-button`);
const modalForm = document.querySelector(`.popup`);
const userName = document.querySelector(`#name-popup`);
const phone = document.querySelector(`#tel-popup`);
const question = document.querySelector(`#question-popup`);
let isStorageSupport = true;
let storageName = ``;
let storagePhone = ``;
let storageQuestion = ``;
const form = document.querySelector(`.popup__form form`);

const closeForm = () => {
  if (modalForm.classList.contains(`popup--showing`)) {
    modalForm.classList.remove(`popup--showing`);
    modalForm.classList.add(`popup--closed`);
    document.body.style.overflow = ``;
  }
};

const showForm = () => {
  if (modalForm.classList.contains(`popup--closed`)) {
    modalForm.classList.remove(`popup--closed`);
    modalForm.classList.add(`popup--showing`);
    document.body.style.overflow = `hidden`;
  }
  if (userName) {
    userName.focus();
    userName.value = storageName;
  }

  if (phone) {
    phone.value = storagePhone;
  }

  if (question) {
    question.value = storageQuestion;
  }
}

const onFormClose = (evt) => {
  evt.preventDefault();
  closeForm();
  window.removeEventListener(`keydown`, onEscPress);
}

const onFormOpen = (evt) => {
  evt.preventDefault();
  showForm();
  window.addEventListener(`keydown`, onEscPress);
}

const onEscPress = (evt) => {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    closeForm();
  }
}

if(callButton) {
  callButton.addEventListener(`click`, onFormOpen);
};

if(closeButton) {
  closeButton.addEventListener(`click`, onFormClose);
};

if (modalForm) {
  modalForm.addEventListener(`click`, (evt) => {
    const target = evt.target;
    if (target.classList.contains(`popup`)) {
      closeForm();
    };
  });
};

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


if (isMobile) {
  const closedPart = document.querySelector('.page-footer__navigation');
  closedPart.classList.remove('page-footer__menu--opened');
  closedPart.classList.add('page-footer__menu--closed');

  menuHeadings.forEach((item) => item.addEventListener(`click`, switchVisability));
}

// mask

window.addEventListener("DOMContentLoaded", function () {
  function setCursorPosition(pos, elem) {
    elem.focus();
    if (elem.setSelectionRange) elem.setSelectionRange(pos, pos);
    else if (elem.createTextRange) {
      const range = elem.createTextRange();
      range.collapse(true);
      range.moveEnd("character", pos);
      range.moveStart("character", pos);
      range.select()
    }
  }

  function mask(event) {
    let matrix = "+7 (___) ___ ____",
      i = 0,
      def = matrix.replace(/\D/g, ""),
      val = this.value.replace(/\D/g, "");
    if (def.length >= val.length) val = def;
    this.value = matrix.replace(/./g, function (a) {
      return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a
    });
    if (event.type == "blur") {
      if (this.value.length == 2) this.value = ""
    } else setCursorPosition(this.value.length, this)
  };
  const input = document.querySelector("#tel");
  if (input) {
    input.addEventListener("input", mask, false);
    input.addEventListener("focus", mask, false);
    input.addEventListener("blur", mask, false);
  }
});

// local storage

try {
  storageName = localStorage.getItem(`userName`);
  storagePhone = localStorage.getItem(`phone`);
  storageQuestion = localStorage.getItem(`question`);
} catch (err) {
  isStorageSupport = false;
}

if (form) {
  form.addEventListener(`submit`, () => {
    if (isStorageSupport) {
      localStorage.setItem(`userName`, userName.value);
      localStorage.setItem(`phone`, phone.value);
      localStorage.setItem(`question`, question.value);
    }
  })
};
