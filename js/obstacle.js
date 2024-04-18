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
    this.left = 700;
    this.right = this.left + this.width;
    this.speed = Math.floor(Math.random() * 10) + 1;

    // Visuals
    this.imagePaths = [
      "./game-project/images/truck-a.png",
      "./game-project/images/truck-b.png",
      "./game-project/images/truck1.png",
      "./game-project/images/truck2.png",
      "./game-project/images/truck3.png",
      "./game-project/images/truck4.png",
      "./game-project/images/truck5.png",
      "./game-project/images/truck6.png",
      "./game-project/images/truck7.png",
      "./game-project/images/truck8.png",
      "./game-project/images/truck9.png",
      "./game-project/images/drone1.png",
      "./game-project/images/drone2.png",
      "./game-project/images/drone3.png",
    ];

    this.currentIndex = 0;
    this.element = document.createElement("img");
    this.element.onload = () => {
      // Update dimensions on image load
      this.width = this.element.naturalWidth;
      this.height = this.element.naturalHeight;
      this.element.style.width = `${this.width}px`;
      this.element.style.height = `${this.height}px`;

      // Set position
      this.element.style.position = "absolute";
      this.element.style.top = `${this.top}px`;
      this.element.style.left = `${this.left}px`;
      this.element.style.right = `${this.right}px`;
      this.element.style.overflow = "hidden";
      // this.updatePosition();

      // Append the element to the game screen
      this.gameScreen.appendChild(this.element);
    };

    // Set initial src to start loading process
    this.element.src = this.imagePaths[this.currentIndex];
    // Set a new truck image
    this.differentTruck();
    this.updatePosition();

    // Audio Files
    // this.sound = new Audio("/audio/righttoleft.wav");
  }

  // Multi-truck logic
  differentTruck() {
    this.currentIndex = Math.floor(Math.random() * this.imagePaths.length);
    this.element.src = this.imagePaths[this.currentIndex];
    // this.currentIndex = (this.currentIndex + 1) % this.imagePaths.length;
  }

  // Movement Logic
  move() {
    this.left -= this.speed; 
    this.right = this.left + this.width;
    this.updatePosition();
    // Comment out above to help testing
  }

  updatePosition() {
    this.element.style.left = `${this.left}px`;
    this.element.style.right = `${this.right}px`;
  }
}
