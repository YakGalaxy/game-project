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
    this.gameScreen = document.querySelector("#game-screen");
    this.gameOverScreen = document.querySelector("#game-over-screen");
    this.scoreElement = document.querySelector("#score");
    this.scoreTarget = document.querySelector("#score-target");
    this.livesElement = document.querySelector("#lives");
    // Game Parameters
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
    // Player
    this.player = new Player(
      this.gameScreen,
      200,
      500,
      114,
      98,
      "./images/drone.png"
    );
  }

  // Button DOM Logic
  advanceToNameScreen() {
    this.splashScreen.style.display = "none";
    this.nameScreen.style.display = "block";
    this.playerName.style.display = "block";
    this.playerNameInputIcon.style.display = "block";
  }

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

  // Game Start Logic
  start() {
    this.gameScreen.style.width = `${this.width}px`;
    this.gameScreen.style.height = `${this.height}px`;
    this.startScreen.style.display = "none";
    this.gameScreen.style.display = "block";
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
      oneObstacle.move();

      // if (oneObstacle.right > 100) {
      //   this.obstacles.splice(i, 1);
      //   i--;
      //   this.score++;
      //   this.scoreElement.innerText = `${this.score}`;
      //   oneObstacle.element.remove();
      //   console.log(this.score);

      // }
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
      } else if (obstacle.right < this.width) {
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
    this.player.element.remove();
    this.obstacles.forEach((obstacle) => obstacle.element.remove());

    this.gameIsOver = true;

    // Hide game screen
    this.gameScreen.style.display = "none";
    // Show end game screen
    this.gameOverScreen.style.display = "block";
  }
}
