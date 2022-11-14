class Slider {
  constructor(
    sliderSelector,
    slideSelector,
    prevButtonSelector,
    nextButtonSelector,
    paginationSelector,
    counterSelector,
    activeSlideClass,
    activePaginationClass,
    currentSlideNumber = 1
  ) {
    // elements
    this._slider = document.querySelector(sliderSelector);
    this._slides = this._slider.querySelectorAll(slideSelector);
    this._prev = document.querySelector(prevButtonSelector);
    this._next = document.querySelector(nextButtonSelector);
    this._paginations = document.querySelectorAll(paginationSelector);
    this._counter = document.querySelector(counterSelector);
    // active classes
    this._activeSlideClass = activeSlideClass;
    this._activePaginationClass = activePaginationClass;
    // properties
    this._length = this._slides.length;
    this._index = (currentSlideNumber <= this._length && currentSlideNumber > 0) ? currentSlideNumber : 1;
  }

  // methods
  _clearSlide(slide) {
    slide.classList.remove(this._activeSlideClass);
  }

  _clearSlides() {
    this._slides.forEach(slide => this._clearSlide(slide));
  }

  _updateControlButtons() {
    if (this._isFirstIndex()) {
      this._prev.disabled = true;
      this._next.disabled = false;
    } else if (this._isLastIndex()) {
      this._prev.disabled = false;
      this._next.disabled = true;
    } else {
      this._prev.disabled = false;
      this._next.disabled = false;
    }
  }

  _formatCounterNumber(number) {
    return String(number).padStart(2, '0')
  }

  _updateCounter() {
    this._counter.textContent = this._formatCounterNumber(this._index);
  }

  _clearPagination(pagination) {
    pagination.classList.remove(this._activePaginationClass);
  }

  _clearPaginations() {
    this._paginations.forEach(pagination => this._clearPagination(pagination));
  }

  _setSlide(index = this._index) {
    this._clearSlides();
    this._slides[index - 1].classList.add(this._activeSlideClass);
    this._clearPaginations();
    this._paginations[index - 1].classList.add(this._activePaginationClass);
    this._updateControlButtons();
    this._updateCounter();
  }

  _addEventListenersForControlButtons() {
    this._prev.addEventListener('click', this._onClickPrev.bind(this));
    this._next.addEventListener('click', this._onClickNext.bind(this));
  }

  _addEventListenersForPaginations() {
    this._paginations.forEach((pagination, index) => {
      pagination.addEventListener('click', () => {
        this._index = index + 1;
        this._setSlide();
      });
    });
  }

  // Handlers
  _onClickPrev() {
    if (!this._isFirstIndex()) {
      this._setSlide(--this._index);
    }
  }

  _onClickNext() {
    if (!this._isLastIndex()) {
      this._setSlide(++this._index);
    }
  }

  // predicates
  _isLastIndex() {
    return this._index >= this._length;
  }

  _isFirstIndex() {
    return this._index <= 1;
  }

  // public
  start() {
    this._setSlide();
    this._addEventListenersForControlButtons();
    this._addEventListenersForPaginations();
  }
}
