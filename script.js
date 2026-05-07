let currentInput = '0';
let previousInput = '';
let operator = null;
let shouldResetScreen = false;
let memory = 0;
let history = [];

const displayElement = document.getElementById('display');
const expressionElement = document.getElementById('expression');
const memoryIndicator = document.getElementById('memoryIndicator');
const historyListElement = document.getElementById('historyList');

function updateDisplay() {
    let displayValue = currentInput;
    if (displayValue.length > 12) {
        try {
            const num = parseFloat(displayValue);
            if (!isNaN(num)) {
                displayValue = num.toExponential(5);
            }
        } catch (e) {}
    }
    displayElement.innerText = displayValue;
    memoryIndicator.style.visibility = memory !== 0 ? 'visible' : 'hidden';
}

function updateExpression() {
    if (operator && previousInput) {
        const opSymbol = operator === '*' ? '×' : operator;
        expressionElement.innerText = `${previousInput} ${opSymbol}`;
    } else {
        expressionElement.innerText = '';
    }
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
    
    const opSymbol = operator === '*' ? '×' : operator;
    
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
    
    const resultStr = result.toString();
    const historyEntry = `${previousInput} ${opSymbol} ${currentInput} = ${resultStr}`;
    addToHistory(historyEntry);
    
    currentInput = resultStr;
    operator = null;
    shouldResetScreen = true;
    updateExpression();
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

function memoryAdd() {
    const current = parseFloat(currentInput);
    if (!isNaN(current)) {
        memory += current;
        updateDisplay();
    }
}

function memorySubtract() {
    const current = parseFloat(currentInput);
    if (!isNaN(current)) {
        memory -= current;
        updateDisplay();
    }
}

function memoryRecall() {
    currentInput = memory.toString();
    shouldResetScreen = true;
    updateDisplay();
}

function memoryClear() {
    memory = 0;
    updateDisplay();
}

function addToHistory(entry) {
    history.unshift(entry);
    if (history.length > 20) {
        history.pop();
    }
    renderHistory();
}

function renderHistory() {
    historyListElement.innerHTML = history.map(entry => 
        `<div class="history-item">${entry}</div>`
    ).join('');
}

function clearHistory() {
    history = [];
    renderHistory();
}

document.addEventListener('keydown', (e) => {
    const key = e.key;
    
    if (key >= '0' && key <= '9') {
        appendNumber(key);
    } else if (key === '.') {
        appendNumber('.');
    } else if (key === '+') {
        setOperator('+');
    } else if (key === '-') {
        setOperator('-');
    } else if (key === '*') {
        setOperator('*');
    } else if (key === '/') {
        e.preventDefault();
        setOperator('/');
    } else if (key === 'Enter' || key === '=') {
        e.preventDefault();
        calculate();
    } else if (key === 'Backspace') {
        clearLast();
    } else if (key === 'Escape') {
        allClear();
    } else if (key.toLowerCase() === 'c' && e.ctrlKey) {
        allClear();
    }
});
