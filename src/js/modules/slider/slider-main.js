import Slider from "./slider";

export default class MainSlider extends Slider {
  constructor(btns, prev, next) {
    super(btns, prev, next);
  }

  showSlides(n) {
    if (n > this.slides.length) {
      this.slideIndex = 1;
    }

    if (n < 1) {
      this.slideIndex = this.slides.length;
    }

    try {
      if (n === 3) {
        setTimeout(() => {
          this.hanson.classList.add("animated", "slideInUp");
          this.hanson.style.opacity = "1";
        }, 3000);
      } else {
        this.hanson.classList.remove("animated", "slideInUp");
        this.hanson.style.opacity = "0";
      }
    } catch (e) {}

    this.slides.forEach((slide) => {
      slide.style.display = "none";
      slide.classList.remove("animated", "slideInUp", "slideInDown");
    });

    this.slides[this.slideIndex - 1].style.display = "block";
  }

  changeSlides(n) {
    this.showSlides((this.slideIndex += n));
  }

  bindTriggers() {
    this.btns.forEach((item) => {
      item.addEventListener("click", () => {
        this.changeSlides(1);
        this.slides[this.slideIndex - 1].classList.add("animated", "slideInUp");
      });

      item.parentNode.previousElementSibling.addEventListener("click", (e) => {
        e.preventDefault();
        this.slideIndex = 1;
        this.showSlides(this.slideIndex);
        this.slides[this.slideIndex - 1].classList.add(
          "animated",
          "slideInDown"
        );
      });
    });

    this.prev.forEach((item) => {
      item.addEventListener("click", (e) => {
        e.stopPropagation();
        e.preventDefault();
        this.changeSlides(-1);
        this.slides[this.slideIndex - 1].classList.add(
          "animated",
          "slideInDown"
        );
      });
    });

    this.next.forEach((item) => {
      item.addEventListener("click", (e) => {
        e.stopPropagation();
        e.preventDefault();
        this.changeSlides(1);
        this.slides[this.slideIndex - 1].classList.add("animated", "slideInUp");
      });
    });
  }

  render() {
    if (this.container) {
      try {
        this.hanson = document.querySelector(".hanson");
      } catch (e) {}

      this.showSlides(this.slideIndex);
      this.bindTriggers();
    }
  }
}
