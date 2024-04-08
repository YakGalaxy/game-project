
const audio = new Audio("/audio/Next Future.mp3");
const buttons = document.querySelectorAll("#activate-button");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    audio.play();
  });
});
