class Calculator {
    constructor(topDisplay, bottomDisplay) {
        this.topDisplay_div = topDisplay;
        this.bottomDisplay_div = bottomDisplay;
        this.clear();
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operator = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperator(operator) {
        if (this.currentOperand === '' || this.currentOperand === '.') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operator = operator;
        this.previousOperand = this.currentOperand + ' ' + operator;
        this.currentOperand = '';
    }

    compute() {
        let result;
        const prevOp = parseFloat(this.previousOperand);
        const currOp = parseFloat(this.currentOperand);
        if (isNaN(prevOp) || isNaN(currOp)) return;
        switch(this.operator) {
            case '+':
                result = prevOp + currOp;
                break;
            case '-':
                result = prevOp - currOp;
                break;
            case '*':
                result = prevOp * currOp;
                break;
            case '÷':
                result = prevOp / currOp;
                break;
            default:
                return;
        }
        this.currentOperand = result;
        this.operator = undefined;
        this.previousOperand = '';
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        // if there is a decimal place (dp) in our stringNumber, it is split into the digits before and after the dp
        // even if there is no dp, integerDigits will not be undefined. it will be the whole number
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        // if there is no dp, decimalDigits will be undefined (equal null)
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;

        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            // toLocaleString formats a string according to a given language (in this case english)
            integerDisplay = integerDigits.toLocaleString('en', {
            maximumFractionDigits: 0});   
        } 
        // check if there are any decimal digits
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    updateDisplay()  {
        this.bottomDisplay_div.innerText = this.getDisplayNumber(this.currentOperand);
        if (this.operator == null) {
            this.topDisplay_div.innerText = '';
        } else {
            this.topDisplay_div.innerText = this.getDisplayNumber(this.previousOperand);
        }
    }
}

const number_buttons = document.querySelectorAll('[data-number]');
const operator_buttons = document.querySelectorAll('[data-operator]');
const equals_button = document.querySelector('[data-equals]');
const allClear_button = document.querySelector('[data-all-clear]');
const delete_button = document.querySelector('[data-delete]');
const topDisplay_div = document.querySelector('[data-top-display]');
const bottomDisplay_div = document.querySelector('[data-bottom-display]');

const calculator = new Calculator(topDisplay_div, bottomDisplay_div);

number_buttons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
})

operator_buttons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperator(button.innerText);
        calculator.updateDisplay();
    })
})

equals_button.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
})

allClear_button.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
})

delete_button.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
})