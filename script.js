let firstOperand = '';
let secondOperand = '';
let selectedOperator = null;

const displayPresent = document.querySelector(".displayPresent");
displayPresent.textContent= '0';
const displayResult = document.querySelector(".displayResult");

const inputCommands = document.querySelectorAll('button');
inputCommands.forEach(button => button.addEventListener('click', ()=>commands(button.id)));

window.addEventListener('keydown', keyboardInput);

const numbers = document.querySelectorAll('#num');
numbers.forEach(button => button.addEventListener('click' , ()=>{
    getNumbers(button.textContent);
}));

const getOperators = document.querySelectorAll('.operator');
getOperators.forEach(button => button.addEventListener('click' , ()=>{
    setOperation(button.textContent);
}));

function getNumbers(number){
    if(displayPresent.textContent === '0'){
        displayPresent.textContent = '';
    }
    displayPresent.textContent += number;
}

function commands(command){
    if(command ==='clear'){
        displayPresent.textContent = '0';
        displayResult.textContent = '';
        firstOperand = '';
        selectedOperator = null;
        secondOperand = '';
    }else if(command === 'delete'){
        displayPresent.textContent = displayPresent.textContent.toString().slice(0, -1);
    }else if(command === '='){
        displayResult.textContent = evaluate();
    }
}

function setOperation(operator){
    if(selectedOperator !== null) evaluate();
    firstOperand = displayPresent.textContent;
    selectedOperator = operator;
    displayResult.textContent = `${firstOperand} ${selectedOperator}`;
    displayPresent.textContent = '0';
}

function evaluate(){
    secondOperand = displayPresent.textContent;
    displayPresent.textContent = roundResult(process(selectedOperator, firstOperand, secondOperand));
    displayResult.textContent = `${firstOperand} ${selectedOperator} ${secondOperand} =`; 
    selectedOperator = null;
    return displayResult.textContent;

}

function keyboardInput(e){
    if(e.key >=0 && e.key <= 9 || e.key === '.') getNumbers(e.key);
    if(e.key === 'Enter') evaluate();
    if(e.key === 'Backspace') commands('delete');
    if(e.key === 'Escape') commands('clear');
    if(e.key === '*' || e.key === '/' || e.key === '+' || e.key === '-') setOperation(convertKeyboardOperator(e.key));
}

function convertKeyboardOperator(keyboardOperator){
    if(keyboardOperator === '*') return 'x';
    if(keyboardOperator === '/') return '÷';
    if(keyboardOperator === '+') return '+';
    if(keyboardOperator === '-') return '-';
}

function roundResult(num){
    return (Math.round(num * 1000) / 1000);
}

function add(a, b){
    return a+b;
}
function subtract(a, b){
    return a-b;
}
function multiply(a, b){
    return a*b;
}
function divide(a, b){
    return a/b;
}
function percentage(a,b){
    return (a/100)*b;
}

function process(operator, a, b){
    a = Number(a);
    b = Number(b);
    switch (operator){
        case '+':
            return add(a,b);
        case '-':
            return subtract(a,b);
        case 'x':
            return multiply(a,b);
        case '÷':
            return divide(a,b);
        case '%':
            return percentage(a,b);
        default:
            return null;           
    }
}

