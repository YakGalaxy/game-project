window.onload = function () {
  // Elements
  const activateButton = document.getElementById("activate-button");
  const playerNameInput = document.getElementById("player-name-input");
  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");
  const restartButton2 = document.getElementById("restart-button-2");
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


  // Splash Screen Listener
  activateButton.addEventListener("click", function () {
    game = new Game();
    game.advanceToNameScreen();
    game.uiNoise();
  });

  // Event listener for the player-name-input-icon on the name-screen
  playerNameInput.addEventListener("keydown", (e) => {
    const key = e.code;

    if (key === "Enter") {
      game.playerNameStorage(); 
      // console.log(localStorage.getItem("playerName"));
      // playerNameInputValue = "";
      game.uiNoise();
      game.advanceToStartScreen();
    }
  });

  // Event listener for the start-button (activate your drone) on the start-screen
  startButton.addEventListener("click", function () {
    game.uiNoise();
    game.advanceToGameScreen();
  });

  // Event listener for the file-button on the game screen
  fileButton.addEventListener("click", function () {
    // fileButton.classList.toggle("show");
    fileDropdown.classList.toggle("show");
    // fileDropdown.classList.add("show");
    // fileDropdown.classList.add("show");
  });

  // Restarting the Game

  // Add an event listener to the restart buttons
  restartButton.addEventListener("click", function () {
    game.uiNoise();
    restartGame();
  });

  restartButton2.addEventListener("click", function () {
    game.uiNoise();
    restartGame();
  });


  // Add an event listener to the restart dropdown link
  restartDropdownLink.addEventListener("click", function () {
    game.uiNoise();
    restartGame();
  });

  // The function that reloads the page to start a new game
  function restartGame() {
    setTimeout(() => {
      location.reload();
      // this.dialAudio()
    }, 1000);
  }

  // Player Keyboard tracking

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
    ];

    // Check if the pressed key is in the possibleKeystrokes array
    if (possibleKeystrokes.includes(key)) {
      event.preventDefault();

      // Update player's directionX and directionY based on the key pressed
      switch (key) {
        case "ArrowLeft":
          game.player.directionX = -5;
          break;
        case "ArrowUp":
          game.player.directionY = -5;
          break;
        case "ArrowRight":
          game.player.directionX = 5;
          break;
        case "ArrowDown":
          game.player.directionY = 5;
          break;
      }
    }
  }
};