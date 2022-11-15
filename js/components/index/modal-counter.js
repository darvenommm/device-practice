(function() {
  const counterParent = document.querySelector('.modal__count')
  const plus = counterParent.querySelector('.modal__count-plus');
  const minus = counterParent.querySelector('.modal__count-minus');
  const counter = counterParent.querySelector('.modal__count-input');

  function isValidCounterValue(value = counter.value) {
    return Number(value) > 0;
  }

  counter.addEventListener('change', () => {
    if (!isValidCounterValue()) {
      counter.value = 1;
    }
  });

  minus.addEventListener('click', () => {
    if (!isValidCounterValue(counter.value - 1)) {
      return;
    }

    counter.value = Number(counter.value) - 1;
  });

  plus.addEventListener('click', () => {
    counter.value = Number(counter.value) + 1;
  });
})();
