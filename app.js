
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
    a = Number(a)
    b = Number(b)
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
const btnClear = document.getElementById('clear-button')
const btnDelete = document.getElementById('delete-button')
const btnEqual = document.getElementById('equal-button')
const btnDecimal = document.getElementById('decimal-button')
const lastOperationScreen = document.getElementById('lastOperationScreen')
const currentOperationScreen = document.getElementById('currentOperationScreen')

window.addEventListener('keydown', handleKey)
if(btnEqual){
    btnEqual.addEventListener('click', evaluate)
}
if(btnClear){
    btnClear.addEventListener('click', clear)
}
if(btnDelete){
    btnDelete.addEventListener('click', deleteNumber)
}
if(btnDecimal){
    btnDecimal.addEventListener('click', appendPoint)
}


numberButtons.forEach((button) =>
  button.addEventListener('click', () => appendNumber(button.textContent))
)

operatorButtons.forEach((button) =>
  button.addEventListener('click', () => setOperation(button.textContent))
)

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


function appendNumber(number){
    if(currentOperationScreen.textContent === '0' || screenReset){
        resetScreen()
    }
    currentOperationScreen.textContent += number
}

function resetScreen(){
    currentOperationScreen.textContent = ''
    screenReset = false
}

function clear(){
    currentOperationScreen.textContent = '0'
    lastOperationScreen.textContent = ''
    firstOperand = ''
    secondOperand = ''
    currentOperation = null
}

function appendPoint(keyboardPoint){
    if(screenReset) resetScreen()
    if(currentOperationScreen.textContent === '')
        currentOperationScreen.textContent = '0'
    if(currentOperationScreen.textContent.includes('.')) return 
    currentOperationScreen.textContent += '.' 
}

function evaluate(){
    if(currentOperation === null || screenReset) return
    if(currentOperation === '÷' && currentOperationScreen.textContent === '0'){
        alert("You cannot divide by 0!")
        return
    }
    secondOperand= currentOperationScreen.textContent
    currentOperationScreen.textContent = roundResult(operation(currentOperation, firstOperand, secondOperand))
    lastOperationScreen.textContent = `${firstOperand} ${currentOperation} ${secondOperand} =`
    currentOperation = null
}

function roundResult(number){
    return Math.round(number*1000) / 1000
}

function deleteNumber() {
    currentOperationScreen.textContent = currentOperationScreen.textContent
      .toString()
      .slice(0, -1)
  }

function setOperation(operator) {
    if(currentOperation !== null) evaluate()
    firstOperand = currentOperationScreen.textContent
    currentOperation = operator
    lastOperationScreen.textContent = `${firstOperand} ${currentOperation}`
    screenReset = true
}