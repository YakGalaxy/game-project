class Game {
    constructor() {
        this.splashScreen = document.querySelector("#game-splash");
        this.gamePlayerNameScreen = document.querySelector("#game-player-name");
        this.gamePlayerName = document.querySelector("#player-name"); 
        this.gamePlayerNameInput = document.querySelector("#input-icon"); 
        this.gameStartScreen = document.querySelector("#game-start");
        this.gameScreen = document.querySelector("#game-screen");
        this.gameOverScreen = document.querySelector("#game-over");
        this.scoreElement = document.querySelector("#score"); 
        this.player = new Player(this.gameScreen,
      200,
      500,
      100,
      150,
      "./images/drone.png"
    );
    }



nextScreen() {
    this.splashScreen.style.display = "none";
    this.gamePlayerNameScreen.style.display = "block";
}

    inputConfirm() {
        this.gamePlayerNameInput.style.display = "block";
}    
    

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

  gameLoop() {
    this.update();

    for (let i = 0; i < this.obstacles.length; i++) {
      const oneObstacle = this.obstacles[i];
      oneObstacle.move();

      if (oneObstacle.top > 600) {
        this.obstacles.splice(i, 1);
        i--;
        this.score++;
        oneObstacle.element.remove();
        console.log(this.score);

        //update DOM to new score
        this.scoreElement.innerText = this.score;
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

      // If the player's car collides with an obstacle
      if (this.player.didCollide(obstacle)) {
        // Remove the obstacle element from the DOM
        obstacle.element.remove();
        // Remove obstacle object from the array
        this.obstacles.splice(i, 1);
        // Reduce player's lives by 1
        this.lives--;
        // Update the counter variable to account for the removed obstacle
        i--;
      } // If the obstacle is off the screen (at the bottom)
      else if (obstacle.top > this.height) {
        // Increase the score by 1
        this.score++;
        // Remove the obstacle from the DOM
        obstacle.element.remove();
        // Remove obstacle object from the array
        this.obstacles.splice(i, 1);
        // Update the counter variable to account for the removed obstacle
        i--;
      }
    }

    // If the lives are 0, end the game
    if (this.lives === 0) {
      this.endGame();
    }

    // Create a new obstacle based on a random probability
    // when there is no other obstacles on the screen
    if (Math.random() > 0.98 && this.obstacles.length < 1) {
      this.obstacles.push(new Obstacle(this.gameScreen));
    }
  }

  // Create a new method responsible for ending the game
  endGame() {
    this.player.element.remove();
    this.obstacles.forEach((obstacle) => obstacle.element.remove());

    this.gameIsOver = true;

    // Hide game screen
    this.gameScreen.style.display = "none";
    // Show end game screen
    this.gameOverScreen.style.display = "flex";
  }
}



const audio = new Audio("/audio/Next Future.mp3");
const buttons = document.querySelectorAll("#activate-button");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    audio.play();
  });
});

