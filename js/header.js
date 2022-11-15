class PopoverShower {
  constructor(parentSelector, buttonSelector, popoverSelector) {
    this._parent = document.querySelector(parentSelector);
    this._button = this._parent.querySelector(buttonSelector);
    this._popover = this._parent.querySelector(popoverSelector);
    this._isOpen = false;
    this._isOpenByFocus = false;
  }

  _addEventListenerForButtonFocus() {
    this._button.addEventListener('focus', () => {
      this._showPopover();
      this._isOpenByFocus = true;
    });
  }

  _addEventListenerForButtonClick() {
    this._button.addEventListener('click', (event) => {
      event.preventDefault();

      if (this._isOpenByFocus) {
        this._isOpen = true;
        this._isOpenByFocus = false;
      } else if (this._isOpen) {
        this._hidePopover();
      } else {
        this._showPopover();
        this._isOpen = true;
      }
    });
  }

  _addEventListenerForButtonBlur() {
    const onBlurButton = (event) => {
      const relatedTarget = event.relatedTarget;
      if (this._parent.contains(relatedTarget)) {
        relatedTarget.addEventListener('blur', onBlurButton);
      } else if (relatedTarget ===  null) {
        return;
      } else {
        this._hidePopover();
      }
    }

    this._button.addEventListener('blur', onBlurButton);
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
    this._isOpen = false;
  }

  _showPopover() {
    this._popover.style.display = 'block';
  }

  start() {
    this._addEventListenerForButtonFocus();
    this._addEventListenerForButtonClick();
    this._addEventListenerForButtonBlur();
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
  }

  _hidePopover() {
    super._hidePopover();
    this._plus.style.display = 'block';
    this._minus.style.display = 'none';
  }

  _showPopover() {
    super._showPopover();
    this._plus.style.display = 'none';
    this._minus.style.display = 'block';
  }
}

new CatalogPopoverShower(
  '.header__catalog',
  '.header__catalog-button',
  '.header__catalog-lists-container',
  '.header__catalog-plus',
  '.header__catalog-minus'
).start();
