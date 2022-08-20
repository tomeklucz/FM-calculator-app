"use strict";

const numberBtns = document.querySelectorAll(".btn-num");
const operatorBtns = document.querySelectorAll(".btn-operator");
const deleteBtn = document.querySelector(".btn-delete");
const resetBtn = document.querySelector(".btn-reset");
const performBtn = document.querySelector(".btn-perform");
const upperScreen = document.querySelector(".upper-screen");
const mainScreen = document.querySelector(".main-screen");
let currentNumber = "";
let previousNumber;
let currentOperator;
let upperScreenText;
let result;

const roundLevel = 5;
const numberMaxLength = 10;

numberBtns.forEach((btn) =>
  btn.addEventListener("click", function () {
    if (result || result === 0) {
      currentNumber = "";
      result = "";
    }
    if (btn.innerHTML === ".") {
      if (currentNumber.includes(".")) return;
      if (!currentNumber) currentNumber = "0";
    }
    if (currentNumber.length >= numberMaxLength) return;
    currentNumber += btn.innerHTML;
    mainScreen.innerHTML = currentNumber;
  })
);

deleteBtn.addEventListener("click", function () {
  currentNumber = currentNumber.slice(0, -1);
  mainScreen.innerHTML = currentNumber;
});

operatorBtns.forEach((btn) =>
  btn.addEventListener("click", function () {
    if (!currentNumber) currentNumber = "0";
    currentOperator = btn.innerHTML;
    if (result || result === 0) currentNumber = result;
    previousNumber = currentNumber;
    upperScreenText = previousNumber + " " + currentOperator;
    upperScreen.innerHTML = upperScreenText;
    currentNumber = "";
  })
);

resetBtn.addEventListener("click", function () {
  currentNumber = "";
  previousNumber = "";
  result = "";
  upperScreenText = "";
  upperScreen.innerHTML = "";
  mainScreen.innerHTML = "0";
  currentOperator = "";
});

performBtn.addEventListener("click", function () {
  calculate();
});

const calculate = function () {
  console.log(previousNumber, currentNumber, currentOperator, result);
  const roundValue = 10 ** roundLevel;
  const prev = Number(previousNumber);
  const curr = Number(currentNumber);
  if (!previousNumber || !currentNumber || !currentOperator) return;
  switch (currentOperator) {
    case "+":
      result = prev + curr;
      break;
    case "-":
      result = prev - curr;
      break;
    case "x":
      result = prev * curr;
      break;
    case "/":
      result = prev / curr;
      break;
  }
  result = Math.round(result * roundValue) / roundValue;
  mainScreen.innerHTML = result;
  upperScreen.innerHTML = "";
  previousNumber = result;
};
