class Game {
  constructor() {
    this.splashScreen = document.querySelector("#splash-screen");
    this.nameScreen = document.querySelector("#name-screen");
    this.playerName = document.querySelector("#player-name-input");
    this.playerNameInputIcon = document.querySelector(
      "#player-name-input-icon"
    );
    this.startScreen = document.querySelector("#start-screen");
    this.gameScreen = document.querySelector("#game-screen");
    this.gameOverScreen = document.querySelector("#game-over-screen");
    this.scoreElement = document.querySelector("#score");
    this.player = new Player(
      this.gameScreen,
      200,
      500,
      100,
      150,
      "./images/drone.png"
    );
  }

  advanceToNameScreen() {
    this.splashScreen.style.display = "none";
    this.nameScreen.style.display = "block";
    this.playerName.style.display = "block";
    this.playerNameInputIcon.style.display = "block";
  }

  // Unclear what purpose this is serving (below)

  //   inputConfirm() {
  //     this.gamePlayerNameInput.style.display = "block";
  //   }

  advanceToStartScreen() {
    this.nameScreen.style.display = "none";
    this.playerName.style.display = "none";
    this.startScreen.style.display = "block";
  }

  advanceToGameScreen() {
    this.startScreen.style.display = "none";
    this.gameScreen.style.display = "block";
  }
}

// const audio = new Audio("/audio/Next Future.mp3");
// const buttons = document.querySelectorAll("#activate-button");

// buttons.forEach((button) => {
//   button.addEventListener("click", () => {
//     audio.play();
//   });
// });
