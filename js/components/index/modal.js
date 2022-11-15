(function() {
  'use strict';

  const modal = document.querySelector('.modal');
  const openButton = document.querySelector('.delivery__link');
  const closeButton = modal.querySelector('.modal__exit');
  const HIDE_CLASS = 'hide';
  const MODAL_CONTAINER_SELECTOR = '.modal__container';

  function openModal() {
    modal.classList.remove(HIDE_CLASS);

    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.add(HIDE_CLASS);

    document.body.style.overflow = '';
  }

  // open
  openButton.addEventListener('click', (event) => {
    event.preventDefault();

    openModal();
  });

  // close
  closeButton.addEventListener('click', () => {
    closeModal();
  });

  document.body.addEventListener('click', (event) => {
    if (event.target.matches(MODAL_CONTAINER_SELECTOR)) {
      closeModal();
    }
  });

  window.addEventListener('keydown', (event) => {
    if (event.key === "Escape") {
      closeModal();
    }
  });
})();
