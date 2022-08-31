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

/* THEME CHANGER 
   it is linking different theme css files to the index.html */
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
  let previousNumber,
    currentOperator,
    upperScreenText,
    result,
    operatorBtnLastClicked;

  /* EVENT LISTENERS */
  numberBtns.forEach((btn) =>
    btn.addEventListener("click", function () {
      operatorBtnLastClicked = false;
      resetFont();
      result = "";
      /* checking dot btn - prevent from multiple dots and writing without 0 in front */
      if (btn.innerHTML === ".") {
         // przeniósłbym '.' do osobnej zmiennej, numberBtns sugeruje że to numery, a '.' numerem nie jest :) i logika do '.' byłaby w osobnym miejscu, co jest plusem
        if (currentNumber.includes(".")) return;
        if (!currentNumber) currentNumber = "0";
      }
      /* checking current number max length */
      if (currentNumber.length >= numberMaxLength) return;

      currentNumber += btn.innerHTML;
      mainScreenDisplay(currentNumber);
    })
  );

  deleteBtn.addEventListener("click", function () {
    operatorBtnLastClicked = false;
    /* prevent from deleting when result is displayed */
    if (result || result === 0) return;

    currentNumber = currentNumber.slice(0, -1);
    mainScreenDisplay(currentNumber);
  });

  operatorBtns.forEach((btn) =>
    btn.addEventListener("click", function () {
      /* only changing operator */
      if (operatorBtnLastClicked) {
        currentOperator = btn.innerHTML;
        upperScreenText = previousNumber + " " + currentOperator;
         // stosuj template strings
        upperScreenDisplay(upperScreenText);
        return;
      }
      /* without changing operator */
      calculate();
      currentOperator = btn.innerHTML;
      /* if operator is clicked first - currentNumber = 0 */
      if (!currentNumber) currentNumber = "0";
      /* if there is a result - make it previousNumber */
      result || result === 0
        ? (previousNumber = result)
        : (previousNumber = currentNumber);
      /* currentNumber reset */
      currentNumber = "";
      mainScreenDisplay(currentNumber);
      upperScreenText = previousNumber + " " + currentOperator;
     // template strings + powtarza się to dwa razy, więc można wyodrębnić do osobnej metody
      upperScreenDisplay(upperScreenText);
      operatorBtnLastClicked = true;
    })
  );

  resetBtn.addEventListener("click", function () {
    reset();
  });

  performBtn.addEventListener("click", function () {
    operatorBtnLastClicked = false;
    calculate();
  });

  /* FUNCTIONS */
  const calculate = function () {
    const roundValue = 10 ** roundLevel;
    if (!currentOperator) return;
    /* converting to numbers */
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
        /* don't divide by 0 */
        if (currentNumber === 0) return;
        result = previousNumber / currentNumber;
        break;
    }
    result = Math.round(result * roundValue) / roundValue;
    /* if result is a long number -> add smaller font to screen */
    if (String(result).length >= numberMaxLength)
      mainScreen.classList.add("smaller-font");
    mainScreenDisplay(result);
    upperScreenDisplay("");
    previousNumber = result;
    currentNumber = "";
    currentOperator = "";
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
    operatorBtnLastClicked = false;
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
};
calculatorApp();
