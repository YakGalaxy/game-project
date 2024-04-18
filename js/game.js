class Game {
  constructor() {
    // Screens & Elements
    this.splashScreen = document.querySelector("#splash-screen");

    this.nameScreen = document.querySelector("#name-screen");
    this.playerNameInput = document.querySelector("#player-name-input");
    this.cheatScreen = document.querySelector("#cheat-screen");
    this.playerNameInput = document.getElementById("player-name-input");
    this.playerNameH1 = document.getElementById("player-name-h1");

    this.startScreen = document.querySelector("#start-screen");
    this.innerStartScreen = document.querySelector("#inner-start-screen");
    this.loadingBar = document.querySelector(".loader");

    this.gameScreen = document.querySelector("#game-screen");
    this.statsContainer = document.querySelector("#stats-container");
    this.scoreElement = document.querySelector("#score");
    this.scoreTarget = document.querySelector("#score-target");
    this.scoreTargetBar = document.querySelector("#score-target-bar");
    this.livesElement = document.querySelector("#lives");

    this.gameOverScreen = document.querySelector("#game-over-screen");
    this.gameWonScreen = document.querySelector("#game-won-screen");

    this.scored = document.querySelector("#scored");
    this.scored2 = document.querySelector("#scored-2");
    this.table = document.querySelector("#score-table");

    // Game Parameters
    this.height = 700;
    this.width = 700;
    this.obstacles = [new Obstacle(this.gameScreen)];
    this.score = 0;
    this.scoreTargetNumber = Math.floor(Math.random() * 100 + 10);
    this.lives = 3;
    this.boost = false; 
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

    // Audio Files
    this.audioTrack = new Audio("/audio/Next Future.mp3");
    this.uiAudio = new Audio("/audio/granted.wav");
    this.droneLoop = new Audio("/audio/droneloop.wav");
    this.gameOverAudio = new Audio("/audio/gameover.wav");
    this.gameWonAudio = new Audio("/audio/win.ogg");
    this.dialSound = new Audio("/audio/dialup.flac");
    this.scoreSound = new Audio("/audio/coin.wav");
    this.cheatSound = new Audio("/audio/error.wav");
    this.levelUpSound = new Audio("/audio/levelup.wav");

    // Player Object
    this.player = new Player(
      this.gameScreen,
      10,
      350,
      57,
      49,
      "./images/drone.png"
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
    this.startScreen.style.display = "flex";
    this.innerStartScreen.style.display = "flex";
    this.scoreTarget.style.display = "block";
    this.scoreTarget.textContent = `${this.scoreTargetNumber}`;
  }

  advanceToGameScreen() {
    this.dialAudio();
    // Comment out the above to speed up testing
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
      // Comment out the above to speed up testing
      this.droneSound();
    }, 3000);
    // Adjust the above to speed up testing
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
      if (this.counter % 30 === 0) {
        this.obstacles.push(new Obstacle(this.gameScreen));
      }
    }, this.gameLoopFrequency);
  }

  // Game Loop Logic
  gameLoop() {
    this.update();

    for (let i = 0; i < this.obstacles.length; i++) {
      const oneObstacle = this.obstacles[i];
      oneObstacle.move();

      if (oneObstacle.right < 0) {
        this.obstacles.splice(i, 1);
        i--;
        this.score++;
        this.scoreNoise();
        this.scoreElement.innerText = `${this.score}`;
        oneObstacle.element.remove();
      }
    }

    if (this.score % 10 === 0 & this.score !== 0 & this.score < 20) {
      this.scoreMilestoneNoise(); 
    }
    
    // if (this.score >= 20) {
    //   this.boost = true; 
    // }
      
      if (this.gameIsOver === true) {
        clearInterval(this.gameIntervalID);
      }
  }

  update() {
    this.player.move();
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
    // Comment out above to help testing

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
    this.gameScreen.style.display = "none";
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

    this.gameScreen.style.display = "none";
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
  highScoreStorage() {
    let highScoresFromLS = JSON.parse(localStorage.getItem("highscores"));

    if (highScoresFromLS) {
      const newHighScore = { name: this.playerName, score: this.score };
      highScoresFromLS.push(newHighScore);
      highScoresFromLS.sort((a, b) => {
        if (a.score < b.score) {
          return 1;
        } else if (a.score > b.score) {
          return -1;
        } else {
          return 0;
        }
      });

      highScoresFromLS = highScoresFromLS.slice(0, 3);
      console.log("here are the scores from the ls", highScoresFromLS);
      localStorage.setItem("highscores", JSON.stringify(highScoresFromLS));
    } else {
      const newHighScores = [{ name: this.playerName, score: this.score }];
      localStorage.setItem("highscores", JSON.stringify(newHighScores));
    }
  }

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

  backingTrack() {
    this.audioTrack.volume = 0.15;
    this.audioTrack.loop = true;
    this.audioTrack.play();
  }

  dialAudio() {
    this.dialSound.load();
    this.dialSound.volume = 0.15;
    this.dialSound.play();
  }

  droneSound() {
    this.droneLoop.volume = 0.15;
    this.droneLoop.loop = true;
    this.droneLoop.play();
  }

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

  scoreMilestoneNoise() {
    this.levelUpSound.load();
    this.levelUpSound.volume = 0.75;
    this.levelUpSound.play();
  }

  stopAudio() {
    this.audioTrack.pause();
    this.audioTrack.currentTime = 0;
    this.droneLoop.pause();
    this.droneLoop.currentTime = 0;
    this.dialSound.pause();
    this.dialSound.currentTime = 0;
  }
}
