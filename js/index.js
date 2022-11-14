// slider
new Slider(
  '.hero__slider',
  '.hero__slider-item',
  '.hero__slider-prev',
  '.hero__slider-next',
  '.hero__slider-pagination-button',
  '.hero__slider-current-slide',
  'hero__slider-item--current',
  'hero__slider-pagination-button--active'
).start();

// tabs
new TabsShower(
  '.service__tab-button',
  '.service__item',
  'service__tab-button--active',
  'service__item--current'
).start();
