import Slider from "./slider";

export default class MainSlider extends Slider {
    constructor(btns) {
        super(btns);
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
    
      render() {
        try {
          this.hanson = document.querySelector(".hanson");
        } catch (e) {}
    
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
    
        this.showSlides(this.slideIndex);
      }
}
