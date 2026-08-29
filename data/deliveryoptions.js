import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

export const deliveryOptions = [{
    id: '1', 
    deliveryDays: 7,
    priceCents: 0
}, {
    id: '2', 
    deliveryDays: 3,
    priceCents: 499
}, {
    id: '3', 
    deliveryDays: 1,
    priceCents: 999
}];


export function getDeliveryOption(deliveryOptionId) {
let deliveryOption;
    deliveryOptions.forEach((option) => {
        if (option.id === deliveryOptionId) {
            deliveryOption = option;
        }
    });
    return deliveryOption || deliveryOption [0];
}


function isWeekend(date) {
    const dayOfWeek = date.format('dddd');
    return dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday';
}


export function calculateDeliveryDate(deliveryOption) {
    let remainingDays = deliveryOption.deliveryDays;
    let deliveryDate = dayjs();

    while (remainingDays > 0) {
        deliveryDate = deliveryDate.add(1, 'day');

    if (!isWeekend(deliveryDate)) {
    remainingDays--;
    // This is a shortcut for:
    // remainingDays = remainingDays - 1;
        }
    }
    const dateString = deliveryDate.format('dddd, MMMM D');
    return dateString;
    // return deliveryDate.format('dddd, MMMM D');
}




// From CHATGPT
/* function skipWeekend(date) {
    const dayOfWeek = date.format('dddd');
    if (dayOfWeek === 'Saturday') {
        date = date.add(2, 'day');
    }
    if (dayOfWeek === 'Sunday') {
        date = date.add(1, 'day');
    }
    return date;
}
    let date = dayjs();
    date = skipWeekend(date);
    console.log(date.format('dddd, MMMM D')); */



// Delete the current cart value and save the recent defualt values

// On CONSOLE
// local.Storage.remoteItem('cart-main');
// local.Storage.clear()