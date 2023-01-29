(function () {
  const baseUrl = "https://api.adviceslip.com/advice";

  let button = document.querySelector(".advice-button");
  let adviceId = document.querySelector("#advice-id");
  let adviceNumber = document.querySelector(".advice-number");
  let adviceText = document.querySelector(".advice-text");
  let loader = document.querySelector(".loader");

  window.addEventListener("load", setPatternDivider);
  window.addEventListener("resize", setPatternDivider);
  button.addEventListener("click", handleOnClick);

  function handleOnClick() {
    showLoader(true);
    setTimeout(async () => {
      let data = await getAdvice();
      adviceId.innerText = data.id;
      adviceText.innerText = data.advice;
      showLoader(false);
    }, 1000);
  }

  async function getAdvice() {
    let response = await fetch(baseUrl).then((response) => response.json());
    return response.slip;
  }

  function showLoader(visible) {
    button.disabled = visible;
    loader.style.visibility = (visible) ? "visible" : "hidden";
    adviceNumber.style.visibility = adviceText.style.visibility = (visible) ? "hidden" : "visible";
  }

  function setPatternDivider() {
    let separator = document.querySelector(".advice-separator");
    let deviceType = this.window.innerWidth > 375 ? "desktop" : "mobile";
    separator.src = `./images/pattern-divider-${deviceType}.svg`;
  }
})();