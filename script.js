// Selectors
const calculator = {
    display: document.querySelector('.display'),
    buttons: {
        numbers: Array.from(document.querySelectorAll('.number')),
        operators: Array.from(document.querySelectorAll('.operator')),
        clear: document.querySelector('.clear'),
        backspace: document.querySelector('.back-space'),
        equals: document.querySelector('.equals'),
        decimal: document.querySelector('.decimal')
    }
};

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

// Used later to create event listeners with loop
const numberButtons = [oneBtn, twoBtn, threeBtn, fourBtn, fiveBtn, sixBtn, sevenBtn, eightBtn, nineBtn, zeroBtn, decimalBtn];
const operatorButtons = [addBtn, subtractBtn, divideBtn, multiplyBtn];

// memory
let currentInput = '';
let previousInput = '';
let operatorMode = '';

function handleNumberButtonPress(event) {
    currentInput = currentInput + event.target.value;
    display.innerText = currentInput;
}

function handleOperatorButtonPress(event) {
    // prevents NaN from multiple clicks on operator
    if (currentInput !== '') {
        previousInput = parseFloat(currentInput);
        currentInput = '';
        operatorMode = event.target.value;
    }
}

function calculateResult() {
    // prevents NaN from just pressing '='
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
        // prevents backspace to nothing on screen - just defaults to zero
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

// Event Listeners
calculator.buttons.numbers.forEach(btn => {
    btn.addEventListener('click', (event) => {
        try {
            handleNumber(event.target.value);
        } catch (error) {
            console.error('Error handling number', error);
            reset();
        }
    });
});

calculator.buttons.operators.forEach(btn => {
    btn.addEventListener('click', (event) => {
        try {
            handleOperatorButtonPress(event.target.value);
        } catch (error) {
            console.error('Error handling operator');
            reset();
        }
    });
});

calculator.buttons.clear.addEventListener('click', reset);
calculator.buttons.backspace.addEventListener('click', backspace);
calculator.buttons.equals.addEventListener('click', calculate);

// Keyboard support
document.addEventListener('keydown', handleKeyboardInput);

function handleKeyboardInput(event) {
    if (event.key.match(/[0-9.]/)) {
        handleNumber(event.key);
    } else if (event.key.match(/[\+\-\*/]/)) {
        handleOperator(event.key);
    } else if (event.key === 'Enter') {
        calculate();
    } else if (event.key === 'Backspace')
}