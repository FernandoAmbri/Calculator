const display = document.querySelector(".display");

const numbers = document.querySelectorAll("#number");
const operators = document.querySelectorAll("#operator");

const btnEqual = document.querySelector(".result");
const delete_numbers = document.querySelectorAll("#restart");

const add_subtract_btn = document.querySelector(".subtract-add");
const porcentage_btn = document.querySelector(".porcentage");
const point = document.querySelector(".point");
const zero = document.querySelector(".zero");

let num1 = "";
let num2 = "";
let operator_val = "";
let flag = false;

//Actividades pendientes:
//Al final solucionamos los problemas del igual.
//Al final modificamos el diseño.

//Domingo
//Después refactorizar o mejorar un poco el código.
//Después agregar la funcionalidad del teclado.

porcentage_btn.addEventListener("click", (e) => {
  if (display.textContent !== "" && num1.length > 0 && !flag) {
    num1 = porcentage(Number(num1)).toString();
    display.textContent = num1;
  } else if (display.textContent !== "" && num2.length > 0 && flag) {
    num2 = porcentage(Number(num2)).toString();
    display.textContent = num2;
  } else {
    num1 = porcentage(Number(num1)).toString();
    display.textContent = num1;
  }
});

add_subtract_btn.addEventListener("click", (e) => {
  if (display.textContent !== "" && num1.length > 0 && !flag) {
    num1 = change_sign(num1).toString();
    display.textContent = num1;
  } else if (display.textContent !== "" && num2.length > 0 && flag) {
    num2 = change_sign(num2).toString();
    display.textContent = num2;
  } else {
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

//Es mejor hacerlo separado y después ver una manera de juntar todo
//Primero vamos a solucionar el problema del punto
//Después solucionar el problema del cero
//Después solucionar el problema del igual
//Después mejorar un poco el diseño
//Subir todo a github

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

numbers.forEach((number) => {
  number.addEventListener("click", (e) => {
    if (
      number.textContent !== "+/-" &&
      number.textContent !== "." &&
      number.textContent !== "0"
    ) {
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
    if (operator.textContent !== "%") {
      if (num1.length > 0 && num2.length > 0) {
        show_result();
      } else {
        display.textContent = operator.textContent;
        operator_val = operator.textContent;
        flag = true;
      }
    }
  });
});

function show_result() {
  if (num1.length > 0 && num2.length > 0 && operator_val !== "") {
    result(operator_val, num1, num2);
    num1 = result(operator_val, num1, num2); //Esto no va aquí
    num2 = "";
    operator_val = "";
    flag = true;
  }
}

//Después de la operación o el usuario ingresa un nuevo número o el usuario
//da clic en algún operador, si da clic en el operador, esta a la espera del
//segundo número, sino la calculadora esta a la espera del primer número.

btnEqual.addEventListener("click", () => {
  show_result();
});

function result(operator, number1, number2) {
  let result_operation;
  number1 = Number(num1);
  number2 = Number(num2);
  result_operation = operate(operator, number1, number2).toString();
  if (result_operation.length > 6) {
    result_operation = result_operation.substring(0, 6);
    display.textContent = result_operation;
  } else {
    display.textContent = result_operation;
  }
  return result_operation;
}

delete_numbers.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (button.textContent === "C") {
      delete_all();
    } else if (button.textContent === "CE") {
      if (num1.length > 0) {
        num1 = num1.split("");
        num1.pop();
        num1 = num1.join("");
        display.textContent = num1.length > 0 ? num1 : delete_all();
      }
      if (num2.length > 0) {
        num2 = num2.split("");
        num2.pop();
        num2 = num2.join("");
        display.textContent = num2.length > 0 ? num2 : delete_all();
      }
    }
  });
});

function delete_all() {
  display.textContent = "0";
  num1 = "";
  num2 = "";
  operator_val = "";
  flag = false;
}

function operate(operator, number1, number2) {
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
      }
      value = number1 / number2;
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
