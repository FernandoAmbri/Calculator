const numbers = document.querySelectorAll("#number");
const btnMultiply = document.querySelector(".multiply");

const btnEqual = document.querySelector(".result");
const deleteAll = document.querySelector(".deleteAll");

const display = document.querySelector(".display");
const operators = document.querySelectorAll("#operator");

let num1 = "";
let num2 = "";
let flag = false;
let operator_val = "";

//El usuario hace clic en los números, el display muestra números de hasta 6
//dígitos.
//El usuario solamente puede seguir ingresando números mientras el display
//tenga menos de 6 dígitos o si el usuario no presiona una tecla para realizar
//alguna operación.
//Una vez que el usuario presiona una tecla para hacer alguna operación, se
//muestra el operador en la pantalla y después el usuario debe ingresar el
//segundo número.
//Después si el usuario presiona la tecla igual o alguna otra operación,
//se debe mostrar el resultado. Una vez que el usuario presiona otra tecla para
//hacer otra operación, se realiza la operación pero con el valor previamente
//calculado y el nuevo dígito, nuevamente si el usuario oprime otra tecla para
//hacer otra operación, se realiza la operación con el valor previamente calculado
// y el nuevo dígito.

//El resultado hay que guardarlo en un arreglo.

numbers.forEach((number) => {
  number.addEventListener("click", (e) => {
    if (num1.length < 6 && !flag) {
      num1 += number.textContent.trim();
      display.textContent = num1;
    }
    if (flag && num2.length < 6) {
      num2 += number.textContent.trim();
      display.textContent = num2;
    }
  });
});

operators.forEach((operator) => {
  operator.addEventListener("click", (e) => {
    display.textContent = operator.textContent; //optional
    operator_val = operator.textContent;
    flag = true;
    //el operando debe mostrar el resultado si es que se tienen los dos números
    //y se tiene el operando.
    //Después muestra el resultado y esta a la espera del siguiente número.
    if (operator_val !== "" && num1.length > 0 && num2.length > 0) {
      result(operator_val, num1, num2);
    }
  });
});

btnEqual.addEventListener("click", () => {
  if (num1.length > 0 && num2.length > 0 && operator_val !== "") {
    result(operator_val, num1, num2);
    let another_operation = result(operator_val, num1, num2);
    num1 = another_operation;
    num2 = "";
    flag = true;
  }
});

function result(operator, number1, number2) {
  let result_operation;
  if (flag && num1.length > 0 && num2.length > 0) {
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
  }
  return result_operation;
}

deleteAll.addEventListener("click", (e) => {
  display.textContent = "0";
  num1 = "";
  num2 = "";
  operator_val = "";
});

const operations = {
  add: function (number1, number2) {
    return number1 + number2;
  },
  subtract: function (number1, number2) {
    return number1 - number2;
  },
  multiply: function (number1, number2) {
    return number1 * number2;
  },
  divide: function (number1, number2) {
    if (number1 === 0 || number === 0) {
      return 0;
    }
    return number1 / number2;
  },
};

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
    case "+/-":
      value = add_subtract(number1);
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

function add_subtract(number) {
  return number > 0 ? -1 * number : Math.abs(number);
}
