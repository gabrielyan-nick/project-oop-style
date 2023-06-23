export default class VideoPlayer {
  constructor(triggers, overlay) {
    this.btns = document.querySelectorAll(triggers);
    this.overlay = document.querySelector(overlay);
    try {
      this.close = this.overlay.querySelector(".close");
    } catch (e) {}

    this.onPlayerStateChange = this.onPlayerStateChange.bind(this);
  }

  bindTriggers() {
    this.btns.forEach((btn, i) => {
      try {
        const blockedElem = btn.closest(
          ".module__video-item"
        ).nextElementSibling;
        // Блокируем каждую вторую кнопку.
        if (i % 2 == 0) {
          blockedElem.setAttribute("data-disabled", "true");
        }
      } catch (e) {}

      btn.addEventListener("click", () => {
        if (
          !btn.closest(".module__video-item") ||
          btn.closest(".module__video-item").getAttribute("data-disabled") !==
            "true"
        ) {
          this.activeBtn = btn;
          if (this.player) {
            this.overlay.style.display = "flex";
            if (this.path !== btn.getAttribute("data-url")) {
              this.path = btn.getAttribute("data-url");
              this.player.cueVideoById({ videoId: this.path });
            }
          } else {
            this.path = btn.getAttribute("data-url");
            this.createPlayer(this.path);
          }
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
      events: {
        onStateChange: this.onPlayerStateChange,
      },
    });

    this.overlay.style.display = "flex";
  }

  onPlayerStateChange(state) {
    try {
      const blockedElem = this.activeBtn.closest(
        ".module__video-item"
      ).nextElementSibling;
      const playBtn = this.activeBtn.querySelector("svg").cloneNode(true);

      if (state.data === 0) {
        if (
          blockedElem
            .querySelector(".play__circle")
            .classList.contains("closed")
        ) {
          blockedElem.querySelector(".play__circle").classList.remove("closed");
          blockedElem.querySelector("svg").remove();
          blockedElem.querySelector(".play__circle").appendChild(playBtn);
          blockedElem.querySelector(".play__text").textContent = "play video";
          blockedElem
            .querySelector(".play__text")
            .classList.remove("attention");
          blockedElem.style.cssText = `
        filter: none; 
        opacity: 1; 
  `;
          blockedElem.setAttribute("data-disabled", "false");
        }
      }
    } catch (e) {}
  }

  init() {
    if (this.btns.length > 0) {
      const tag = document.createElement("script"); // Подключаем YT API.
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      this.bindTriggers();
      this.bindCloseBtn();
    }
  }
}
