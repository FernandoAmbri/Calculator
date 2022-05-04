const numbers = document.querySelectorAll("#number");

const btnEqual = document.querySelector(".result");
const deleteAll = document.querySelector(".deleteAll");

const display = document.querySelector(".display");
const operators = document.querySelectorAll("#operator");

const add_subtract_btn = document.querySelector(".subtract-add");

let num1 = "";
let num2 = "";
let flag = false;
let operator_val = "";

//Llegando de la escuela, vas a mejorar la lógica para el operador +/-
//Después vas a realizar la lógica del operador porciento.
//Después vas a mejorar el diseño.

//Después refactorizar o mejorar un poco el código.
//Después agregar la funcionalidad del teclado.

add_subtract_btn.addEventListener("click", (e) => {
  if (display.textContent !== "" && num1.length > 0 && !flag) {
    num1 = change_sign(num1).toString();
    display.textContent = num1;
  } else if (display.textContent !== "" && num2.length > 0 && flag) {
    num2 = change_sign(num2).toString();
    display.textContent = num2;
  } else if (display.textContent !== "" && num1.length > 0 && flag) {
    num1 = change_sign(num1).toString();
    display.textContent = num1;
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

numbers.forEach((number) => {
  number.addEventListener("click", (e) => {
    if (number.textContent !== "+/-") {
      if (num1.length < 6 && !flag) {
        num1 += number.textContent.trim();
        display.textContent = num1;
      }
      if (num2.length < 6 && flag) {
        num2 += number.textContent.trim();
        display.textContent = num2;
      }
    }
  });
});

operators.forEach((operator) => {
  operator.addEventListener("click", (e) => {
    if (operator_val !== "" && num1.length > 0 && num2.length > 0) {
      show_result();
      operator_val = operator.textContent;
    } else {
      display.textContent = operator.textContent;
      operator_val = operator.textContent;
      flag = true;
    }
  });
});

function show_result() {
  if (num1.length > 0 && num2.length > 0 && operator_val !== "") {
    result(operator_val, num1, num2);
    num1 = result(operator_val, num1, num2);
    num2 = "";
    operator_val = "";
    flag = true;
  }
}

btnEqual.addEventListener("click", () => {
  show_result();
});

function result(operator, number1, number2) {
  let result_operation;
  number1 = Number(num1);
  number2 = Number(num2);
  result_operation = operate(operator, number1, number2).toString();
  let show = "";
  if (result_operation.length > 6) {
    for (let i = 0; i < 7; i++) {
      show += result_operation[i];
    }
    display.textContent = show;
  } else {
    display.textContent = result_operation;
  }
  return result_operation;
}

deleteAll.addEventListener("click", (e) => {
  display.textContent = "0";
  num1 = "";
  num2 = "";
  operator_val = "";
  flag = false;
});

//Switch to an object
function operate(operator, number1, number2) {
  let value;
  switch (operator) {
    case "+":
      value = add(number1, number2);
      break;
    case "-":
      value = subtract(number1, number2);
      break;
    case "*":
      value = multiply(number1, number2);
      break;
    case "/":
      value = divide(number1, number2);
      break;
    case "%":
      value = porcentage(number1);
      break;
  }
  return value;
}

function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  if (num1 === 0 || num2 === 0) {
    return 0;
  }
  return num1 / num2;
}

function porcentage(num) {
  return num / 100;
}

function add_subtract(number) {
  return number > 0 ? -1 * number : Math.abs(number);
}
