class Game {
  constructor() {
    // Screens & Elements
    this.splashScreen = document.querySelector("#splash-screen");
    this.nameScreen = document.querySelector("#name-screen");
    this.playerName = document.querySelector("#player-name-input");
    this.playerNameInputIcon = document.querySelector(
      "#player-name-input-icon"
    );
    this.startScreen = document.querySelector("#start-screen");
    this.innerStartScreen = document.querySelector("#inner-start-screen");
    this.gameScreen = document.querySelector("#game-screen");
    this.gameOverScreen = document.querySelector("#game-over-screen");
    this.scoreElement = document.querySelector("#score");
    this.scoreTarget = document.querySelector("#score-target");
    this.livesElement = document.querySelector("#lives");
    this.loadingBar = document.querySelector(".loader");
    // Game Parameters
    this.height = 700;
    this.width = 700;
    this.obstacles = [new Obstacle(this.gameScreen)];
    this.score = 0;
    this.scoreTargetNumber = Math.floor(Math.random() * 10 + 1);
    this.lives = 3;
    // this.gameScreenLeft = `100px`;
    // Adjust above after testing
    this.gameIsOver = false;
    this.gameIntervalID = null;
    this.gameLoopFrequency = Math.round(1000/ 60);
    this.counter = 1;
    // Audio
    this.audioTrack = new Audio("/audio/Next Future.mp3");
    this.uiAudio = new Audio("/audio/granted.wav");
    this.droneLoop = new Audio("/audio/droneloop.wav");
    this.gameOverAudio = new Audio("/audio/gameover.wav");
    this.dialSound = new Audio("/audio/dialup.flac");
    // Player
    this.player = new Player(
      this.gameScreen,
      10,
      350,
      114,
      98,
      "./images/drone.png"
    );
  }

  // Button DOM Logic
  advanceToNameScreen() {
    this.splashScreen.style.display = "none";
    this.nameScreen.style.display = "flex";
    this.playerName.style.display = "flex";
  }

  advanceToStartScreen() {
    this.nameScreen.style.display = "none";
    this.playerName.style.display = "none";
    this.startScreen.style.display = "flex";
    this.innerStartScreen.style.display = "flex";
    this.scoreTarget.style.display = "block";
    this.scoreTarget.textContent = `${this.scoreTargetNumber}`;
  }

  advanceToGameScreen() {
    // this.dialAudio();
    // Comented out to speed up testing
    this.innerStartScreen.style.display = "none";
    this.loadingBar.style.display = "inline-block";
    setTimeout(() => {
      this.gameScreen.style.display = "flex";
      this.gameScreen.style.alignItems = "initial";
      this.gameScreen.style.alignContent = "initial";
      this.gameScreen.style.justifyContent = "initial";
      this.scoreTarget.style.display = "none";
      this.stopAudio();
      this.start();
      // this.backingTrack();
      // Uncomment after testing
      // this.droneSound();
    }, 0);
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
      if (this.counter % 200 === 0) {
        this.obstacles.push(new Obstacle(this.gameScreen));
      }
    }, this.gameLoopFrequency);
  }

  // Game Loop Logic

  gameLoop() {
    this.update();

    for (let i = 0; i < this.obstacles.length; i++) {
      const oneObstacle = this.obstacles[i];
      let gameScreenLeft = this.gameScreen.getBoundingClientRect().left;
      oneObstacle.move();
      // console.log(oneObstacle.right);
      // console.log(gameScreenLeft);


      if (oneObstacle.right < gameScreenLeft) {
        this.obstacles.splice(i, 1);
        i--;
        this.score++;
        this.scoreElement.innerText = `${this.score}`;
        oneObstacle.element.remove();
        // console.log(this.score);
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
        obstacle.element.remove();
        this.obstacles.splice(i, 1);
        i--;
      }
    }

    // Random Obstacle Logic
    if (Math.random() > 0.98 && this.obstacles.length < 1) {
      this.obstacles.push(new Obstacle(this.gameScreen));
    }

    // Game End Logic
    if (this.lives === 0) {
      this.endGame();
    }
  }

  // End Game Logic
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
  }

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

  gamerOverNoise() {
    this.gameOverAudio.load();
    this.gameOverAudio.volume = 0.25;
    this.gameOverAudio.play();
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
