import Slider from "./slider";

export default class MiniSlider extends Slider {
  constructor(container, btns, prev, next, activeClass, animate, autoplay) {
    super(container, btns, prev, next, activeClass, animate, autoplay);
  }

  nextSlide() {
    //   if (
    //     this.slides[1].tagName == "BUTTON" &&
    //     this.slides[2].tagName == "BUTTON"
    //   ) {
    //     this.container.append(this.slides[0], this.slides[1], this.slides[2]);
    //     this.decorizeSlides();
    //   } else if (this.slides[1].tagName == "BUTTON") {
    //     this.container.append(this.slides[0], this.slides[1]);
    //     this.decorizeSlides();
    //   } else {
    this.container.appendChild(this.slides[0]);
    this.decorizeSlides();
    //   }
  }

  prevSlide() {
    //   for (let i = this.slides.length - 1; i > 0; i--) {
    //     if (this.slides[i].tagName !== "BUTTON") {
    this.container.insertBefore(
      this.slides[this.slides.length - 1],
      this.slides[0]
    );
    this.decorizeSlides();
    //   break;
    // }
    //   }
  }

  decorizeSlides() {
    this.slides.forEach((slide) => {
      slide.classList.remove(this.activeClass);
      if (this.animate) {
        slide.querySelector(".card__title").style.opacity = "0.4";
        slide.querySelector(".card__controls-arrow").style.opacity = "0";
      }
    });

    this.slides[0].classList.add(this.activeClass);

    if (this.animate) {
      this.slides[0].querySelector(".card__title").style.opacity = "1";
      this.slides[0].querySelector(".card__controls-arrow").style.opacity = "1";
    }
  }

  bindTriggers() {
    this.next.addEventListener("click", () => this.nextSlide());

    this.prev.addEventListener("click", () => this.prevSlide());
  }

  autoPlaySlide() {
    if (this.autoplay) {
      const autoPlayTimer = setInterval(() => this.nextSlide(), 2000);

      this.container.addEventListener("mouseenter", () =>
        clearInterval(autoPlayTimer)
      );

      this.btns.forEach((btn) => {
        btn.addEventListener("mouseenter", () => clearInterval(autoPlayTimer));
      });
    }
  }

  init() {
    this.container.style.cssText = `
        display: flex;
        flex-wrap: wrap;
        overflow: hidden;
        align-items: flex-start;
        `;

    this.bindTriggers();
    this.decorizeSlides();
    this.autoPlaySlide();

    this.container.addEventListener("mouseleave", () => {
      this.autoPlaySlide();
    });

    this.btns.forEach((btn) => {
      btn.addEventListener("mouseleave", () => this.autoPlaySlide());
    });
  }
}
