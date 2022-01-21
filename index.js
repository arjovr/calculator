const container = document.querySelector('.container');
const numbers = document.querySelectorAll('.operator');
const display = document.querySelector('.display');
const acKey = document.querySelector('.ac.extra-key');
const plusminusBtn = document.querySelector('.plus-minus.extra-key');
const backspaceBtn = document.querySelector('.backspace.extra-key');
const operations = document.querySelectorAll('.operation');
const equalBtn = document.querySelector('.equal');
const fmtr = new Intl.NumberFormat(navigator.language, {
    style: 'decimal',
    useGrouping: false,
    minimumFractionDigits: 0,
    maximumSignificantDigits: 10,
    notation: "standard"
});
document.addEventListener('keydown', (e) => {
    if (e.key == 'Escape') {
        clear();
        return;
    }
    if (e.key == 'Backspace') {
        backspace();
        return;
    }
    if (e.key == 'Enter') {
        performOperation();
        return;
    }
    if (Number(e.key) >= 0 || Number(e.key) <= '9' || e.key == '.') {
        numberHandler(e.key);
        return;
    }

    if ('*/+-'.includes(e.key)) {
        const key2op = {
            '*': '×',
            '/': '÷',
            '+': '+',
            '-': '-'
        };
        operationHandler(key2op[e.key]);
    }
});


function performOperation() {
    if (firstOperand && operation) {
        switch (operation) {
            case '×':
                display.textContent = fmtr.format(operate(multiply, firstOperand, display.textContent)).substring(0, 10);
                break;
            case '÷':
                display.textContent = fmtr.format(operate(divide, firstOperand, display.textContent)).substring(0, 10);
                break;
            case '+':
                display.textContent = fmtr.format(operate(add, firstOperand, display.textContent)).substring(0, 10);
                break;
            case '-':
                display.textContent = fmtr.format(operate(substract, firstOperand, display.textContent)).substring(0, 10);
                break;
        }
        firstOperand = display.textContent;
        operation = null;
    }
}

equalBtn.addEventListener('click', performOperation);

function operationHandler(op) {
    performOperation();
    firstOperand = display.textContent;
    enterSecondOperand = true;
    operation = op;
}

operations.forEach(op => {
    op.addEventListener('click', e => {
        operationHandler(e.target.textContent);
    });
});

let firstOperand;
let enterSecondOperand = false;
let operation;

function backspace() {
    display.textContent = display.textContent.slice(0, -1);
    if (display.textContent === '') {
        display.textContent = '0';
    }
}

backspaceBtn.addEventListener('click', backspace);

plusminusBtn.addEventListener('click', (e) => {
    if (display.textContent.charAt(0) == '-') {
        display.textContent = display.textContent.slice(1);
        return;
    }
    display.textContent = '-' + display.textContent;
});

function clear() {
    display.textContent = '0';
    operation = null;
    firstOperand = null;
}

acKey.addEventListener('click', clear);

function numberHandler(key) {
    if ((display.textContent === '0' && key !== '.') || enterSecondOperand) {
        display.textContent = key;
        enterSecondOperand = false;
        return;
    }
    if (key === '.' && display.textContent.includes('.')) {
        return;
    }
    if (display.textContent.length >= 11) {
        return;
    }
    display.textContent += key;
}

numbers.forEach(number => {
    number.addEventListener('click', (e) => {
        numberHandler(e.target.textContent);
    });
})

function add(x, y) {
    return x + y;
}

function substract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    return x / y;
}

function operate(operator, x, y) {
    return operator(+x, +y);
}