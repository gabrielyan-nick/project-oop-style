import MainSlider from "./modules/slider/slider-main";
import MiniSlider from "./modules/slider/slider-mini";
import VideoPlayer from "./modules/playVideo";
import Difference from "./modules/difference";
import Form from "./modules/forms";
import Accordion from "./modules/accordion";
import Download from "./modules/download";

window.addEventListener("DOMContentLoaded", () => {
  const mainSlider = new MainSlider({ btns: ".next", container: ".page" });
  mainSlider.render();

  const mainSliderModule = new MainSlider({
    next: ".nextmodule",
    prev: ".prevmodule",
    container: ".moduleapp",
    btns: ".sidecontrol .next",
  });
  mainSliderModule.render();

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

  new VideoPlayer(".showup .play", ".overlay").init();
  new VideoPlayer('.module__video-item .play', '.overlay').init();
  new VideoPlayer('.feed__item-play', '.overlay').init();
  new VideoPlayer('.schedule .play', '.overlay').init();
  new Difference(".officerold", ".officernew", ".officer__card-item").init();
  new Accordion('.plus__content').init();
  new Form(".form").init();
  new Download('.download').init();
});
