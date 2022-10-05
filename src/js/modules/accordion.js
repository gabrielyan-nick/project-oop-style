export default class Accordion {
  constructor(triggers) {
    this.btns = document.querySelectorAll(triggers);
  }

  init() {
    this.btns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const text = btn.closest(".module__info-show").nextElementSibling;
        text.classList.remove("animated", "decInHeight", "growInHeight");
        if (text.style.display == "block") {
          text.classList.add("animated", "decInHeight");
          setTimeout(() => (text.style.display = "none"), 700);
          btn.style.background = "#9ec73d";
          btn.querySelector("svg").children[0].attributes.fill.value = "white";
        } else {
          text.classList.add("animated", "growInHeight");
          text.style.display = "block";
          btn.style.background = "#ef5454";
          btn.querySelector("svg").children[0].attributes.fill.value = "none";
        }

       
      });
    });
  }
}
