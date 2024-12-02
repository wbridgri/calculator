/**
 * WHAT DO WE WANT THE CALCULATOR TO DO??
 * define operations
 *      clear
 *      delete (single number)
 *      append number
 *      choose an operation
 *      compute
 *      update display
 */

class Calculator {

    // 1 constructor
    constructor(prevOperText, currOperText) {
        this.prevOperText = prevOperText;
        this.currOperText = currOperText;
        this.clear();
    }

    // 4 appendNumber
    appendNumber(number) {
        if (number === '.' && this.currOperand.includes('.')) return;
        this.currOperand = this.currOperand.toString() + number.toString();

        // console.log(number, this.currOperand)
    }

    // 2 clear
    clear() {
        this.prevOperand = '';
        this.currOperand = '';
        this.operation = undefined;
    }

    // 8 chooseOperation
    // if there's no number, the operation buttons are disabled
    chooseOperation(operation) {
        if(this.currOperand === '') return;
        if(this.prevOperand !== '') {
            this.compute();
        }
        
        this.operation = operation;
        
        this.prevOperand = this.currOperand

        this.currOperand = '';

    }

    // 7 compute
    compute() {
        let computation;

        const prev = parseFloat(this.prevOperand);
        const current = parseFloat(this.currOperand);

        if(isNaN(prev) || isNaN(current)) return;

        switch(this.operation) {
            case '+': 
                computation = prev + current;
                break;
            case '-': 
                computation = prev - current;
                break;
            case '*': 
                computation = prev * current;
                break;
            case '/': 
                computation = prev / current;
                break;
            default:
                return;
        }

        this.currOperand = isFinite(computation) ? computation : "ERROR"
        // this.currOperand = computation;
        this.operation = undefined;
        this.prevOperand = '';
    }


    // 3 delete
    delete() {
        if(this.currOperand == 'ERROR') {
            this.currOperand - '';
        } else {

            this.currOperand = this.currOperand.toString().slice(0 , -1);
        }
    }

    // 6 getDisplayNumber
    getDisplayNumnber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.' [0]));
        const decimalDigits = stringNumber.split('.'[1]);

        let ingterDisplay;
        if(isNaN(integerDigits)) {
            ingterDisplay = '';
        }else {
            ingterDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0});
        }

        return decimalDigits;
    }

    // 5 update display
    updateDisplay() {
        this.currOperText.innerText = this.getDisplayNumnber(this.currOperand);

        if(this.operation != null) {
            this.prevOperText.innerText = `${this.getDisplayNumnber(this.prevOperand)} ${this.operation}`
        }else {
            this.prevOperText.innerText = '';
        }
    }
}

// 2 set constants to access buttons
// enclose attribute-value pairs in brackets
const numBtn = document.querySelectorAll('[data-number]');
// console.log(numBtn)
const operBtn = document.querySelectorAll('[data-operation');

const equalBtn = document.querySelector('[data-equals]');

const deleteBtn = document.querySelector('[data-delete]');

const allClearBtn = document.querySelector('[data-all-clear]');

const prevOperText = document.querySelector('[data-prev-operand]');

const currOperText = document.querySelector('[data-curr-operand]');

const calculator = new Calculator(prevOperText, currOperText);

// 3 addEvenlistener to buttons
numBtn.forEach(button => {
    button.addEventListener('click', ()=> {
        // console.log(button.innerText);
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
});

operBtn.forEach(button => {
    button.addEventListener('click', ()=> {
        // console.log(button.innerText);
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
        
    })
});

equalBtn.addEventListener('click' , ()=> {
    // console.log(equalBtn.innerText);
    calculator.compute();
    calculator.updateDisplay();
});

allClearBtn.addEventListener('click' , ()=> {
    // console.log(allClearBtn.innerText);
    calculator.clear();
    calculator.updateDisplay();
});

deleteBtn.addEventListener('click' , ()=> {
    // console.log(deleteBtn.innerText);
    calculator.delete();
    calculator.updateDisplay();

});
