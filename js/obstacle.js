class Obstacle {
  constructor(gameScreen) {
    this.gameScreen = gameScreen;
    this.possiblePositions = [100, 300];
    this.top =
      this.possiblePositions[
        Math.floor(Math.random() * this.possiblePositions.length)
      ];
    this.right = this.left + this.width;
    this.left = 700;
    // Adjust so that sound matches speed of obstacle movement from right to left
    this.width = 200;
    this.height = 200;
    this.element = document.createElement("img");
    this.element.src = "./images/truck-a.png";
    this.element.style.position = "absolute";
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.top = `${this.top}px`;
    this.element.style.left = `${this.left}px`;
    this.element.style.right = `${this.right}px`;
    this.gameScreen.appendChild(this.element);
    this.sound = new Audio("/audio/righttoleft.wav");
  }

  move() {
    // this.sound.volume = 0.15;
    //   Reset to 0.15 outside of testing
    // this.sound.play();
    let gameScreenLeft = this.gameScreen.getBoundingClientRect().left;
    this.left -= 3;
    // this.left += this.directionX;
    this.right = this.left + this.width; 
    // this.right = this.left + this.element.style.width;
    this.updatePosition();
  }

  updatePosition() {
    // this.element.style.top = `${this.top}px`;
    this.element.style.left = `${this.left}px`;
    this.element.style.right = `${this.right}px`;
    // this.element.style.right = `${this.right}px`;
  }
}
