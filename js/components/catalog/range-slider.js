class RangeSlider {
  constructor(minRangeSelector, maxRangeSelector, minInputSelector, maxInputSelector, rangeLineSelector) {
    this._minRange = document.querySelector(minRangeSelector);
    this._maxRange = document.querySelector(maxRangeSelector);
    this._minInput = document.querySelector(minInputSelector);
    this._maxInput = document.querySelector(maxInputSelector);
    this._rangeLine = document.querySelector(rangeLineSelector);

    this._MAX_PRICE = Number(this._maxRange.max);
    this._MAX_RANGE_LINE_WIDTH = this._rangeLine.offsetWidth;
    this._PRICE_BETWEEN = 1000;
  }

  _setMinRange(minValue = this._minRange.value) {
    if (minValue < 0) {
      minValue = 0;
    }

    const maxRangeValue = Number(this._maxRange.value) - this._PRICE_BETWEEN;
    if (minValue > maxRangeValue) {
      minValue = maxRangeValue;
    }

    this._minRange.value = minValue;
    this._minInput.value = minValue;
    this._rangeLine.style.left = `${this._MAX_RANGE_LINE_WIDTH * (minValue / this._MAX_PRICE)}px`
  }

  _setMaxRange(maxValue = this._maxRange.value) {
    if (maxValue > this._MAX_PRICE) {
      maxValue = this._MAX_PRICE;
    }

    const minRangeValue = Number(this._minRange.value) + this._PRICE_BETWEEN;
    if (maxValue < minRangeValue) {
      maxValue = minRangeValue;
    }

    this._maxRange.value = maxValue;
    this._maxInput.value = maxValue;
    this._rangeLine.style.right = `${this._MAX_RANGE_LINE_WIDTH * ((this._MAX_PRICE - maxValue) / this._MAX_PRICE)}px`
  }

  _addEventListener(element, handler) {
    element.addEventListener('input', () => {
      handler.call(this, element.value)
    });
  }

  start() {
    this._setMinRange();
    this._setMaxRange();

    // ranges
    this._addEventListener(this._minRange, this._setMinRange);
    this._addEventListener(this._maxRange, this._setMaxRange);

    // inputes
    this._addEventListener(this._minInput, this._setMinRange);
    this._addEventListener(this._maxInput, this._setMaxRange);
  }
}
