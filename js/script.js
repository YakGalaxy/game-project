window.onload = function () {
  const activateButton = document.getElementById("activate-button");
  const playerNameInput = document.getElementById("player-name-input");
  const playerNameInputIcon = document.getElementById("player-name-input-icon");
  let playerNameH1 = document.getElementById("player-name-h1");
  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");
  const audioTrack = new Audio("/audio/Next Future.mp3");
  const uiAudio = new Audio("/audio/Retro8.mp3");
  let game;
  let playerNameInputValue;
  let playerNameStorage;

  // Add an event listener to the activate button on the splash screen
  activateButton.addEventListener("click", function () {
    game = new Game();
    game.advanceToNameScreen();
    uiNoise();
  });

  // Add an event listener to the player-name-input field on the name screen
  // Unclear what purpose this is serving (below)
  //   playerNameInput.addEventListener("input", function () {
  //     game.inputConfirm();
  //   });

  // Add an event listener to the player-name-input-icon on the name-screen

  playerNameInputIcon.addEventListener("click", function () {
    playerNameInputValue = document.getElementById("player-name-input").value;
    playerNameStorage = localStorage.setItem(
      "playerName",
      playerNameInputValue
    );
    playerNameH1.textContent = `Welcome ${localStorage.getItem("playerName")}`;
    // console.log(localStorage.getItem("playerName"));
    // playerNameInputValue = "";
    uiNoise();
    game.advanceToStartScreen();
  });

  // Add an event listener to the start-button (activate your drone) on the start-screen

  startButton.addEventListener("click", function () {
    game.advanceToGameScreen();
    game.start();
    backingTrack();
  });

  // Play backing track

  function backingTrack() {
    audioTrack.volume = 0;
    //   Reset to 0.15 outside of testing
    audioTrack.loop = true;
    audioTrack.play();
  }

  // Play Ui noise

  function uiNoise() {
    uiAudio.load();
    uiAudio.volume = 0.25;
    uiAudio.play();
  }

  // Add an event listener to the restart button
  restartButton.addEventListener("click", function () {
    // Call the restartGame function when the button is clicked
    restartGame();
    uiNoise();
  });

  // The function that reloads the page to start a new game
  function restartGame() {
    location.reload();
  }

  //     // Keyboard tracking

  //   document.addEventListener("keyup", () => {
  //     game.player.directionX = 0;
  //     game.player.directionY = 0;
  //   });

  //   window.addEventListener("keydown", handleKeydown);

  //   function handleKeydown(event) {
  //     const key = event.key;
  //     const possibleKeystrokes = [
  //       "ArrowLeft",
  //       "ArrowUp",
  //       "ArrowRight",
  //       "ArrowDown",
  //     ];

  //     // Check if the pressed key is in the possibleKeystrokes array
  //     if (possibleKeystrokes.includes(key)) {
  //       event.preventDefault();

  //       // Update player's directionX and directionY based on the key pressed
  //       switch (key) {
  //         case "ArrowLeft":
  //           game.player.directionX = -1;
  //           break;
  //         case "ArrowUp":
  //           game.player.directionY = -1;
  //           break;
  //         case "ArrowRight":
  //           game.player.directionX = 1;
  //           break;
  //         case "ArrowDown":
  //           game.player.directionY = 1;
  //           break;
  //       }
  //     }
  //   }
};
