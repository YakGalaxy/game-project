class Game {
  constructor() {
    // Screens & Elements
    this.splashScreen = document.querySelector("#splash-screen");
    this.nameScreen = document.querySelector("#name-screen");
    this.playerNameInput = document.querySelector("#player-name-input");
    this.cheatScreen = document.querySelector("#cheat-screen");
    // this.playerNameInputIcon = document.querySelector(
    //   "#player-name-input-icon"
    // );
    this.playerNameInput = document.getElementById("player-name-input");
    this.playerNameH1 = document.getElementById("player-name-h1");
    this.startScreen = document.querySelector("#start-screen");
    this.innerStartScreen = document.querySelector("#inner-start-screen");
    this.gameScreen = document.querySelector("#game-screen");
    this.gameOverScreen = document.querySelector("#game-over-screen");
    this.gameWonScreen = document.querySelector("#game-won-screen");
    this.scoreElement = document.querySelector("#score");
    this.scoreTarget = document.querySelector("#score-target");
    this.scoreTargetBar = document.querySelector("#score-target-bar");
    this.livesElement = document.querySelector("#lives");
    this.loadingBar = document.querySelector(".loader");
    this.statsContainer = document.querySelector("#stats-container");
    this.scored = document.querySelector("#scored");
    this.scored2 = document.querySelector("#scored-2");
    this.table = document.querySelector("#score-table");
    // Game Parameters
    this.height = 700;
    this.width = 700;
    this.obstacles = [new Obstacle(this.gameScreen)];
    this.score = 0;
    this.scoreTargetNumber = Math.floor(Math.random() * 10 + 1);
    // Math.floor(Math.random() * 10 + 1)
    this.lives = 3;
    // this.highScore;
    this.gameWon = false;
    this.playerName;
    this.playerNameInputValue;
    this.playerNameStorage;
    // this.gameScreenLeft = `100px`;
    // Adjust above after testing
    this.gameIsOver = false;
    this.gameIntervalID = null;
    this.gameLoopFrequency = Math.round(1000 / 60);
    this.counter = 1;
    // Audio
    this.audioTrack = new Audio("/game-project/audio/Next Future.mp3");
    this.uiAudio = new Audio("/game-project/audio/granted.wav");
    this.droneLoop = new Audio("/game-project/audio/droneloop.wav");
    this.gameOverAudio = new Audio("/game-project/audio/gameover.wav");
    this.gameWonAudio = new Audio("/game-project/audio/win.ogg");
    this.dialSound = new Audio("/game-project/audio/dialup.flac");
    this.scoreSound = new Audio("/game-project/audio/coin.wav");
    this.cheatSound = new Audio("/game-project/audio/error.wav");
    // Player
    this.player = new Player(
      this.gameScreen,
      10,
      350,
      57,
      49,
      "/game-project/images/drone.png"
    );
  }

  // Button DOM Logic
  advanceToNameScreen() {
    this.splashScreen.style.display = "none";
    this.nameScreen.style.display = "flex";
    this.playerNameInput.style.display = "flex";
  }

  advanceToStartScreen() {
    this.nameScreen.style.display = "none";
    // this.playerNameInput.style.display = "none";
    this.startScreen.style.display = "flex";
    this.innerStartScreen.style.display = "flex";
    this.scoreTarget.style.display = "block";
    this.scoreTarget.textContent = `${this.scoreTargetNumber}`;
  }

  advanceToGameScreen() {
    this.dialAudio();
    // Comented out to speed up testing
    this.innerStartScreen.style.display = "none";
    this.loadingBar.style.display = "inline-block";
    setTimeout(() => {
      this.statsContainer.style.display = "flex";
      this.gameScreen.style.display = "flex";
      this.gameScreen.style.alignItems = "initial";
      this.gameScreen.style.alignContent = "initial";
      this.gameScreen.style.justifyContent = "initial";
      this.scoreTarget.style.display = "none";
      this.scoreTargetBar.textContent = `${this.scoreTargetNumber}`;
      this.stopAudio();
      this.start();
      this.backingTrack();
      // Uncomment after testing
      this.droneSound();
    }, 3000);
    // change to 20000 after testing
  }

  // Game Start Logic
  start() {
    this.gameScreen.style.width = `${this.width}px`;
    this.gameScreen.style.height = `${this.height}px`;
    this.startScreen.style.display = "none";
    this.gameScreen.style.display = "flex";
    this.gameIntervalID = setInterval(() => {
      this.gameLoop();
      this.counter++;
      if (this.counter % 50 === 0) {
        this.obstacles.push(new Obstacle(this.gameScreen));
      }
    }, this.gameLoopFrequency);
  }

  // Game Loop Logic

  gameLoop() {
    this.update();

    for (let i = 0; i < this.obstacles.length; i++) {
      const oneObstacle = this.obstacles[i];
      // let gameScreenLeft = this.gameScreen.getBoundingClientRect().left;
      // let gameScreenWidth = this.gameScreen.getBoundingClientRect().width

      oneObstacle.move();
      // console.log(gameScreenLeft);
      // console.log(gameScreenWidth);
      // console.log(gameScreenLeft - gameScreenWidth);

      if (oneObstacle.right < 0) {
        this.obstacles.splice(i, 1);
        i--;
        this.score++;
        this.scoreNoise();
        this.scoreElement.innerText = `${this.score}`;
        oneObstacle.element.remove();
      }
    }

    if (this.gameIsOver === true) {
      clearInterval(this.gameIntervalID);
    }
  }

  update() {
    this.player.move();
    // Check for collision and if an obstacle is still on the screen
    for (let i = 0; i < this.obstacles.length; i++) {
      const obstacle = this.obstacles[i];
      obstacle.move();

      if (this.player.didCollide(obstacle)) {
        obstacle.element.remove();
        this.obstacles.splice(i, 1);
        this.lives--;
        this.livesElement.innerText = `${this.lives}`;
        i--;
      } else if (obstacle.right < this.gameScreenLeft) {
        this.score++;
        this.scoreNoise();
        obstacle.element.remove();
        this.obstacles.splice(i, 1);
        i--;
      }
    }

    // Random Obstacle Logic
    if (Math.random() > 0.2 && this.obstacles.length < 1) {
      this.obstacles.push(new Obstacle(this.gameScreen));
    }

    // Game End Logic
    if (this.lives === 0) {
      this.endGame();
    }

    if (this.score === this.scoreTargetNumber) {
      this.WonGame();
      clearInterval(this.gameIntervalID);
    }
  }

  // End Game Logic

  cheat() {
    this.gameIsOver = true;
    this.cheatNoise();
    this.player.element.remove();
    this.obstacles.forEach((obstacle) => obstacle.element.remove());
    this.gameScreen.style.display = "none";
    this.cheatScreen.style.display = "flex";
  }

  endGame() {
    this.stopAudio();
    this.gamerOverNoise();
    this.player.element.remove();
    this.obstacles.forEach((obstacle) => obstacle.element.remove());

    this.gameIsOver = true;

    // Hide game screen
    this.gameScreen.style.display = "none";
    // Show end game screen
    this.gameOverScreen.style.display = "block";
    this.scored.innerText = `${this.score}`;
  }

  WonGame() {
    this.stopAudio();
    this.gameWonNoise();
    this.player.element.remove();
    this.obstacles.forEach((obstacle) => obstacle.element.remove());
    this.gameIsOver = true;
    this.gameWon = true;
    // this.score = this.highScore;
    // this.highScoreStorage();

    // Hide game screen
    this.gameScreen.style.display = "none";
    // Show end game screen
    // this.table.style.display = "flex";
    this.scored2.innerText = `${this.score}`;
    this.gameWonScreen.style.display = "flex";
  }

  //  Store player name
  playerNameStorage() {
    this.playerNameInputValue =
      document.getElementById("player-name-input").value;
    this.playerName = this.playerNameInputValue.toString();
    localStorage.setItem(this.playerNameInputValue, this.score);
    this.playerNameH1.textContent = `Welcome ${this.playerName}`;
  }

  // High Score storage
  // highScoreStorage() {

  //   if (localStorage.getItem(this.playerName)) {

  //     localStorage.setItem(this.playerName, this.score);
  //     let tableRow = document.createElement("tr");
  //     let tableCell1 = document.createElement("td");
  //     let tableCell2 = document.createElement("td");
  //     tableCell1 = this.playerName;
  //     tableCell2 = this.score;
  //     this.table.appendChild(tableRow);
  //     this.table.appendChild(tableCell1);
  //     this.table.appendChild(tableCell2);
  //   }
  // };

  // Audio Logic

  // Play backing track

  backingTrack() {
    this.audioTrack.volume = 0.15;
    //   Reset to 0.15 outside of testing
    this.audioTrack.loop = true;
    this.audioTrack.play();
  }

  // Play loading audio

  dialAudio() {
    this.dialSound.load();
    this.dialSound.volume = 0.15;
    //   Reset to 0.15 outside of testing
    this.dialSound.play();
  }

  // Play drone (player) sound

  droneSound() {
    this.droneLoop.volume = 0.15;
    //   Reset to 0.15 outside of testing
    this.droneLoop.loop = true;
    this.droneLoop.play();
  }

  // Play Ui noises

  uiNoise() {
    this.uiAudio.load();
    this.uiAudio.volume = 0.25;
    this.uiAudio.play();
  }

  cheatNoise() {
    this.cheatSound.load();
    this.cheatSound.volume = 0.25;
    this.cheatSound.play();
  }

  gamerOverNoise() {
    this.gameOverAudio.load();
    this.gameOverAudio.volume = 0.25;
    this.gameOverAudio.play();
  }

  gameWonNoise() {
    this.gameWonAudio.load();
    this.gameWonAudio.volume = 0.25;
    this.gameWonAudio.play();
  }

  scoreNoise() {
    this.scoreSound.load();
    this.scoreSound.volume = 0.25;
    this.scoreSound.play();
  }

  // Stop audio noises

  stopAudio() {
    this.audioTrack.pause();
    this.audioTrack.currentTime = 0;
    this.droneLoop.pause();
    this.droneLoop.currentTime = 0;
    this.dialSound.pause();
    this.dialSound.currentTime = 0;
  }
}
