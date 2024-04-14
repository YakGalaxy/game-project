window.onload = function () {
  // Elements
  const activateButton = document.getElementById("activate-button");
  const playerNameInput = document.getElementById("player-name-input");
  let playerNameH1 = document.getElementById("player-name-h1");
  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");
  const fileButton = document.getElementById("file-button");
  const fileDropdown = document.getElementById("dropdown-content");

  // Initilizations
  let game;
  let playerNameInputValue;
  let playerNameStorage;

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
      playerNameInputValue = document.getElementById("player-name-input").value;
      playerNameStorage = localStorage.setItem(
        "playerName",
        playerNameInputValue
      );
      playerNameH1.textContent = `Welcome ${localStorage.getItem(
        "playerName"
      )}`;
      // console.log(localStorage.getItem("playerName"));
      // playerNameInputValue = "";
      game.uiNoise();
      game.advanceToStartScreen();
    }
  });

  // Event listener for the start-button (activate your drone) on the start-screen
  startButton.addEventListener("click", function () {
    game.advanceToGameScreen();
    game.start();
  });

  // Event listener for the file-button on the game screen
  fileButton.addEventListener("click", function () {
    // fileButton.classList.toggle("show");
    fileDropdown.style.removeProperty("display")
    fileDropdown.classList.toggle("show");
  });

  window.onclick = function (event) {
    if (!event.target.matches(".dropbtn")) {
      let dropdowns = document.getElementsByClassName("dropdown-content");
      let i;
      for (i = 0; i < dropdowns.length; i++) {
        let openDropdown = dropdowns[i];
        if (openDropdown.classList.contains("show")) {
          openDropdown.classList.remove("show");
        }
      }
    }
  }; 


  // Restarting the Game

  // Add an event listener to the restart button
  restartButton.addEventListener("click", function () {
    restartGame();
    game.uiNoise();
  });

  // The function that reloads the page to start a new game
  function restartGame() {
    location.reload();
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