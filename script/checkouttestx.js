import { renderOrderSummary } from './checkout/ordersummaryx.js';
import { renderPaymentSummary } from './checkout/paymentsummaryx.js';
import { renderCheckoutHeader } from './checkout/checkoutheaderx.js';
import { loadProducts } from '../data/products.js';
import { loadCart } from '../data/cartx.js';
// import '../data/cartx-class.js';
// import '../data/backend-practicex.js';
// import '../data/carx.js';

/* loadProducts(() => {
    loadCart(() => {
        renderCheckoutHeader();
        renderOrderSummary();
        renderPaymentSummary();
    });
}); */


/* new Promise((resolve) => {
    loadProducts(() => {
        resolve();
    });
}).then(() => {
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
}); */


/* new Promise((resolve) => {
    loadProducts(() => {
        resolve('value1');
    });
}).then((value) => {
    console.log(value);
    return new Promise((resolve) => {
        loadCart(() => {
            resolve();
        });
    });
}).then(() => {
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
}); */


Promise.all([
    new Promise((resolve) => {
        loadProducts(() => {
            resolve('value1');
        });
    }),
    new Promise((resolve) => {
        loadCart(() => {
            resolve();
        });
    })
]).then((values) => {
    console.log(values);
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
});





