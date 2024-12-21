// Selectors
const display = document.querySelector('.display');
const clearBtn = document.querySelector('.clear');
const backSpaceBtn = document.querySelector('.back-space');
const divideBtn = document.querySelector('.divide');
const sevenBtn = document.querySelector('.seven');
const eightBtn = document.querySelector('.eight');
const nineBtn = document.querySelector('.nine');
const multiplyBtn = document.querySelector('.multiply');
const fourBtn = document.querySelector('.four');
const fiveBtn = document.querySelector('.five');
const sixBtn = document.querySelector('.six');
const subtractBtn = document.querySelector('.subtract');
const oneBtn = document.querySelector('.one');
const twoBtn = document.querySelector('.two');
const threeBtn = document.querySelector('.three');
const addBtn = document.querySelector('.add');
const zeroBtn = document.querySelector('.zero');
const decimalBtn = document.querySelector('.decimal');
const equalsBtn = document.querySelector('.equals');

const numberButtons = [oneBtn, twoBtn, threeBtn, fourBtn, fiveBtn, sixBtn, sevenBtn, eightBtn, nineBtn, zeroBtn, decimalBtn];
const operatorButtons = [addBtn, subtractBtn, divideBtn, multiplyBtn];
let currentInput = '';
let previousInput = '';
let operatorMode = '';

function handleNumberButtonPress(event) {
    currentInput = currentInput + event.target.value;
    display.innerText = currentInput;
}

function handleOperatorButtonPress(event) {
    if (currentInput !== '') {
        previousInput = parseFloat(currentInput);
        currentInput = '';
        operatorMode = event.target.value;
    }
}

function calculateResult() {
    if (currentInput !== '') {
        currentInput = parseFloat(currentInput);
        let result;

        if (operatorMode === '+') {
            result = previousInput + currentInput;
        } else if (operatorMode === '-') {
            result = previousInput - currentInput;
        } else if (operatorMode === '*') {
            result = previousInput * currentInput;
        } else if (operatorMode === '/') {
            result = previousInput / currentInput;
        } else {
            result = currentInput;
        }

        display.innerText = parseFloat(result.toFixed(10));
        previousInput = result;
    }
    
}

function clearFunction() {
    currentInput = '';
    previousInput = '';
    operatorMode = '';
    display.innerText = '0';
}

function backSpaceFunction() {
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, currentInput.length - 1);
        display.innerText = currentInput;
    } else {
        clearFunction();
    };
}

// Event Listeners
clearBtn.addEventListener('click', clearFunction);
backSpaceBtn.addEventListener('click', backSpaceFunction);
numberButtons.forEach(btn => {
    btn.addEventListener('click', handleNumberButtonPress);
});
operatorButtons.forEach(btn => {
    btn.addEventListener('click', handleOperatorButtonPress);
});
equalsBtn.addEventListener('click', calculateResult);