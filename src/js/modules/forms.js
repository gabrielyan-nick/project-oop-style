export default class Form {
  constructor(form) {
    this.forms = document.querySelectorAll(form);
    this.inputs = document.querySelectorAll("input");
  }

  phoneMask() {
    const phoneInputs = document.querySelectorAll('[name="phone"]');

    function createMask(event) {
      let matrix = "+1 (___) ___-____",
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = this.value.replace(/\D/g, "");

      if (def.length >= val.length) {
        val = def;
      }

      this.value = matrix.replace(/./g, function (a) {
        return /[_\d]/.test(a) && i < val.length
          ? val.charAt(i++)
          : i >= val.length
          ? ""
          : a;
      });

      if (event.type === "blur") {
        if (this.value.length == 2) {
          this.value = "";
        }
      } else {
        this.setSelectionRange(this.value.length, this.value.length);
      }
    }

    phoneInputs.forEach((input) => {
      input.addEventListener("input", createMask);
      input.addEventListener("click", createMask);
      input.addEventListener("focus", createMask);
      input.addEventListener("blur", createMask);
      input.addEventListener("keydown", (e) => {
        if (e.code === "ArrowLeft") {
          if (input.selectionStart === 1 || input.selectionStart === 2) {
            input.setSelectionRange(2, 2);
          }
        }
      });
    });
  }

  noCyrillicInput(inputtype) {
    const inputs = document.querySelectorAll(`[name=${inputtype}]`);

    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        input.value = input.value.replace(/[а-яё]/gi, "");
      });
    });
  }

  modalMessage(mes) {
    const overlay = document.querySelector(".overlay");
    overlay.style.display = "block";
    overlay.querySelector(".video").style.display = "none";

    let window = document.createElement("div");
    window.classList.add("form-modal", "animated", "fadeIn");
    overlay.appendChild(window);

    const message = {
      loading: "assets/icons/load.gif",
      ok: "assets/icons/ok.png",
      fail: "assets/icons/fail.png",
    };

    let windowImg = document.createElement("img");
    windowImg.setAttribute("src", message[mes]);
    window.appendChild(windowImg);
  }

  clearForm() {
    this.inputs.forEach((input) => {
      input.value = "";
    });
  }

  async postData(url, data) {
    let res = await fetch(url, {
      method: "POST",
      body: data,
    });
    return await res.text();
  }

  init() {
    this.phoneMask();
    this.noCyrillicInput("email");
    this.forms.forEach((form) => {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        this.modalMessage("loading");
        const formData = new FormData(form);
        this.postData("assets/question.php", formData)
          .then((res) => {
            this.clearForm();
            document.querySelector(".form-modal").remove();
            this.modalMessage("ok");
          })
          .catch((res) => {
            this.clearForm();
            document.querySelector(".form-modal").remove();
            this.modalMessage("fail");
          })
          .finally(() => {
            this.clearForm();
            setTimeout(() => {
              document.querySelector(".form-modal").remove();
              document.querySelector(".overlay .video").style.display = "block";
              document.querySelector(".overlay").style.display = "none";
            }, 2500);
          });
      });
    });
  }
}
