/* need to fix:
2. closing game when choosing botgame and visa versa
*/

document.querySelector(".startbutton").addEventListener("click", game);
document.querySelector(".restartbutton").addEventListener("click", restart);
document.querySelector(".botbutton").addEventListener("click", botGame);

let isGameActive = true;
let humanGameRunning = false;
let botGameRunning = false;
let choice = "X";
let counter = 0;
const player1 = "X";
const player2 = "0";
const statusGameMessage = document.querySelector(".winner");
const counterX = document.querySelector(".counterX");
const counterY = document.querySelector(".counterY");
const cells = document.querySelectorAll(".cell");

function botPlayer() {
  if (isGameActive) {
    let row1 = [cells[0], cells[1], cells[2]];
    let row2 = [cells[3], cells[4], cells[5]];
    let row3 = [cells[6], cells[7], cells[8]];
    let col1 = [cells[0], cells[3], cells[6]];
    let col2 = [cells[1], cells[4], cells[7]];
    let col3 = [cells[2], cells[5], cells[8]];
    let diag1 = [cells[0], cells[4], cells[8]];
    let diag2 = [cells[2], cells[4], cells[6]];
    let middle = [cells[4]];
    let edges = [cells[0], cells[2], cells[6], cells[8]];
    let allOpts = [row1, row2, row3, col1, col2, col3, diag1, diag2];
    let zeroArr;
    let xArr;

    const arraysForBot = [
      middle,
      edges,
      diag1,
      diag2,
      row1,
      row2,
      row3,
      col1,
      col2,
      col3,
    ];
    choice = "0";
    counter++;
    console.log(counter);
    for (let subArr of allOpts) {
      let xCoun = 0;
      let zeroCoun = 0;
      let emptyCoun = 0;
      for (let item of subArr) {
        switch (item.textContent) {
          case "X":
            xCoun += 1;
            break;
          case "0":
            zeroCoun += 1;
            break;
          case "":
            emptyCoun += 1;
            break;
        }
      }

      console.log(xCoun, zeroCoun, emptyCoun);
      if (zeroCoun == 2 && emptyCoun == 1) {
        console.log("two zeros");
        zeroArr = subArr;
      } else if (xCoun == 2 && emptyCoun == 1) {
        console.log("two X's");
        xArr = subArr;
      }
    }
    // console.log(xArr);
    console.log(zeroArr);
    console.log(xArr);
    if (zeroArr) {
      for (let item of zeroArr) {
        item.textContent =
          item.textContent === "" ? (item.textContent = "0") : item.textContent;
      }
      checkWinner(choice);
      return;
    } else if (xArr) {
      for (let item of xArr) {
        item.textContent =
          item.textContent === "" ? (item.textContent = "0") : item.textContent;
      }
      checkWinner(choice);
      return;
    } else {
      for (let row of arraysForBot) {
        for (let item of row) {
          if (item.textContent == "") {
            item.textContent = "0";
            checkWinner(choice);

            return;
          }
        }
      }
    }
  }
}

function checkWinner(choice) {
  if (
    (cells[0].textContent == cells[1].textContent &&
      cells[0].textContent == cells[2].textContent &&
      cells[0].textContent !== "") ||
    (cells[3].textContent == cells[4].textContent &&
      cells[3].textContent == cells[5].textContent &&
      cells[3].textContent !== "") ||
    (cells[6].textContent == cells[7].textContent &&
      cells[6].textContent == cells[8].textContent &&
      cells[6].textContent !== "") ||
    (cells[0].textContent == cells[3].textContent &&
      cells[0].textContent == cells[6].textContent &&
      cells[6].textContent !== "") ||
    (cells[1].textContent == cells[4].textContent &&
      cells[1].textContent == cells[7].textContent &&
      cells[1].textContent !== "") ||
    (cells[2].textContent == cells[5].textContent &&
      cells[2].textContent == cells[8].textContent &&
      cells[2].textContent !== "") ||
    (cells[0].textContent == cells[4].textContent &&
      cells[0].textContent == cells[8].textContent &&
      cells[0].textContent !== "") ||
    (cells[2].textContent == cells[4].textContent &&
      cells[2].textContent == cells[6].textContent &&
      cells[2].textContent !== "")
  ) {
    statusGameMessage.textContent = `${choice} wins! 😎`;
    choice == player1
      ? (counterX.textContent += "I ")
      : (counterY.textContent += "I ");
    isGameActive = false;
  }
  if (counter == 9) {
    statusGameMessage.textContent = "Nobody won 😪";
  }
}

const clicking = (clicked) => {
  if (!isGameActive) return;
  const cell = clicked.target;
  if (cell.textContent === "") {
    cell.textContent = choice;
    counter++;
    if (counter >= 5) {
      checkWinner(choice);
    }

    choice = choice === player1 ? player2 : player1;
  }
};

const clickingBot = (clicked, choice) => {
  counterX.textContent = "";
  counterY.textContent = "";

  choice = "X";
  if (!isGameActive) return;
  const cell = clicked.target;
  if (cell.textContent === "") {
    cell.textContent = choice;
    counter++;
    if (counter >= 3) {
      checkWinner(choice);
    }
    // choice = choice === player1 ? player2 : player1;
    setTimeout(botPlayer, 500);
  }
};

function clearCells() {
  cells.forEach(function (cell) {
    cell.textContent = "";
  });
}

function restart() {
  isGameActive = true;
  clearCells();
  const x = document.querySelector(".winner");
  x.textContent = "";
  choice = "X";
  counter = 0;
}
let clickingEventListener, clickingBotEventListener;

function removeAllEventListeners() {
  const cells = document.querySelectorAll(".cell");
  for (let cell of cells) {
    cell.removeEventListener("click", clickingEventListener);
    cell.removeEventListener("click", clickingBotEventListener);
  }
}

function game() {
  counter = 0;
  clearCells();
  humanGameRunning = true;
  choice = player1;

  removeAllEventListeners(); // Remove existing event listeners

  clickingEventListener = (_event_) => clicking(_event_, choice);

  const cells = document.querySelectorAll(".cell");
  for (let cell of cells) {
    cell.addEventListener("click", clickingEventListener);
  }

  botGameRunning = false;
}

function botGame() {
  counter = 0;
  clearCells();
  botGameRunning = true;
  choice = player1;

  removeAllEventListeners(); // Remove existing event listeners

  clickingBotEventListener = (_event_) => clickingBot(_event_, choice);

  const cells = document.querySelectorAll(".cell");
  for (let cell of cells) {
    cell.addEventListener("click", clickingBotEventListener);
  }

  humanGameRunning = false;
}
// cells.forEach(function (cell) {
//   cell.addEventListener("click", function (event) {
//     clickingBot(event, choice);
//   })
//   if (humanGameRunning) {
//     cell.removeEventListener("click", clicking);
//     console.log("removed cliking");
//   }
// });

// function animateLetter() {
//   const letter = document.querySelector(".winner");
//   anime({
//     targets: letter,
//     opacity: {
//       value: 1,
//       duration: 1000,
//       easing: "easeInOut",
//     },
//     scale: {
//       value: 1.5,
//       duration: 1000,
//       easing: "easeInOut",
//     },
//     easing: "easeInOut",
//     duration: 3000,
//     delay: 1000, // start the animation immediately
//   });
// }
