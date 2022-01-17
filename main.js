class Calculator {
    constructor(topDisplay, bottomDisplay) {
        this.topDisplay_div = topDisplay;
        this.bottomDisplay_div = bottomDisplay;
    }

    clear() {
        this.bottomDisplay_div = '';
        this.topDisplay_div = '';
        this.currentOperator = undefined;
    }

    delete() {
        
    }

    appendNumber(number) {
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperator(operator) {

    }

    compute() {

    }

    updateDisplay()  {
        this.bottomDisplay_div.innerText = this.currentOperand;

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