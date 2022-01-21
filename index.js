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

operations.forEach(op => {
    op.addEventListener('click', e => {
        performOperation();
        firstOperand = display.textContent;
        enterSecondOperand = true;
        operation = e.target.textContent;
    });
});

let firstOperand;
let enterSecondOperand = false;
let operation;

backspaceBtn.addEventListener('click', (e) => {
    display.textContent = display.textContent.slice(0, -1);
    if (display.textContent === '') {
        display.textContent = '0';
    }

});

plusminusBtn.addEventListener('click', (e) => {
    if (display.textContent.charAt(0) == '-') {
        display.textContent = display.textContent.slice(1);
        return;
    }
    display.textContent = '-' + display.textContent;
});

acKey.addEventListener('click', (e) => {
    display.textContent = '0';
    operation = null;
    firstOperand = null;
});

numbers.forEach(number => {
    number.addEventListener('click', (e) => {
        if ((display.textContent === '0' && e.target.textContent !== '.') || enterSecondOperand) {
            display.textContent = e.target.textContent;
            enterSecondOperand = false;
            return;
        }
        if (e.target.textContent === '.' && display.textContent.includes('.')) {
            return;
        }
        if (display.textContent.length >= 11) {
            return;
        }
        display.textContent += e.target.textContent;
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