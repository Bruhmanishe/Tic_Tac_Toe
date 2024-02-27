"use strict";

const wrapper = document.querySelector(".wrapper");

const gameTable = document.querySelector(".game-board");
const gameBoardCells = document.querySelectorAll(".cell");

const playerChoose = document.querySelector(".player-choose > span");
const playerOne = document.querySelector(".player-one");
const playerTwo = document.querySelector(".player-two");
const cross = document.querySelector(".cross");
const zero = document.querySelector(".zero");
const playerOneWinCount = document.querySelector(
  ".win-count__first-player > span"
);
const playerTwoWinCount = document.querySelector(
  ".win-count__second-palyer > span"
);
const plusOneWin = document.querySelector(".plus-win");
const playerOneWinDispaly = document.querySelector(".win-count__first-player");
const playerTwoWinDispaly = document.querySelector(".win-count__second-palyer");

const zeroAll = document.querySelectorAll(".zero");

function beforeChosPlayer(e) {
  if (!playerChoose.classList.contains("move-over-desk")) {
    playerChoose.classList.add("move-over-desk");
  } else if (playerChoose.classList.contains("move-over-desk")) {
    playerChoose.classList.remove("move-over-desk");
  }
}

setTimeout(choosingPlayer, 8000);

function choosingPlayer() {
  gameBoardCells.forEach((el) => el.classList.add("hover-cell"));
  gameTable.addEventListener("click", beforeChosPlayer);
  playerOne.addEventListener("click", (e) => {
    if (
      !playerOne.hasAttribute("choosed") &&
      !playerTwo.hasAttribute("choosed")
    ) {
      playerOne.setAttribute("choosed", "");
      gameTable.removeEventListener("click", beforeChosPlayer);
      playerChoose.classList.remove("move-over-desk");

      gameTable.addEventListener("click", startTheGame);
    }
  });
  playerTwo.addEventListener("click", (e) => {
    if (
      !playerOne.hasAttribute("choosed") &&
      !playerTwo.hasAttribute("choosed")
    ) {
      playerTwo.setAttribute("choosed", "");
      gameTable.removeEventListener("click", beforeChosPlayer);
      playerChoose.classList.remove("move-over-desk");

      gameTable.addEventListener("click", startTheGame);
    }
  });
}

function startTheGame(e) {
  if (playerOne.hasAttribute("choosed")) {
    for (let i = 0; i < gameBoardCells.length; i++) {
      let n = i;
      if (gameBoardCells[n] == e.target) {
        gameBoardCells[n].insertAdjacentHTML(
          "afterbegin",
          '<div class="cross"></div>'
        );
        gameBoardCells[n].setAttribute("contains", "");
        gameBoardCells[n].setAttribute("contains-cross", "");
        gameTable.removeEventListener("click", startTheGame);
        gameTable.addEventListener("click", nextStep);
      }
    }
    playerTwo.setAttribute("choosed", "");
    playerOne.toggleAttribute("choosed");
  } else if (playerTwo.hasAttribute("choosed")) {
    for (let i = 0; i < gameBoardCells.length; i++) {
      let n = i;
      if (gameBoardCells[n] == e.target) {
        gameBoardCells[n].insertAdjacentHTML(
          "afterbegin",
          '<div class="zero"></div>'
        );
        gameBoardCells[n].setAttribute("contains", "");
        gameBoardCells[n].setAttribute("contains-zero", "");
        gameTable.removeEventListener("click", startTheGame);
        gameTable.addEventListener("click", nextStep);
      }
    }
    playerOne.setAttribute("choosed", "");
    playerTwo.toggleAttribute("choosed");
  }
}

function nextStep(e) {
  if (playerOne.hasAttribute("choosed")) {
    for (let i = 0; i < gameBoardCells.length; i++) {
      let n = i;
      if (gameBoardCells[n] == e.target) {
        if (
          !gameBoardCells[n].hasAttribute("contains-cross") &&
          !gameBoardCells[n].hasAttribute("contains-zero")
        ) {
          gameBoardCells[n].insertAdjacentHTML(
            "afterbegin",
            '<div class="cross"></div>'
          );
          gameBoardCells[n].setAttribute("contains-cross", "");
          gameBoardCells[n].setAttribute("contains", "");
        }
      }
    }
    playerOne.toggleAttribute("choosed");
    playerTwo.setAttribute("choosed", "");
    setTimeout(gameOver, 2500);
  } else if (playerTwo.hasAttribute("choosed")) {
    for (let i = 0; i < gameBoardCells.length; i++) {
      let n = i;
      if (gameBoardCells[n] == e.target) {
        if (
          !gameBoardCells[n].hasAttribute("contains-zero") &&
          !gameBoardCells[n].hasAttribute("contains-cross")
        ) {
          gameBoardCells[n].insertAdjacentHTML(
            "afterbegin",
            '<div class="zero"></div>'
          );
          gameBoardCells[n].setAttribute("contains-zero", "");
          gameBoardCells[n].setAttribute("contains", "");
        }
      }
    }
    playerOne.setAttribute("choosed", "");
    playerTwo.toggleAttribute("choosed");
    setTimeout(gameOver, 2500);
  }
}

function gameOver() {
  let chosCells = [];
  let cellsWithCross = [];
  let cellsWithZero = [];

  for (let i = 0; gameBoardCells.length > i; i++) {
    let n = i;
    if (gameBoardCells[n].hasAttribute("contains")) {
      chosCells.unshift(gameBoardCells[n]);
    }
  }
  for (let i = 0; chosCells.length > i; i++) {
    let n = i;
    if (chosCells[n].hasAttribute("contains-cross")) {
      cellsWithCross.unshift(chosCells[n]);
    }
  }
  for (let i = 0; chosCells.length > i; i++) {
    let n = i;
    if (chosCells[n].hasAttribute("contains-zero")) {
      cellsWithZero.unshift(chosCells[n]);
    }
  }
  for (let i = 0; 1 > i; i++) {
    if (cellsWithCross.length > 2) {
      if (
        gameBoardCells[0].hasAttribute("contains-cross") &&
        gameBoardCells[3].hasAttribute("contains-cross") &&
        gameBoardCells[6].hasAttribute("contains-cross")
      ) {
        playerOneWon();
      } else if (
        gameBoardCells[1].hasAttribute("contains-cross") &&
        gameBoardCells[4].hasAttribute("contains-cross") &&
        gameBoardCells[7].hasAttribute("contains-cross")
      ) {
        playerOneWon();
      } else if (
        gameBoardCells[2].hasAttribute("contains-cross") &&
        gameBoardCells[5].hasAttribute("contains-cross") &&
        gameBoardCells[8].hasAttribute("contains-cross")
      ) {
        playerOneWon();
      } else if (
        gameBoardCells[0].hasAttribute("contains-cross") &&
        gameBoardCells[1].hasAttribute("contains-cross") &&
        gameBoardCells[2].hasAttribute("contains-cross")
      ) {
        playerOneWon();
      } else if (
        gameBoardCells[3].hasAttribute("contains-cross") &&
        gameBoardCells[4].hasAttribute("contains-cross") &&
        gameBoardCells[5].hasAttribute("contains-cross")
      ) {
        playerOneWon();
      } else if (
        gameBoardCells[6].hasAttribute("contains-cross") &&
        gameBoardCells[7].hasAttribute("contains-cross") &&
        gameBoardCells[8].hasAttribute("contains-cross")
      ) {
        playerOneWon();
      } else if (
        gameBoardCells[0].hasAttribute("contains-cross") &&
        gameBoardCells[4].hasAttribute("contains-cross") &&
        gameBoardCells[8].hasAttribute("contains-cross")
      ) {
        playerOneWon();
      } else if (
        gameBoardCells[2].hasAttribute("contains-cross") &&
        gameBoardCells[4].hasAttribute("contains-cross") &&
        gameBoardCells[6].hasAttribute("contains-cross")
      ) {
        playerOneWon();
      } else if (chosCells.length == 9) {
        draw();
      }
    }
    if (cellsWithZero.length > 2) {
      if (
        gameBoardCells[0].hasAttribute("contains-zero") &&
        gameBoardCells[3].hasAttribute("contains-zero") &&
        gameBoardCells[6].hasAttribute("contains-zero")
      ) {
        playerTwoWon();
      } else if (
        gameBoardCells[1].hasAttribute("contains-zero") &&
        gameBoardCells[4].hasAttribute("contains-zero") &&
        gameBoardCells[7].hasAttribute("contains-zero")
      ) {
        playerTwoWon();
      } else if (
        gameBoardCells[2].hasAttribute("contains-zero") &&
        gameBoardCells[5].hasAttribute("contains-zero") &&
        gameBoardCells[8].hasAttribute("contains-zero")
      ) {
        playerTwoWon();
      } else if (
        gameBoardCells[0].hasAttribute("contains-zero") &&
        gameBoardCells[1].hasAttribute("contains-zero") &&
        gameBoardCells[2].hasAttribute("contains-zero")
      ) {
        playerTwoWon();
      } else if (
        gameBoardCells[3].hasAttribute("contains-zero") &&
        gameBoardCells[4].hasAttribute("contains-zero") &&
        gameBoardCells[5].hasAttribute("contains-zero")
      ) {
        playerTwoWon();
      } else if (
        gameBoardCells[6].hasAttribute("contains-zero") &&
        gameBoardCells[7].hasAttribute("contains-zero") &&
        gameBoardCells[8].hasAttribute("contains-zero")
      ) {
        playerTwoWon();
      } else if (
        gameBoardCells[0].hasAttribute("contains-zero") &&
        gameBoardCells[4].hasAttribute("contains-zero") &&
        gameBoardCells[8].hasAttribute("contains-zero")
      ) {
        playerTwoWon();
      } else if (
        gameBoardCells[2].hasAttribute("contains-zero") &&
        gameBoardCells[4].hasAttribute("contains-zero") &&
        gameBoardCells[6].hasAttribute("contains-zero")
      ) {
        playerTwoWon();
      } else if (chosCells.length == 9) {
        draw();
      }
    }
  }
}

function playerOneWon() {
  let chosCells = [];
  let cellsWithCross = [];
  let cellsWithZero = [];

  for (let i = 0; gameBoardCells.length > i; i++) {
    let n = i;
    if (gameBoardCells[n].hasAttribute("contains")) {
      chosCells.unshift(gameBoardCells[n]);
    }
  }
  for (let i = 0; chosCells.length > i; i++) {
    let n = i;
    if (chosCells[n].hasAttribute("contains-cross")) {
      cellsWithCross.unshift(chosCells[n]);
    }
  }
  for (let i = 0; chosCells.length > i; i++) {
    let n = i;
    if (chosCells[n].hasAttribute("contains-zero")) {
      cellsWithZero.unshift(chosCells[n]);
    }
  }
  gameTable.removeEventListener("click", nextStep);
  playerOne.removeAttribute("choosed");
  playerTwo.removeAttribute("choosed");
  chosCells.forEach((el) => el.removeAttribute("contains"));
  chosCells.forEach((el) => (el.innerHTML = ""));
  cellsWithZero.forEach((el) => el.removeAttribute("contains-zero"));
  cellsWithCross.forEach((el) => el.removeAttribute("contains-cross"));
  console.log("First player, You've Won!");
  gameTable.addEventListener("click", beforeChosPlayer);
  addToWinCountOne();
}
function playerTwoWon() {
  let chosCells = [];
  let cellsWithCross = [];
  let cellsWithZero = [];

  for (let i = 0; gameBoardCells.length > i; i++) {
    let n = i;
    if (gameBoardCells[n].hasAttribute("contains")) {
      chosCells.unshift(gameBoardCells[n]);
    }
  }
  for (let i = 0; chosCells.length > i; i++) {
    let n = i;
    if (chosCells[n].hasAttribute("contains-cross")) {
      cellsWithCross.unshift(chosCells[n]);
    }
  }
  for (let i = 0; chosCells.length > i; i++) {
    let n = i;
    if (chosCells[n].hasAttribute("contains-zero")) {
      cellsWithZero.unshift(chosCells[n]);
    }
  }
  gameTable.removeEventListener("click", nextStep);
  playerOne.removeAttribute("choosed");
  playerTwo.removeAttribute("choosed");
  chosCells.forEach((el) => el.removeAttribute("contains"));
  chosCells.forEach((el) => (el.innerHTML = ""));
  cellsWithZero.forEach((el) => el.removeAttribute("contains-zero"));
  cellsWithCross.forEach((el) => el.removeAttribute("contains-cross"));
  addToWinCountTwo();
  console.log("Second player, You've Won!");
  gameTable.addEventListener("click", beforeChosPlayer);
}

function draw() {
  let chosCells = [];
  let cellsWithCross = [];
  let cellsWithZero = [];

  for (let i = 0; gameBoardCells.length > i; i++) {
    let n = i;
    if (gameBoardCells[n].hasAttribute("contains")) {
      chosCells.unshift(gameBoardCells[n]);
    }
  }
  for (let i = 0; chosCells.length > i; i++) {
    let n = i;
    if (chosCells[n].hasAttribute("contains-cross")) {
      cellsWithCross.unshift(chosCells[n]);
    }
  }
  for (let i = 0; chosCells.length > i; i++) {
    let n = i;
    if (chosCells[n].hasAttribute("contains-zero")) {
      cellsWithZero.unshift(chosCells[n]);
    }
  }
  gameTable.removeEventListener("click", nextStep);
  playerOne.removeAttribute("choosed");
  playerTwo.removeAttribute("choosed");
  chosCells.forEach((el) => el.removeAttribute("contains"));
  chosCells.forEach((el) => (el.innerHTML = ""));
  cellsWithZero.forEach((el) => el.removeAttribute("contains-zero"));
  cellsWithCross.forEach((el) => el.removeAttribute("contains-cross"));
  gameTable.addEventListener("click", beforeChosPlayer);
  console.log("Sadly, it's a draw...");
}

function addToWinCountOne() {
  let previousCount = playerOneWinCount.textContent;
  let precCountNumb = parseInt(previousCount, 10);
  if (precCountNumb < 9) {
    playerOneWinCount.textContent = `00${precCountNumb + 1}`;
  } else if (precCountNumb >= 9) {
    playerOneWinCount.textContent = `0${precCountNumb + 1}`;
  } else if (precCountNumb < 99) {
    playerOneWinCount.textContent = `0${precCountNumb + 1}`;
  } else if (precCountNumb >= 99) {
    playerOneWinCount.textContent = `${precCountNumb + 1}`;
  }
  plusOne(playerOneWinDispaly);
}

function addToWinCountTwo() {
  let previousCount = playerTwoWinCount.textContent;
  let precCountNumb = parseInt(previousCount, 10);
  if (precCountNumb < 9) {
    playerTwoWinCount.textContent = `00${precCountNumb + 1}`;
  } else if (precCountNumb >= 9) {
    playerTwoWinCount.textContent = `0${precCountNumb + 1}`;
  } else if (precCountNumb < 99) {
    playerTwoWinCount.textContent = `0${precCountNumb + 1}`;
  } else if (precCountNumb >= 99) {
    playerTwoWinCount.textContent = `${precCountNumb + 1}`;
  }
  plusOne(playerTwoWinDispaly);
}

function plusOne(elementAddTo) {
  if (plusOneWin.classList.contains("display-none")) {
    elementAddTo.insertAdjacentElement("afterbegin", plusOneWin);
    plusOneWin.classList.toggle("display-none");
    setTimeout(() => {
      plusOneWin.classList.toggle("display-none");
    }, 500);
  }
}
