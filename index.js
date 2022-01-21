const container = document.querySelector('.container');
const numbers = document.querySelectorAll('.operator');
const display = document.querySelector('.display');
const acKey = document.querySelector('.ac.extra-key');
const plusMinusKey = document.querySelector('.plus-minus.extra-key');

plusMinusKey.addEventListener('click', (e) => {
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
