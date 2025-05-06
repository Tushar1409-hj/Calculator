let currentOperand = '';
let previousOperand = '';
let operation = undefined;
let resetScreen = false;

const currentOperandElement = document.getElementById('current-operand');
const previousOperandElement = document.getElementById('previous-operand');

function appendNumber(number) {
    if (currentOperand === '0' || resetScreen) {
        currentOperand = '';
        resetScreen = false;
    }
    currentOperand += number;
    updateDisplay();
}

function appendDecimal() {
    if (resetScreen) {
        currentOperand = '0';
        resetScreen = false;
    }
    if (currentOperand === '') {
        currentOperand = '0';
    }
    if (currentOperand.includes('.')) return;
    currentOperand += '.';
    updateDisplay();
}

function appendOperator(operator) {
    if (currentOperand === '' && previousOperand === '') return;

    if (currentOperand === '') {
        operation = operator;
        updateDisplay();
        return;
    }

    if (previousOperand !== '') {
        calculate();
    }

    operation = operator;
    previousOperand = currentOperand;
    currentOperand = '';
    updateDisplay();
}

function calculate() {
    if (previousOperand === '' || currentOperand === '' || operation === undefined) return;

    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);

    if (isNaN(prev) || isNaN(current)) return;

    switch (operation) {
        case '+':
            computation = prev + current;
            break;
        case '−':
        case '-':
            computation = prev - current;
            break;
        case '×':
        case '*':
            computation = prev * current;
            break;
        case '÷':
        case '/':
            computation = prev / current;
            break;
        default:
            return;
    }

    currentOperand = computation.toString();
    operation = undefined;
    previousOperand = '';
    resetScreen = true;
    updateDisplay();
}

function clearAll() {
    currentOperand = '';
    previousOperand = '';
    operation = undefined;
    updateDisplay();
}

function deleteLastChar() {
    currentOperand = currentOperand.slice(0, -1);
    if (currentOperand === '') currentOperand = '0';
    updateDisplay();
}

function updateDisplay() {
    currentOperandElement.textContent = currentOperand || '0';

    if (operation != null) {
        previousOperandElement.textContent =
            `${previousOperand} ${operation}`;
    } else {
        previousOperandElement.textContent = '';
    }
}

// Keyboard support
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') appendNumber(e.key);
    else if (e.key === '.') appendDecimal();
    else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        const operators = { '+': '+', '-': '−', '*': '×', '/': '÷' };
        appendOperator(operators[e.key]);
    }
    else if (e.key === 'Enter' || e.key === '=') calculate();
    else if (e.key === 'Escape') clearAll();
    else if (e.key === 'Backspace') deleteLastChar();
});

// Initialize display
updateDisplay();