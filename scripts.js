var runCalculator = function () {
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
};

var runStickies = function () {
  //gobal
  var isDragging = false;
  var dragTarget;

  var x = 0;
  var y = 0;

  var stickiesContainer = document.querySelector("#stickies-container");
  var createStickyButton = document.querySelector("#createsticky");
  var titleInput = document.querySelector("#stickytitle");
  var textInput = document.querySelector("#stickytext");

  // delete sticky function
  var removeSticky = function () {};

  // set event listeners
  window.addEventListener("mousedown", (event) => {
    if (event.target.classList.contains("drag")) {
      console.log(event.target.classList);
      dragTarget = event.target;
      dragTarget.parentNode.append(dragTarget);
      x = event.offsetX;
      y = event.offsetY;
      isDragging = true;
    }
  });

  window.addEventListener("mousemove", function (event) {
    console.log(isDragging, event);
    if (isDragging) {
      dragTarget.style.left = event.clientX - x + "px";
      dragTarget.style.top = event.clientY - y + "px";
    }
  });

  window.addEventListener("mouseup", () => {
    isDragging = false;
  });

  createStickyButton.addEventListener("click", () => {
    var newSticky = document.createElement("div");

    var template = `
      <h3>
        ${titleInput.value}
      </h3>
      <p>
        ${textInput.value}
      </p>
      <span class="delete-btn">&times;</span>
    `;

    newSticky.classList.add("drag", "sticky", "green-gradient");
    newSticky.innerHTML = template;

    stickiesContainer.append(newSticky);
    document.querySelector("#stickytitle").value = "";
    document.querySelector("#stickytext").value = "";
  });

  document.body.addEventListener("click", function (event) {
    if (event.target.className.includes("delete-btn")) {
      event.target.closest(".sticky").remove();
    }
  });
};

runCalculator();
runStickies();
