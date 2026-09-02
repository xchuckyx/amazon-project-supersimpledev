import { formatCurrency } from '../../script/utility/money.js'

console.log('Test Suite: Format Currency');
console.log('Convert cents into dollars');
if (formatCurrency(2095) === '20.95') {
    console.log('Passed');
} else {
    console.log('Failed');
}

console.log('Works with 0');
if (formatCurrency(0) === '0.00') {
    console.log('Passed');
} else {
    console.log('Failed');
}

console.log('Rounds up to the nearest cent - 5');
if (formatCurrency(2000.5) === '20.01') {
    console.log('Passed');
} else {
    console.log('Failed');
}

console.log('Rounds up to the nearest cent - 4');
if (formatCurrency(2000.4) === '20.00') {
    console.log('Passed');
} else {
    console.log('Failed');
}


// TYPES OF TEST CASES
// 1. Basic test cases = test if the code is working
// 2. Edge cases = test with values that are tricky

// Test Suite = Group of related tests