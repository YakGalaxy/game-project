class Obstacle {
  constructor(gameScreen) {
    this.gameScreen = gameScreen;

    // Position and Sizing
    this.possiblePositions = [
      75, 100, 125, 150, 175, 250, 275, 300, 325, 350, 400, 425, 450, 475, 500,
      525, 550,
    ];
    this.top =
      this.possiblePositions[
        Math.floor(Math.random() * this.possiblePositions.length)
      ];
    this.right = this.left + this.width;
    this.left = 700;
    // Adjust so that sound matches speed of obstacle movement from right to left

    // Visuals
    this.element = document.createElement("img");
    this.imagePaths = [
      "./images/truck-a.png",
      "./images/truck-b.png",
      "./images/truck1.png",
      "./images/truck2.png",
      "./images/truck3.png",
      "./images/truck4.png",
      "./images/truck5.png",
      "./images/truck6.png",
      "./images/truck7.png",
      "./images/truck8.png",
      "./images/truck9.png",
      "./images/drone1.png",
      "./images/drone2.png",
      "./images/drone3.png",
    ];
    this.currentIndex = 0;
    this.differentTruck();
    this.element.src = this.imagePaths[this.currentIndex];
    this.element.style.position = "absolute";
    this.width = this.element.naturalWidth;
    // 229;
    this.height = this.element.naturalHeight;
    // 108.5;
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.top = `${this.top}px`;
    this.element.style.left = `${this.left}px`;
    this.element.style.right = `${this.right}px`;
    this.element.style.overflow = "hidden";
    this.gameScreen.appendChild(this.element);

    // Audio Files
    this.sound = new Audio("/audio/righttoleft.wav");
  }

  // Multi-truck logic
  differentTruck() {
    this.currentIndex = Math.floor(Math.random() * this.imagePaths.length);
    this.element.src = this.imagePaths[this.currentIndex];
    // this.currentIndex = (this.currentIndex + 1) % this.imagePaths.length;
  }

  // Movement Logic
  move() {
    this.left -= 3;
    this.right = this.left + this.width;
    this.updatePosition();
    // Comment out above to help testing
  }

  updatePosition() {
    this.element.style.left = `${this.left}px`;
    this.element.style.right = `${this.right}px`;
  }
}
