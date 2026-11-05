const burgerBtn = document.getElementById('burgerBtn');
const labsMenu = document.getElementById('labsMenu');

burgerBtn.addEventListener('click', () => {
  burgerBtn.classList.toggle('header__burger-button--active');
  labsMenu.classList.toggle('labs-menu--open');
});