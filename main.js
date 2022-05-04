const display = document.querySelector(".display");

const numbers = document.querySelectorAll("#number");
const operators = document.querySelectorAll("#operator");

const btnEqual = document.querySelector(".result");
const delete_numbers = document.querySelectorAll("#restart");

const add_subtract_btn = document.querySelector(".subtract-add");
const porcentage_btn = document.querySelector(".porcentage");
const point = document.querySelector(".point");

let num1 = "";
let num2 = "";
let operator_val = "";
let flag = false;

//Actividades pendientes:

//Agrega el botón de borrar un dígito.
//Falta solucionar el problema de que el 0 debe ir después de un número no antes,
//el cero no puede ir a la izquierda si no es número con punto decimal.
//El cero no puede ir a la izquierda
//Al final solucionamos los problemas del igual y del 0.
//Al final modificamos el diseño.
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

point.addEventListener("click", (e) => {
  if (num1.length === 0) {
    num1 += "0.";
    display.textContent = num1;
  } else if (num2.length === 0) {
    num2 += "0.";
    display.textContent = num2;
  }
});

numbers.forEach((number) => {
  number.addEventListener("click", (e) => {
    if (number.textContent !== "+/-") {
      if (num1.length < 6 && !flag) {
        if (number.textContent === "." && num1.indexOf(".") > 0) {
          display.textContent = num1.length > 0 ? num1 : "0";
        } else {
          num1 += number.textContent.trim();
          display.textContent = num1;
        }
      }
      if (num2.length < 6 && flag) {
        if (number.textContent === "." && num2.indexOf(".") > 0) {
          display.textContent = num2.length > 0 ? num2 : "0";
        } else {
          num2 += number.textContent.trim();
          display.textContent = num2;
        }
      }
    }
  });
});

operators.forEach((operator) => {
  operator.addEventListener("click", (e) => {
    if (operator.textContent !== "%") {
      if (operator_val !== "" && num1.length > 0 && num2.length > 0) {
        show_result();
        operator_val = operator.textContent;
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
    num1 = result(operator_val, num1, num2);
    num2 = "";
    operator_val = "";
    flag = true;
  }
}

/* 
Cuando tú haces una operación y muestras el resultado con el botón igual, 
se muestra el resultado, pero si oprimes otro número y después la operación, 
no se realiza la operación como tal, más bien se concatenan los números. 

El valor de num1 se tiene que borrar y comenzar desde cero. 
*/

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

delete_numbers.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (button.textContent === "C") {
      delete_all();
    } else {
      if (num1.length > 0) {
        delete_number(num1);
      }
      if (num2.length > 0) {
        delete_number(num2);
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

function delete_number(num) {
  if (num.length > 0) {
    num = num.split("").pop().join("");
    display.textContent = num;
  }
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
