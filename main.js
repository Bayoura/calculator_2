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
        
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperator(operator) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operator = operator;
        this.previousOperand = this.currentOperand /*+ operator;*/
        this.currentOperand = '';
    }

    compute() {

    }

    updateDisplay()  {
        this.bottomDisplay_div.innerText = this.currentOperand;
        this.topDisplay_div.innerText = this.previousOperand;
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