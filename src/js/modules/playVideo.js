export default class VideoPlayer {
  constructor(triggers, overlay) {
    this.btns = document.querySelectorAll(triggers);
    this.overlay = document.querySelector(overlay);
    this.close = this.overlay.querySelector(".close");
  }

  bindTriggers() {
    this.btns.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (this.player) {
          this.overlay.style.display = "flex";
        } else {
          const path = btn.getAttribute("data-url");
          this.createPlayer(path);
        }
      });
    });
  }

  bindCloseBtn() {
    this.close.addEventListener("click", () => {
      this.overlay.style.display = "none";
      this.player.stopVideo();
    });

    this.overlay.addEventListener("click", (e) => {
      if (e.target === this.overlay) {
        this.overlay.style.display = "none";
        this.player.stopVideo();
      }
    });
  }

  createPlayer(url) {
    this.player = new YT.Player("frame", {
      height: "100%",
      width: "100%",
      videoId: url,
    });

    this.overlay.style.display = "flex";
  }

  init() {
    const tag = document.createElement("script"); // Подключаем YT API.
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    this.bindTriggers();
    this.bindCloseBtn();
  }
}
