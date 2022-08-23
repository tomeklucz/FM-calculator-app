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
  const roundLevel = 5;
  const numberMaxLength = 15;
  let currentNumber = "";
  let previousNumber, currentOperator, upperScreenText, result;

  /* EVENT LISTENERS */
  numberBtns.forEach((btn) =>
    btn.addEventListener("click", function () {
      helperLogAll("START numberBTN CLICK");
      resetFont();
      // currentOperator = "";
      if (result || result === 0) {
        // currentNumber = "";
        result = "";
      }

      if (btn.innerHTML === ".") {
        if (currentNumber.includes(".")) return;
        if (!currentNumber) currentNumber = "0";
      }
      if (currentNumber.length >= numberMaxLength) return;
      // if (currentNumber === "0") currentNumber = "";
      currentNumber += btn.innerHTML;
      mainScreenDisplay(currentNumber);
      helperLogAll("END numberBTN CLICK");
    })
  );

  deleteBtn.addEventListener("click", function () {
    helperLogAll("START deleteBTN CLICK");
    if (result || result === 0) return;
    currentNumber = currentNumber.slice(0, -1);

    mainScreenDisplay(currentNumber);
    helperLogAll("END deleteBTN CLICK");
  });

  operatorBtns.forEach((btn) =>
    btn.addEventListener("click", function () {
      helperLogAll("START operatorBTN CLICK");
      // if (
      //   (currentNumber || currentNumber === 0) &&
      //   (previousNumber || previousNumber === 0)
      // )
      calculate();
      if (!currentNumber) currentNumber = "0";
      currentOperator = btn.innerHTML;
      if (result || result === 0) currentNumber = result;
      previousNumber = currentNumber;
      currentNumber = "";
      mainScreenDisplay(currentNumber);
      upperScreenText = previousNumber + " " + currentOperator;
      upperScreenDisplay(upperScreenText);
      helperLogAll("END operatorBTN CLICK");
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
    helperLogAll("START CALCULATE FUNCTION");
    const roundValue = 10 ** roundLevel;
    if (
      // !(previousNumber || previousNumber === 0) ||
      // !(currentNumber || currentNumber === 0) ||
      !currentOperator
    )
      return;
    console.log("working");
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
        if (currentNumber === 0 && result) return;
        result = previousNumber * currentNumber;
        break;
      case "/":
        if (currentNumber === 0 && result) return;
        result = previousNumber / currentNumber;
        break;
    }
    result = Math.round(result * roundValue) / roundValue;
    if (String(result).length >= numberMaxLength)
      mainScreen.classList.add("smaller-font");
    mainScreenDisplay(result);
    upperScreenDisplay("");
    previousNumber = result;
    currentNumber = "";
    currentOperator = "";
    helperLogAll("END CALCULATE FUNCTION");
  };

  const reset = function () {
    currentNumber = "";
    previousNumber = "";
    result = "";
    upperScreenText = "";
    currentOperator = "";
    upperScreenDisplay("");
    mainScreenDisplay("");
    resetFont();
  };

  const resetFont = function () {
    mainScreen.classList.remove("smaller-font");
  };

  const mainScreenDisplay = function (textToDisplay) {
    if (!textToDisplay) textToDisplay = "0";
    mainScreen.innerHTML = textToDisplay;
  };

  const upperScreenDisplay = function (textToDisplay) {
    upperScreen.innerHTML = textToDisplay;
  };

  const helperLogAll = function (string) {
    console.log(`---${string}---`);
    console.log(previousNumber, currentNumber, currentOperator, result);
  };
};
calculatorApp();
