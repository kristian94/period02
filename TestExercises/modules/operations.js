/**
 * Created by Kristian Nielsen on 08-09-2016.
 */
function add(n1, n2){
    return Number(n1) + Number(n2);
}

function subtract(n1, n2){
    return Number(n1) - Number(n2);
}

function multiply(n1, n2){
    return Number(n1) * Number(n2);
}

function divide(n1, n2){
    if(n1 == 0 || n2 == 0){
        throw new Error('You cannot divide by zero')
    }else{
        return Number(n1) / Number(n2);
    }
}

module.exports = {
    add: add,
    subtract: subtract,
    multiply: multiply,
    divide: divide
}