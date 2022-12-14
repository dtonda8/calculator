const buttons = document.querySelectorAll('button')
const displayCurrentDiv = document.getElementById('curr')
const displayPreviousDiv = document.getElementById('prev')
const NUMBERS ='1234567890.';
const OPERATIONS = '+-*/';

// key operations 
function add(n1, n2) {
    return Number(n1) + Number(n2)
}

function minus(n1, n2) {
    return Number(n1) - Number(n2)
}

function times(n1, n2) {
    return Number(n1) * Number(n2)
}

function divide(n1, n2) {
    return Number(n1) / Number(n2)
}

buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        operate(e.target.textContent)
    })
})

document.addEventListener('keydown', function(event) {
    if ((NUMBERS + OPERATIONS).includes(event.key) || event.key === 'Enter') {
        operate(event.key);
    }
});

let n1 = null;
let currentOperation = null;
let n2 = null;

const operation = {
    '+': add,
    '-': minus,
    '*': times,
    '/': divide
}

function operate(key) {
    if (key === 'AC') {
        n1 = null;
        currentOperation = null;
        n2 = null;
        displayCurrentDiv.textContent = '';
        displayPreviousDiv.textContent = '';

    } else if (!(n1) && !(currentOperation) && NUMBERS.includes(key) ) {
        n1 = key
        displayCurrentDiv.textContent = n1;

    } else if (n1 && !(n2) && !(currentOperation) && NUMBERS.includes(key)) {
        n1 += key
        displayCurrentDiv.textContent = n1;

    } else if (n1 && !(n2) && OPERATIONS.includes(key)) {
        currentOperation = key;
        displayPreviousDiv.textContent = `${n1} ${currentOperation}`;

    } else if (n1 && currentOperation && !(n2) && key !== 'C') {
        n2 = key
        displayCurrentDiv.textContent = n2;

    } else if (n1 && currentOperation && n2 && NUMBERS.includes(key)) {
        n2 += key
        displayCurrentDiv.textContent = n2;

    } else if ('=Enter'.includes(key) && n2) {
        let result = operation[currentOperation](n1, n2);
        displayPreviousDiv.textContent = `${n1} ${currentOperation} ${n2} =`;
        displayCurrentDiv.textContent = result;

        n1 = result;
        n2 = null;
        currentOperation = null;

    } else if (OPERATIONS.includes(key)) {
        let result = operation[currentOperation](n1, n2);
        currentOperation = key;
        displayPreviousDiv.textContent = `${result} ${currentOperation}`;
        displayCurrentDiv.textContent = '';
    
    } else if (n1 && !currentOperation) {
        n1 = n1.slice(0, -1);
        displayCurrentDiv.textContent = n1;

    } else if ((key === 'C' && currentOperation && n2)) {
        n2 = n2.slice(0, -1);
        displayCurrentDiv.textContent = n2;

    }

}

