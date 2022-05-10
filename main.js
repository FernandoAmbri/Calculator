const display = document.querySelector(".display");
const btnEqual = document.querySelector(".result");

const add_subtract_btn = document.querySelector(".subtract-add");
const porcentage_btn = document.querySelector(".porcentage");
const point = document.querySelector(".point");

const numbers = document.querySelectorAll("#number");
const operators = document.querySelectorAll("#operator");
const delete_numbers = document.querySelectorAll("#restart");

let num1 = "";
let num2 = "";
let operator_val = "";
let final_result = "";
let flag = false;

function show_result() {
  if (num1.length > 0 && num2.length > 0 && operator_val !== "") {
    get_result(operator_val, num1, num2);
    final_result = get_result(operator_val, num1, num2);
    num1 = "";
    num2 = "";
    operator_val = "";
    flag = false;
  }
}

function get_result(operator, number1, number2) {
  let result_operation;
  number1 = Number(num1);
  number2 = Number(num2);
  result_operation = operate_numbers(operator, number1, number2).toString();
  if (result_operation.length > 9) {
    result_operation = result_operation.substring(0, 9);
    display.textContent = result_operation;
  } else {
    display.textContent = result_operation;
  }
  return result_operation;
}

function operate_numbers(operator, number1, number2) {
  let value;
  switch (operator) {
    case "+":
      value = number1 + number2;
      break;
    case "-":
      value = number1 - number2;
      break;
    case "*":
      value = number1 * number2;
      break;
    case "/":
      if (number1 === 0 || number2 === 0) {
        value = 0;
      } else {
        value = number1 / number2;
      }
      break;
  }
  return value;
}

function porcentage(num) {
  return num / 100;
}

function add_subtract(number) {
  return number > 0 ? -1 * number : Math.abs(number);
}

numbers.forEach((number) => {
  number.addEventListener("click", (e) => {
    if (num1.length < 9 && !flag) {
      if (!num1.match(/^0/) || num1.match(/^0\./)) {
        num1 += number.textContent.trim();
        display.textContent = num1;
      }
    }
    if (num2.length < 9 && flag) {
      if (!num2.match(/^0/) || num2.match(/^0\./)) {
        num2 += number.textContent.trim();
        display.textContent = num2;
      }
    }
  });
});

operators.forEach((operator) => {
  operator.addEventListener("click", (e) => {
    if (final_result.length > 0 && num1.length === 0 && num2.length === 0) {
      display.textContent = operator.textContent;
      operator_val = operator.textContent;
      num1 = final_result;
      flag = true;
    } else if (num1.length > 0 && num2.length > 0) {
      show_result();
    } else {
      display.textContent = operator.textContent;
      operator_val = operator.textContent;
      flag = true;
    }
  });
});

btnEqual.addEventListener("click", () => {
  show_result();
});

delete_numbers.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (button.textContent === "AC") {
      delete_all();
    } else if (button.textContent === "DEL") {
      if (num1.length > 0 && !flag) {
        num1 = num1.substring(0, num1.length - 1);
        display.textContent = num1.length > 0 ? num1 : "0";
      } else if (num2.length > 0 && flag) {
        num2 = num2.substring(0, num2.length - 1);
        display.textContent = num2.length > 0 ? num2 : "0";
      }
    }
  });
});

function delete_all() {
  display.textContent = "0";
  num1 = "";
  num2 = "";
  final_result = "";
  operator_val = "";
  flag = false;
}

porcentage_btn.addEventListener("click", (e) => {
  if (
    display.textContent !== "" &&
    final_result.length > 0 &&
    num1.length === 0 &&
    num2.length === 0
  ) {
    final_result = porcentage(Number(final_result)).toString();
    display.textContent =
      final_result.length < 9 ? final_result : final_result.substring(0, 9);
  } else if (display.textContent !== "" && num1.length > 0 && !flag) {
    num1 = porcentage(Number(num1)).toString();
    display.textContent = num1.length < 9 ? num1 : num1.substring(0, 9);
  } else if (display.textContent !== "" && num2.length > 0 && flag) {
    num2 = porcentage(Number(num2)).toString();
    display.textContent = num2.length < 9 ? num2 : num2.substring(0, 9);
  }
});

add_subtract_btn.addEventListener("click", (e) => {
  if (
    display.textContent !== "" &&
    final_result.length > 0 &&
    num1.length === 0 &&
    num2.length === 0
  ) {
    final_result = change_sign(final_result).toString();
    display.textContent =
      final_result.length < 9 ? final_result : final_result.substring(0, 9);
  } else if (display.textContent !== "" && num1.length > 0 && !flag) {
    num1 = change_sign(num1).toString();
    display.textContent = num1.length < 9 ? num1 : num1.substring(0, 9);
  } else if (display.textContent !== "" && num2.length > 0 && flag) {
    num2 = change_sign(num2).toString();
    display.textContent = num2.length < 9 ? num2 : num2.substring(0, 9);
  }
});

function change_sign(num) {
  let regex = /^(\-)([1-9]+|[0-9]+\.[0-9]+)/;
  let final_num;
  if (num.match(regex)) {
    final_num = add_subtract(Number(num));
  } else {
    final_num = add_subtract(Number(num));
  }
  return final_num;
}

point.addEventListener("click", (e) => {
  if (num1.length === 0 && !flag) {
    num1 += "0.";
    display.textContent = num1;
  } else if (num1.length > 0 && !flag && num1.indexOf(".") < 0) {
    num1 += point.textContent;
    display.textContent = num1;
  }
  if (num2.length === 0 && flag) {
    num2 += "0.";
    display.textContent = num2;
  } else if (num2.length > 0 && flag && num2.indexOf(".") < 0) {
    num2 += point.textContent;
    display.textContent = num2;
  }
});
