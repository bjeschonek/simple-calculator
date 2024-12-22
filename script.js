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

// Set initial memory
let currentInput = '';
let previousInput = '';
let operatorMode = '';

function reset() {
    currentInput = '';
    previousInput = '';
    operatorMode = '';
    updateDisplay('0');
}

function updateDisplay(value) {
    calculator.display.innerText = value;
}

function handleNumber(value) {
    // Prevent multiple decimals
    if (value === '.' && currentInput.includes('.')) return;

    // Prevent overflow
    if (currentInput.length > 10) return;

    currentInput += value;
    updateDisplay(currentInput);
}

function handleOperator(operator) {
    if (currentInput === '' && previousInput === '') return;

    if (currentInput !== '') {
        if (previousInput !== '') {
            calculate();
        } else {
            previousInput = currentInput;
        }
    }

    operatorMode = operator;
    currentInput = '';
}

function calculate() {
    if (currentInput === '' || previousInput === '') return;

    const current = parseFloat(currentInput);
    const previous = parseFloat(previousInput);
    let result;

    try {
        switch (operatorMode) {
            case '+':
                result = previous + current;
                break;
            case '-': 
                result = previous - current;
                break;
            case '*':
                result = previous * current;
                break;
            case '/':
                if (current === 0) throw new Error('Cannot divide by zero');
                result = previous / current;
                break;
            default:
                return;
        }

        // Handle float precision
        result = Number(result.toFixed(8));

        // Handle result overflow
        if (!Number.isFinite(result)) {
            throw new Error('Result too large');
        }

        updateDisplay(result);
        previousInput = result.toString();
        currentInput = '';
    } catch (error) {
        updateDisplay(error.message);
    }
}

function backspace() {
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(-1);
        updateDisplay(currentInput);
    } else {
        reset();
    }
}

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
            handleOperator(event.target.value);
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
    } else if (event.key === 'Backspace') {
        backspace();
    } else if (event.key === 'Escape') {
        reset();
    }
}