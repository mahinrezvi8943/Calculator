let runningTotal = 0, buffer = "0", previousOperator;

const screen = document.querySelector('.screen');

function buttonClick(value) {
    if (isNaN(value)) {
        handlesymbol(value);
    } else {
        handleNumber(value);
    }
    screen.innerText = buffer;
}

function handleNumber(value) {
    if (buffer === '0') {
        buffer = value;
    } else {
        buffer += value;
    }
}

function handlesymbol(symbol) {
    switch (symbol) {
        case 'AC':
            buffer = '0';
            runningTotal = 0;
            break;
        case '=':
            if (!previousOperator) return;
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = runningTotal.toString();
            runningTotal = 0;
            break;
        case 'DEL':
            if (buffer.length === 1) buffer = '0';
            else buffer = buffer.substring(0, buffer.length - 1);
            break;
        case '+':
        case '-':
        case '×':
        case '÷':
        case '%':
            handleMath(symbol);
            break;
        default:
            break;
    }
}

function handleMath(symbol) {
    const intBuffer = parseFloat(buffer);
    if (isNaN(intBuffer)) return;
    
    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer);
    }
    previousOperator = symbol;
    buffer = '0';
}

function flushOperation(intBuffer) {
    if (previousOperator === '+') runningTotal += intBuffer;
    else if (previousOperator === '-') runningTotal -= intBuffer;
    else if (previousOperator === '×') runningTotal *= intBuffer;
    else if (previousOperator === '÷') runningTotal /= intBuffer;
    else if (previousOperator === '%') runningTotal %= intBuffer;
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.calc-buttons').addEventListener('click', function (event) {
        buttonClick(event.target.innerText);
    })
});
