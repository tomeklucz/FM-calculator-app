"use strict";

/* VARIABLES */
const numberBtns = document.querySelectorAll(".btn-num");
const operatorBtns = document.querySelectorAll(".btn-operator");
const deleteBtn = document.querySelector(".btn-delete");
const resetBtn = document.querySelector(".btn-reset");
const performBtn = document.querySelector(".btn-perform");
const upperScreen = document.querySelector(".upper-screen");
const mainScreen = document.querySelector(".main-screen");

const themeStylesheet = document.querySelector(".theme-stylesheet");
const themeInputsContainer = document.querySelector(".theme-inputs-container");

/* THEME CHANGER */
const themeChanger = function () {
  themeInputsContainer.addEventListener("click", function (e) {
    if (!e.target.classList.contains("theme-button")) return;
    const link = `css/theme${e.target.value}.css`;
    themeStylesheet.setAttribute("href", link);
  });
};
themeChanger();

/* CALCULATOR APP */
const calculatorApp = function () {
  let currentNumber = "";
  let previousNumber, currentOperator, upperScreenText, result;

  const roundLevel = 5;
  const numberMaxLength = 10;

  /* EVENT LISTENERS */
  numberBtns.forEach((btn) =>
    btn.addEventListener("click", function () {
      if (result || result === 0) {
        currentNumber = "";
        result = "";
      }
      dotBtnCheck(btn);
      if (currentNumber.length >= numberMaxLength) return;
      currentNumber += btn.innerHTML;
      mainScreenDisplay(currentNumber);
    })
  );

  deleteBtn.addEventListener("click", function () {
    if (result || result === 0) return;
    currentNumber = currentNumber.slice(0, -1);
    if (!currentNumber) currentNumber = "0";
    mainScreenDisplay(currentNumber);
  });

  operatorBtns.forEach((btn) =>
    btn.addEventListener("click", function () {
      if (!currentNumber) currentNumber = "0";
      currentOperator = btn.innerHTML;
      if (result || result === 0) currentNumber = result;
      previousNumber = currentNumber;
      upperScreenText = previousNumber + " " + currentOperator;
      upperScreenDisplay(upperScreenText);
      currentNumber = "";
    })
  );

  resetBtn.addEventListener("click", function () {
    reset();
  });

  performBtn.addEventListener("click", function () {
    calculate();
  });

  /* FUNCTIONS */
  const calculate = function () {
    const roundValue = 10 ** roundLevel;
    // console.log(previousNumber, currentNumber, currentOperator, result);
    if (!previousNumber || !currentNumber || !currentOperator) return;
    previousNumber = Number(previousNumber);
    currentNumber = Number(currentNumber);
    switch (currentOperator) {
      case "+":
        result = previousNumber + currentNumber;
        break;
      case "-":
        result = previousNumber - currentNumber;
        break;
      case "x":
        result = previousNumber * currentNumber;
        break;
      case "/":
        result = previousNumber / currentNumber;
        break;
    }
    result = Math.round(result * roundValue) / roundValue;
    mainScreenDisplay(result);
    upperScreenDisplay("");
    previousNumber = result;
  };

  const reset = function () {
    currentNumber = "";
    previousNumber = "";
    result = "";
    upperScreenText = "";
    upperScreenDisplay("");
    mainScreenDisplay("0");
    currentOperator = "";
  };

  const dotBtnCheck = function (btn) {
    if (btn.innerHTML === ".") {
      if (currentNumber.includes(".")) return;
      if (!currentNumber) currentNumber = "0";
    }
  };

  const mainScreenDisplay = function (textToDisplay) {
    mainScreen.innerHTML = textToDisplay;
  };

  const upperScreenDisplay = function (textToDisplay) {
    upperScreen.innerHTML = textToDisplay;
  };
};
calculatorApp();
