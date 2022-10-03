export default class Difference {
  constructor(oldColumn, newColumn, items) {
    try {
      this.oldColumn = document.querySelector(oldColumn);
      this.newColumn = document.querySelector(newColumn);
      this.oldColumnItems = this.oldColumn.querySelectorAll(items);
      this.newColumnItems = this.newColumn.querySelectorAll(items);
      this.oldCounter = 0;
      this.newCounter = 0;
    } catch (e) {}
  }

  bindTriggers(trigger, items, counter) {
    trigger.addEventListener("click", () => {
      items.forEach((item) => {
        item.classList.add("animated", "fadeIn");
      });

      if (counter !== items.length - 2) {
        items[counter].style.display = "flex";
        counter++;
      } else {
        items[counter].style.display = "flex";
        items[items.length - 1].remove();
      }
    });
  }

  hideItems(items) {
    items.forEach((item, i, arr) => {
      if (i !== arr.length - 1) {
        item.style.display = "none";
      }
    });
  }

  init() {
    try {
      this.hideItems(this.oldColumnItems);
      this.hideItems(this.newColumnItems);
      this.bindTriggers(
        this.oldColumn.querySelector(".plus"),
        this.oldColumnItems,
        this.oldCounter
      );
      this.bindTriggers(
        this.newColumn.querySelector(".plus"),
        this.newColumnItems,
        this.newCounter
      );
    } catch (e) {}
  }
}
