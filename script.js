class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    clear() {  // It can create clear all tha value in display screen 
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined

    }

    delete() {  // it can delete tha value is one by one 
        this.currentOperand = this.currentOperand.toString().slice(0, -1)  // this can delete last value is one by one to the current operand
    }

    appendNumber(number) { 
        if(number === '.' && this.currentOperand.includes('.')) {   // This if statement can display only one dot operation
            return number
        }
        this.currentOperand = this.currentOperand.toString() + number.toString()  //This add continue value in current operand 
    }

    chooseOperation(operation) {
        if(this.currentOperand === '') {
            return
        }
        if(this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute() {  // it can create to perform operations
        var computation
        var prev = parseFloat(this.previousOperand)
        var current = parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(current)) {
            return
        }
        switch(this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '×':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            default:
                return    
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''

    }

    getDisplayNumber(number) {
        var stringNumber = number.toString()
        var integerDigits = parseFloat(stringNumber.split('.')[0])  // it can display after the dot operation
        var decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }

    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = 
        this.getDisplayNumber(this.currentOperand)
        if(this.operation != null) {
            this.previousOperandTextElement.innerText = 
            `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`   // it can display the previous operand and operation
        } else {
            this.previousOperandTextElement.innerText = ''
        }
        
    }
}




var numberButtons = document.querySelectorAll('[data-number]')      // It can import tha class in html and declare variable 
var operationButtons = document.querySelectorAll('[data-operation]')
var equalsButton = document.querySelector('[data-equals]')
var deleteButton = document.querySelector('[data-delete]')
var allClearButton = document.querySelector('[data-all-clear]')
var previousOperandTextElement = document.querySelector('[data-previous-operand]')
var currentOperandTextElement = document.querySelector('[data-current-operand]')

var calculator = new Calculator(previousOperandTextElement,currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click',() => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click',() => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})