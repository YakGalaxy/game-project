class Obstacle {
  constructor(gameScreen) {
    this.gameScreen = gameScreen;
    this.possiblePositions = [100, 300];
    this.left =
      this.possiblePositions[
        Math.floor(Math.random() * this.possiblePositions.length)
      ];
    this.top = -300;
    this.width = 100;
    this.height = 150;
    this.element = document.createElement("img");
    this.element.src = "./images/truck-a.png";
    this.element.style.position = "absolute";
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.top = `${this.top}px`;
    this.element.style.left = `${this.left}px`;
    this.gameScreen.appendChild(this.element);
  }

  move() {
    //     setInterval(() => {
    //       this.element.style.top -= this.direction ;
    //     }, 3000);
    //   }
    this.top += 3;
    this.updatePosition();
  }

  updatePosition() {
    this.element.style.top = `${this.top}px`;
  }
}
