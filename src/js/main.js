import MainSlider from "./modules/slider/slider-main";
import MiniSlider from "./modules/slider/slider-mini";
import VideoPlayer from "./modules/playVideo";
import Difference from './modules/difference';

window.addEventListener("DOMContentLoaded", () => {
  const mainSlider = new MainSlider({ btns: ".next", container: ".page" });
  mainSlider.render();

  const showupSlider = new MiniSlider({
    container: ".showup__content-slider",
    prev: ".showup__prev",
    next: ".showup__next",
    activeClass: "card-active",
    animate: true,
  });
  showupSlider.init();

  const modulesSlider = new MiniSlider({
    container: ".modules__content-slider",
    btns: ".modules__info-btns",
    prev: ".modules__info-btns .slick-prev",
    next: ".modules__info-btns .slick-next",
    activeClass: "card-active",
    animate: true,
    autoplay: true,
  });
  modulesSlider.init();

  const feedSlider = new MiniSlider({
    container: ".feed__slider",
    prev: ".feed__slider ~ .slick-prev",
    next: ".feed__slider ~ .slick-next",
    activeClass: "feed__item-active",
  });
  feedSlider.init();

  const videoPlayer = new VideoPlayer(".showup .play", ".overlay");
  videoPlayer.init();

  const difference = new Difference('.officerold', '.officernew', '.officer__card-item');
  difference.init();
});
