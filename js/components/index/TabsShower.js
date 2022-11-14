class TabsShower {
  constructor(tabSelector, cardSelector, activeTabClass, activeCardClass, indexCurrentTab = 1) {
    this._tabs = document.querySelectorAll(tabSelector);
    this._cards = document.querySelectorAll(cardSelector);
    this._activeTabClass = activeTabClass;
    this._activeCardClass = activeCardClass;
    this._index = indexCurrentTab;
  }

  _clearTab(tab) {
    tab.classList.remove(this._activeTabClass);
  }

  _clearTabs() {
    this._tabs.forEach(tab => this._clearTab(tab));
  }

  _clearCard(card) {
    card.classList.remove(this._activeCardClass);
  }

  _clearCards() {
    this._cards.forEach(card => this._clearCard(card));
  }

  _setTabAndCard(index = this._index) {
    this._clearTabs();
    this._clearCards();
    this._tabs[index - 1].classList.add(this._activeTabClass);
    this._cards[index - 1].classList.add(this._activeCardClass);
  }

  _addEventListenerForTabs() {
    this._tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => {
        this._setTabAndCard(index + 1)
      });
    });
  }

  start() {
    this._setTabAndCard();
    this._addEventListenerForTabs();
  }
}
