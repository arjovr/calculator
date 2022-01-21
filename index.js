const container = document.querySelector('.container');
const numbers = document.querySelectorAll('.operator');
const display = document.querySelector('.display');
const acKey = document.querySelector('.ac.extra-key');
const plusminusBtn = document.querySelector('.plus-minus.extra-key');
const backspaceBtn = document.querySelector('.backspace.extra-key');

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
});

numbers.forEach(number => {
    number.addEventListener('click', (e) => {
        if (display.textContent === '0' && e.target.textContent !== '.') {
            display.textContent = e.target.textContent;
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