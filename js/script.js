window.onload = function () {
    const activateButton = document.getElementById("activate-button");
    
  const nameInput = document.getElementById("player-name");

  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");
  let game;

  // Add an event listener to the start button

  // Add an event listener to the restart button
  restartButton.addEventListener("click", function () {
    // Call the restartGame function when the button is clicked
    restartGame();
  });

  // The function that reloads the page to start a new game
  function restartGame() {
    location.reload();
  }

//   startButton.addEventListener("click", function () {
//     activateGame();
//   });

//   function activateGame() {
//     console.log("activate game");
//     game = new Game();
//     // game.start();
//   }

  // Add an event listener to the activate button
  activateButton.addEventListener("click", function () {
      game = new Game();
      console.log("activate game");
      game.nextScreen();
  });

    
    nameInput.addEventListener("input", function (){
        game.inputConfirm(); 
    });
    
    
    
    
    
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
          game.player.directionX = -1;
          break;
        case "ArrowUp":
          game.player.directionY = -1;
          break;
        case "ArrowRight":
          game.player.directionX = 1;
          break;
        case "ArrowDown":
          game.player.directionY = 1;
          break;
      }
    }
  }
};
