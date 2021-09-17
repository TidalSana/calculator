const numbers = document.querySelectorAll(".digit");
const operator = document.querySelectorAll(".operator");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousOperation = document.querySelector("[data-previous-operand]");
const currentOperation = document.querySelector("[data-current-operand]");

let calculator = {
    firstOperand: 0, 
    symbol: null, 
    secondOperand: 0
};

let operations = {
    sum: 0,
    add(...args){
        sum = 0; 
        sum = args.reduce((a, b) => a + b);
        return sum; 
    },
    subtract(...args) {
        sum = 0;
        sum = args.reduce((a, b) => a - b);  
        return sum;
    },
    multiply(...args) {
        sum = 0;
        sum = args.reduce((a, b) => a * b);
        return sum;  
    },
    divide(...args) {
        sum = 0; 
        sum = args.reduce((a, b) => a / b);
        return sum;
    }
};

let clear = function() {
    calculator.firstOperand = 0; 
    calculator.symbol = null; 
    calculator.secondOperand = 0; 
    currentOperation.innerText = "";
    previousOperation.innerText = "";
};
let deleteNumber = function () {
    let a = document.querySelector("[data-current-operand]");
    const deleteText = a.innerHTML.split('');
    deleteText.pop(); 
    // we make the div = to the array and convert array to string -1 on the end'
    if (!deleteText == 0) {
        a.innerHTML = deleteText.join('');
        // how do we check if the currentopreation is not less 1 < ?
        //we make the firstOP equal to content within the div (make it a number too)
        calculator.firstOperand = parseInt(a.innerHTML); 
    } else {
        return;
    }
};

let updateNumber = function(number) {
    // if no symbol and no secondOP run this:
    if(calculator.symbol === null && calculator.secondOperand === 0) {
        currentOperation.innerText += number.target.value;
        calculator.firstOperand = parseInt(currentOperation.textContent);
    }
    // if firstOP is a number and symbol is there then run this:
    if(typeof calculator.firstOperand === 'number' && typeof calculator.symbol === 'string') {
       // if secondOP is 0, then trun this:
        if(calculator.secondOperand === 0) {
           currentOperation.innerText = "";
       }
       currentOperation.innerText += number.target.value;
       calculator.secondOperand = parseInt(currentOperation.textContent);
       previousOperation.innerText += number.target.value;
    }
};

let updateOperator = function(symbol) { 
    // if there is a firstOP and there is no symbol, add a symbol to the display
    if(typeof calculator.firstOperand === 'number' && calculator.symbol === null) {
        if(calculator.secondOperand === 0) {
            previousOperation.innerText = "";
        }
        calculator.symbol = symbol.target.value;
        previousOperation.innerText += calculator.firstOperand;
        previousOperation.innerText += symbol.target.value;
    }
};

let operate = function(sign) {
    if(typeof calculator.firstOperand === 'number' 
    && typeof calculator.symbol === 'string' 
    && typeof calculator.secondOperand === 'number' ) {
        previousOperation.innerText += sign.target.value;
        if(calculator.symbol === '+') {
            currentOperation.innerText = operations.add(calculator.firstOperand, calculator.secondOperand);
            calculator.firstOperand = parseInt(currentOperation.textContent);
            calculator.symbol = null;
            calculator.secondOperand = 0;
        } else if(calculator.symbol === '-') {
            currentOperation.innerText = operations.subtract(calculator.firstOperand, calculator.secondOperand);
            calculator.firstOperand = parseInt(currentOperation.textContent);
            calculator.symbol = null;
            calculator.secondOperand = 0;
        } else if(calculator.symbol === 'x') {
            currentOperation.innerText = operations.multiply(calculator.firstOperand, calculator.secondOperand);
            calculator.firstOperand = parseInt(currentOperation.textContent);
            calculator.symbol = null;
            calculator.secondOperand = 0;
        } else if(calculator.symbol === '÷') {
            currentOperation.innerText = operations.divide(calculator.firstOperand, calculator.secondOperand);
            calculator.firstOperand = parseInt(currentOperation.textContent);
            calculator.symbol = null;
            calculator.secondOperand = 0;
        }
    } else {
        return;
    }
};

//listen for number buttons
numbers.forEach(button => {
    button.addEventListener("click", updateNumber);
})
//listen for operator buttons
operator.forEach(button => {
    button.addEventListener("click", updateOperator);
})
//listen for equal button
equalsButton.addEventListener("click", operate); 
//listen for clear button 
allClearButton.addEventListener("click", clear);
//listen for delete button 
deleteButton.addEventListener("click", deleteNumber);

