var allNumbers = document.querySelectorAll(".number");
var operators = document.querySelectorAll(".operator");
var userInput = document.querySelector("#user-input");
var submit = document.querySelector(".submit");
var clear = document.querySelector(".clear");

for (var i = 0; i < allNumbers.length; i++) {
  var currentNumber = allNumbers[i];
  currentNumber.addEventListener("click", function (event) {
    var number = event.target.getAttribute("data");
    var inputText = userInput.value;
    userInput.value = inputText + number;
  });
}

for (var i = 0; i < operators.length; i++) {
  var currentOperator = operators[i];
  currentOperator.addEventListener("click", function (event) {
    var operator = event.target.getAttribute("data");
    var inputText = userInput.value;
    userInput.value = inputText + " " + operator + " ";
  });
}

submit.addEventListener("click", function (event) {
  var inputText = userInput.value;

  var inputArray = inputText.split(" ");

  var tempNumber;
  var tempOperator;
  var operatorFlag = false;

  for (var i = 0; i < inputArray.length; i++) {
    var input = inputArray[i];
    if (parseFloat(input)) {
      if (operatorFlag) {
        switch (tempOperator) {
          case "+":
            tempNumber = tempNumber + parseFloat(input);
            break;
          case "-":
            tempNumber = tempNumber - parseFloat(input);
            break;
          case "x":
            tempNumber = tempNumber * parseFloat(input);
            break;
          case "/":
            tempNumber = tempNumber / parseFloat(input);
            break;
          default:
            break;
        }
      } else {
        tempNumber = parseFloat(input);
      }
    } else {
      operatorFlag = true;
      tempOperator = input;
    }
  }

  userInput.value = tempNumber.toFixed(2);
});

clear.addEventListener("click", function (event) {
  userInput.value = "";
});