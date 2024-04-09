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
    this.scoreTarget = document.querySelector("#score-target");
    this.player = new Player(
      this.gameScreen,
      200,
      500,
      100,
      150,
      "./images/drone.png"
    );
    this.height = 700;
    this.width = 700;
    this.obstacles = [new Obstacle(this.gameScreen)];
    this.score = 0;
    this.scoreTargetNumber = Math.floor(Math.random() * 10 + 1);
    this.lives = 3;
    this.gameIsOver = false;
    this.gameIntervalID = null;
    this.gameLoopFrequency = Math.round(1000 / 60);
    this.counter = 1;
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
    this.scoreTarget.style.display = "block";
    this.scoreTarget.textContent = `${this.scoreTargetNumber}`;
  }

  advanceToGameScreen() {
    this.startScreen.style.display = "none";
    this.gameScreen.style.display = "block";
    this.scoreTarget.style.display = "none";
  }

  start() {
    this.gameScreen.style.width = `${this.width}px`;
    this.gameScreen.style.height = `${this.height}px`;
    this.startScreen.style.display = "none";
    this.gameScreen.style.display = "block";
    // this.gameIntervalID = setInterval(() => {
    //   this.gameLoop();
    //   this.counter++;
    //   if (this.counter % 200 === 0) {
    //     this.obstacles.push(new Obstacle(this.gameScreen));
    //   }
    // }, this.gameLoopFrequency);
  }
}
