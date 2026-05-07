let currentInput = '0';
let previousInput = '';
let operator = null;
let shouldResetScreen = false;

const displayElement = document.getElementById('display');

function updateDisplay() {
    displayElement.innerText = currentInput;
}

function appendNumber(number) {
    if (currentInput === '0' || shouldResetScreen) {
        currentInput = number;
        shouldResetScreen = false;
    } else {
        if (number === '.' && currentInput.includes('.')) return;
        currentInput += number;
    }
    updateDisplay();
}

function setOperator(op) {
    if (operator !== null) {
        calculate();
    }
    previousInput = currentInput;
    operator = op;
    shouldResetScreen = true;
}

function calculate() {
    if (operator === null || shouldResetScreen) return;
    
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    
    if (isNaN(prev) || isNaN(current)) return;
    
    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                alert("Cannot divide by zero");
                allClear();
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }
    
    currentInput = result.toString();
    operator = null;
    shouldResetScreen = true;
    updateDisplay();
}

function allClear() {
    currentInput = '0';
    previousInput = '';
    operator = null;
    shouldResetScreen = false;
    updateDisplay();
}

function clearLast() {
    if (shouldResetScreen) return;
    currentInput = currentInput.slice(0, -1);
    if (currentInput === '' || currentInput === '-') {
        currentInput = '0';
    }
    updateDisplay();
}
