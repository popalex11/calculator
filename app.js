
let firstOperand = ''
let secondOperand = ''
let currentOperation = null
let screenReset = false


const add = function(a,b){
     if(!b){
        return a
     } else {
        return Number(a)+Number(b)
     }
}

const substract = function(a,b){
    if(!b){
        return a
    } else {
        return Number(a)-Number(b)
    }
}

const multiply = function(a,b){
    if(a==0||b==0){
        return 0
    }
    if(!b){
        return a
    }else {
        return a*b
    }
}

const divide = function(a,b){
    return a/b
}

const operation = function(operator,a,b){
    switch(operator){
        case "+":
            return add(a,b)
            break
        case "-":
            return substract(a,b)
            break
        case "×":
            return multiply(a,b)
            break
        case "÷":
            if(b===0) return null 
            else return divide(a,b)
            break
        default:
            return null
    }
}


const numberButtons = document.querySelectorAll('[data-number]')
const operatorButtons = document.querySelectorAll('[data-operator')
const btnClear = document.getElementsByClassName('clear-button')
const btnDelete = document.getElementsByClassName('delete-button')
const btnEqual = document.getElementsByClassName('equal-button')
const btnDecimal = document.getElementsByClassName('decimal-button')
const lastOperationScreen = document.getElementsByClassName('lastOperation')
const currentOperationScreen = document.getElementsByClassName('currentOperation')




if(currentOperationScreen) {
    currentOperationScreen.innerHTML = "123 + 123 * 22"
}


function handleKey(e){
    if(e.key >= 0 && e.key <= 9) appendNumber(e.key)
    if(e.key === '.') appendPoint()
    if(e.key === '='||e.key==="Enter") evaluate()
    if(e.key === 'Backspace') deleteNumber()
    if(e.key === 'Escape') clear()
    if(e.key === '+'|| e.key === '-'|| e.key === '*'|| e.key === '/') setOperation(convertOperator(e.key))
}

function convertOperator(keyboardOperator) {
    if (keyboardOperator === '/') return '÷'
    if (keyboardOperator === '*') return '×'
    if (keyboardOperator === '-') return '−'
    if (keyboardOperator === '+') return '+'
}
