import { renderOrderSummary } from './checkout/ordersummaryx.js';
import { renderPaymentSummary } from './checkout/paymentsummaryx.js';
import { renderCheckoutHeader } from './checkout/checkoutheaderx.js';
import { leadProducts } from '../data/products.js';
// import '../data/cartx-class.js';
// import '../data/backend-practicex.js';
// import '../data/carx.js';

leadProducts(() => {
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
});



