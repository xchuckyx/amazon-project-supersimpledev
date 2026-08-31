import { formatCurrency } from '../script/utility/money.js'

if (formatCurrency(2095) === '20.95') {
    console.log('Passed');
} else {
    console.log('Failed');
}