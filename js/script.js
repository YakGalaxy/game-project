window.onload = function () {
  // DOM Elements
  const activateButton = document.getElementById("activate-button");
  const playerNameInput = document.getElementById("player-name-input");
  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");
  const restartButton2 = document.getElementById("restart-button-2");
  const cheatButton = document.getElementById("cheat-button");
  const fileButton = document.getElementById("file-button");
  const fileDropdown = document.getElementById("dropdown-content");
  const restartDropdownLink = document.getElementById("restart");

  //  Window onclicks

  // window.onclick = function (event) {
  //   let dropdown = document.getElementById("dropdown-content");
  //   if (event.target != dropdown) {
  //     console.log("click fired");
  //     if (dropdown.classList.contains("show")) {
  //       dropdown.classList.replace("show", "#dropdown-content")
  //       console.log("if fired");
  //     }
  //   }
  //   }

  // Initilizations
  let game;

  // Splash Screen
  activateButton.addEventListener("click", function () {
    game = new Game();
    game.advanceToNameScreen();
    game.uiNoise();
  });

  // Enable Player to Enter Name and Press Enter to Continue
  playerNameInput.addEventListener("keydown", (e) => {
    const key = e.code;

    if (key === "Enter") {
      game.playerNameStorage();
      game.uiNoise();
      game.advanceToStartScreen();
    }
  });

  // Start Button
  startButton.addEventListener("click", function () {
    game.uiNoise();
    game.advanceToGameScreen();
  });

  // File Button
  fileButton.addEventListener("click", function () {
    fileDropdown.classList.toggle("show");
  });

  // Cheat Button
  cheatButton.addEventListener("click", function () {
    game.cheat();
  });

  // Restart Menu Dropdown
  restartDropdownLink.addEventListener("click", function () {
    game.uiNoise();
    restartGame();
  });

  // Player Keyboard Tracking
  document.addEventListener("keyup", () => {
    game.player.directionX = 0;
    game.player.directionY = 0;
  });

  window.addEventListener("keydown", handleKeydown);

  function handleKeydown(event) {
    const key = event.key;
    const possibleKeystrokes = [
      "ArrowLeft",
      "ArrowUp",
      "ArrowRight",
      "ArrowDown",
      "w",
      "a",
      "s",
      "d",
    ];

    if (possibleKeystrokes.includes(key)) {
      event.preventDefault();

      switch (key) {
        case "ArrowLeft":
          game.player.directionX = -10;
          break;
        case "ArrowUp":
          game.player.directionY = -10;
          break;
        case "ArrowRight":
          game.player.directionX = 10;
          break;
        case "ArrowDown":
          game.player.directionY = 10;
          break;
        case "w":
          game.player.directionY = -10;
          break;
        case "a":
          game.player.directionX = -10;
          break;
        case "s":
          game.player.directionY = 10;
          break;
        case "d":
          game.player.directionX = 10;
          break;
      }
    }
  }

  // Restart Game Logic
  restartButton.addEventListener("click", function () {
    game.uiNoise();
    restartGame();
  });

  restartButton2.addEventListener("click", function () {
    game.uiNoise();
    restartGame();
  });

  function restartGame() {
    setTimeout(() => {
      location.reload();
      // this.dialAudio()
    }, 1000);
  }
};
