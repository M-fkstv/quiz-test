import '../css/index.css';

const burgerBtn = document.querySelector('.header__burger');
const nav = document.querySelector('.header__nav');
const modalBtn = document.getElementById('modal-button');
const modal = document.getElementById('modal');
const closeModalBtn = document.getElementById('close-modal');
const modalFormBtn = document.querySelector('.form__button');
const modalForm = document.querySelector('.modal-form');
const modalFormResponse = document.querySelector('.modal__response');

burgerBtn.addEventListener('click', () => {
  nav.classList.toggle('active');
  burgerBtn.classList.toggle('header__burger-active');
});

// --------Modal, modal form---------------

modalBtn.addEventListener('click', () => {
  nav.classList.contains('active') ? nav.classList.remove('active') : '';

  modal.classList.add('modal-active');
  document.body.style.overflow = 'hidden';
});

closeModalBtn.addEventListener('click', () => {
  modal.classList.remove('modal-active');
  document.body.style.overflow = 'auto';
});

modalFormBtn.addEventListener('click', () => {
  modalForm.classList.toggle('modal-active');
  modalFormResponse.classList.toggle('modal-active');
});

// --------Quiz section-------------

const text1 = document.getElementById('s1');
const text2 = document.getElementById('s2');
const nextBtn = document.getElementById('quiz__form-next');
const prevBtn = document.getElementById('quiz__form-prev');
const inputsText = [];

// -----------Проверка чекбоксов, радио---------------
const radioInputs = [...document.querySelectorAll('input[type=radio]')];
const checkBoxInputs = [...document.querySelectorAll('input[type=checkbox]')];

checkBoxInputs.forEach((checkbox) => {
  checkbox.addEventListener('change', () => {
    checkbox.checked
      ? inputsText.push(checkbox.labels[0].outerText)
      : inputsText.splice(inputsText.indexOf(checkbox.labels[0].outerText), 1);
    text1.textContent = inputsText;
    checkBoxInputs.some((checkbox) => checkbox.checked)
      ? nextBtn.removeAttribute('disabled')
      : nextBtn.setAttribute('disabled', 'disabled');
  });
});

radioInputs.forEach((radio) => {
  radio.addEventListener('change', () => {
    radio.checked ? (text2.textContent = radio.labels[0].outerText) : '';
    radioInputs.some((radio) => radio.checked)
      ? nextBtn.removeAttribute('disabled')
      : nextBtn.setAttribute('disabled', 'disabled');
  });
});

// ------------Показать, скрыть шаги формы---------------

const varsiants = document.querySelectorAll('.step');
const tooltips = document.querySelectorAll('.tooltip');

let activeIndex = 0;

const setActiveIndex = (n) => {
  varsiants[activeIndex].style.display = 'none';
  activeIndex = activeIndex + n;

  if (activeIndex <= 2) {
    tooltips[activeIndex].classList.add('active');
    tooltips[activeIndex].style.display = 'block';
    tooltips[activeIndex - `${n}`].classList.remove('active');
  }

  activeIndex > 0
    ? (prevBtn.style.display = 'block')
    : (prevBtn.style.display = 'none');

  if (activeIndex >= varsiants.length) {
    document.querySelector('.quiz__form').submit();
    return false;
  }

  varsiants[activeIndex].style.display = 'block';
};

nextBtn.addEventListener('click', () => setActiveIndex(1));
prevBtn.addEventListener('click', () => setActiveIndex(-1));

// -----------Select----------

const selectHeader = document.querySelector('.select__header');
const selectBody = document.querySelector('.select__body');
const selectValue = document.querySelector('.select__header-value');
const selectItems = document.querySelectorAll('.select__item');
const arr = document.querySelector('.arr');

selectHeader.addEventListener('click', () => {
  selectBody.classList.toggle('disable');
  arr.classList.toggle('open');
});

selectItems.forEach((item) => {
  item.addEventListener('click', (e) => {
    selectValue.textContent = e.target.textContent;
    selectBody.classList.toggle('disable');
    arr.classList.toggle('open');
  });
});

const fileInput = document.getElementById('fileInput');
const fileInputLabel = document.getElementById('fileInputLabel');

const displayFileName = (event) => {
  const input = event.target;

  if (input.files[0].size > 1048576) {
    fileInput.value = '';
    fileInputLabel.outerText = 'Не более 1 Mb';
    return false;
  }

  if (input.files && input.files.length > 0) {
    const fileName = input.files[0].name;
    fileInputLabel.outerText = fileName;
  }
};

fileInput.addEventListener('change', (e) => displayFileName(e));
