import { renderOrderSummary } from './checkout/ordersummaryx.js';
import { renderPaymentSummary } from './checkout/paymentsummaryx.js';
import { renderCheckoutHeader } from './checkout/checkoutheaderx.js';
import { loadProducts } from '../data/products.js';
// import '../data/cartx-class.js';
// import '../data/backend-practicex.js';
// import '../data/carx.js';

loadProducts(() => {
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
});



