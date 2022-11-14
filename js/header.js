class PopoverShower {
  constructor(parentSelector, buttonSelector, popoverSelector) {
    this._parent = document.querySelector(parentSelector);
    this._button = this._parent.querySelector(buttonSelector);
    this._popover = this._parent.querySelector(popoverSelector);
  }

  _addEventListenerForButtonClick() {
    this._button.addEventListener('click', (event) => {
      event.preventDefault();
      this._togglePopover();
    });
  }

  _hidePopoverAfterMissClick() {
    document.body.addEventListener('click', (event) => {
      if (!this._parent.contains(event.target)) {
        this._hidePopover();
      }
    });
  }

  _hidePopover() {
    this._popover.style.display = 'none';
  }

  _togglePopover() {
    this._popover.style.display = (this._popover.style.display === 'block') ? 'none' : 'block';
  }

  start() {
    this._addEventListenerForButtonClick();
    this._hidePopoverAfterMissClick();
  }
}

// cart
new PopoverShower(
  '.header__cart',
  '.header__cart-button',
  '.header__cart-popover-container'
).start();

// catalog
class CatalogPopoverShower extends PopoverShower {
  constructor(parentSelector, buttonSelector, popoverSelector, plusSelector, minusSelector) {
    super(parentSelector, buttonSelector, popoverSelector);
    this._plus = this._button.querySelector(plusSelector);
    this._minus = this._button.querySelector(minusSelector);
    this._isChecked = false;
  }

  _togglePopover() {
    super._togglePopover();
    this._isChecked = !this._isChecked;
    if (this._isChecked) {
      this._plus.style.display = 'none';
      this._minus.style.display = 'block'
    } else {
      this._plus.style.display = 'block';
      this._minus.style.display = 'none'
    }
  }

  _hidePopover() {
    super._hidePopover();
    this._plus.style.display = 'block';
    this._minus.style.display = 'none';
    this._isChecked = false;
  }
}

new CatalogPopoverShower(
  '.header__catalog',
  '.header__catalog-button',
  '.header__catalog-lists-container',
  '.header__catalog-plus',
  '.header__catalog-minus'
).start();
