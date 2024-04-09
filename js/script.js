window.onload = function () {
  const activateButton = document.getElementById("activate-button");
  const playerNameInput = document.getElementById("player-name-input");
  const playerNameInputIcon = document.getElementById("player-name-input-icon");
  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");
  const audioTrack = new Audio("/audio/Next Future.mp3");
  let game;

  // Add an event listener to the activate button on the splash screen
  activateButton.addEventListener("click", function () {
    game = new Game();
    game.advanceToNameScreen();
  });

  // Add an event listener to the player-name-input field on the name screen
  // Unclear what purpose this is serving (below)
  //   playerNameInput.addEventListener("input", function () {
  //     game.inputConfirm();
  //   });

  // Add an event listener to the player-name-input-icon on the name-screen

  playerNameInputIcon.addEventListener("click", function () {
    game.advanceToStartScreen();
  });

  // Add an event listener to the start-button (activate your drone) on the start-screen

  startButton.addEventListener("click", function () {
    game.advanceToGameScreen();
    game.start();
    backingTrack();   
  });
    
    // Play backing track

    function backingTrack () {
        audioTrack.play();
    }

  // Add an event listener to the restart button
  restartButton.addEventListener("click", function () {
    // Call the restartGame function when the button is clicked
    restartGame();
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
