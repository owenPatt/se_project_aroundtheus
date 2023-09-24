//Need to create the renderer function
export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    //renders all elements on the screen
    this._items.forEach((item) => {
      //renderer renders each individual element
      this.addItem(this._renderer(item));
    });
  }

  addItem(element) {
    //Adds it to the container
    this._container.insertAdjacentElement("afterbegin", element);
  }
}
