let runningTotal = 0, buffer="0", previousOperator;

const screen = document.querySelector('.screen');
function buttonClick(value)
{
    if(isNaN(value))    handlesymbol(value);
    else handleNumber(value);
    screen.innertext = buffer;
}
function handlesymbol(symbol)
{
    switch(symbol){
        case 'AC':
                buffer = '0';
                runningTotal = 0;
            break;
            case '=':
                if(!previousOperator) return 
                flushOperation(parseInt(buffer));
                previousOperator = null;
                buffer = runningTotal;
                runningTotal = 0;
                break;
            case 'DEL':
                if(buffer.length===1) buffer='0';
                else buffer = buffer.toString(0, buffer.length-1);
                break;
                case '+':
                case '-':
                case '×':
                case '÷':
                case '%': 
            }
}
function handleMath(symbol)
{
    if(buffer === '0') return;
    const intBuffer = parseInt(buffer);
    if(runningTotal === 0) runningTotal = intBuffer;
    else flushOperation(intBuffer);
    previousOperator = symbol;
    buffer = '0';
}

function flushOperation(intBuffer)
{
    if(previousOperator==='+') runningTotal += intBuffer;
    else if(previousOperator==='-') runningTotal -= intBuffer;
    else if(previousOperator==='×') runningTotal *= intBuffer;
    else if(previousOperator==='÷') runningTotal /= intBuffer;
    else if(previousOperator==='%') runningTotal %= intBuffer;
}

function init()
{
    document.querySelector('.calc-buttons').addEventListener('click', function(event){
        bufferClick(event.target.innerText);
    })
}
init();