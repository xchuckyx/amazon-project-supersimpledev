// Named Export
import { 
    cartMain, 
    removeFromCart, 
    calculateCartQuantity,
    updateQuantity,
    updateDeliveryOption } from '../../data/cart.js';
import { productsx, getProduct } from '../../data/products.js';
import { formatCurrency } from './../utility/money.js';
import { deliveryOptions, getDeliveryOption } from '../../data/deliveryoptions.js';
import { renderPaymentSummary } from './paymentsummaryx.js';

import { hello } from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';

// Default Export
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

hello();

// const today = dayjs();
// dayjs().add(amount, unit)
// dayjs().add(7, 'day')
// const deliveryDate = today.add(7, 'days');
// console.log(deliveryDate.format('dddd, MMMM D'));



export function renderOrderSummary() {
    let cartSummaryHTML = '';
    cartMain.forEach((cartItem) => {
    const productId = cartItem.productId;

    const matchedProduct = getProduct(productId);
/* 
v1
const matchedProduct = productsx.find((product) => {
    return product.id === productId;
v2
const matchedProduct = productsx.find(product => product.id === productId);
    */


/* 
cartx.forEach((cartItem) => {
    const productId = cartItem.productId;
    const matchedProduct = productsx.find((product) => {
        return product.id === productId;
    });
    console.log(matchedProduct);
}); 
*/

    const deliveryOptionId = cartItem.deliveryOptionId;
    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const today = dayjs();
    const deliveryDate = today.add(
        deliveryOption.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM D');

        cartSummaryHTML += `
        <div class="cart-item-container js-cart-item-container-${matchedProduct.id}">
            <div class="delivery-date">
                Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
                <img class="product-image" src="${matchedProduct.image}">
                <div class="cart-item-details">
                    <div class="product-name">
                        ${matchedProduct.name}
                    </div>
                    <div class="product-price">
                        $${formatCurrency(matchedProduct.priceCents)}
                    </div>
                    <div class="product-quantity">
                        <span>
                            Quantity: <span class="quantity-label js-quantity-label-${matchedProduct.id}">${cartItem.quantity}</span>
                        </span>
                        <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchedProduct.id}">
                            Update
                        </span>
                        <input type="number" class="quantity-input js-quantity-input-${productId}" value="${cartItem.quantity}">
                        <span class="save-quantity-link link-primary js-save-link" data-product-id="${matchedProduct.id}">
                            Save
                        </span>
                        <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchedProduct.id}">
                            Delete
                        </span>
                    </div>
                </div>

                <div class="delivery-options">
                    <div class="delivery-options-title">
                        Choose a delivery option:
                    </div>
                    ${deliveryOptionsHTML(matchedProduct, cartItem)}
                </div>
            </div>
        </div>
        `;
    });

    document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;



    function deliveryOptionsHTML(matchedProduct, cartItem) {
        let html = '';
        deliveryOptions.forEach((deliveryOption) => {
            const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
            const today = dayjs();
            const deliveryDate = today.add(
                deliveryOption.deliveryDays, 'days');
            const dateString = deliveryDate.format('dddd, MMMM D');
            const priceString = deliveryOption.priceCents 
                === 0
                ? 'FREE'
                : `$${formatCurrency(deliveryOption.priceCents)} -`
            html += `
            <div class="
                delivery-option js-delivery-option" 
                data-product-id="${matchedProduct.id}"
                data-delivery-option-id="${deliveryOption.id}">
                <input type="radio"
                    ${isChecked ? 'checked' : ''}
                class="delivery-option-input"
                name="delivery-option-${matchedProduct.id}">
                <div>
                    <div class="delivery-option-date">
                        ${dateString} 
                    </div>
                    <div class="delivery-option-price">
                        ${priceString} Shipping
                    </div>
                </div>
            </div>
            `
        });
        return html;
    }


    // Handle delete functionality
    document.querySelectorAll('.js-delete-link').forEach((deleteLink) => {
        deleteLink.addEventListener('click', () => {
            const productId = deleteLink.dataset.productId;
            removeFromCart(productId);
            const cartContainer = document.querySelector(`.js-cart-item-container-${productId}`);
            cartContainer.remove();
            calculateCartQuantity();
            renderPaymentSummary();
        });
    });

    function updateCartQuantity() {
        const cartQuantity = calculateCartQuantity();
        document.querySelector('.js-return-to-home-link').innerHTML = `${cartQuantity} items`;
    }

    updateCartQuantity();


    document.querySelectorAll('.js-update-link').forEach((updateLink) => {
        updateLink.addEventListener('click', () => {
            const productId = updateLink.dataset.productId; 
            const container = document.querySelector(`.js-cart-item-container-${productId}`);container.classList.add('is-editing-quantity');
        });
    });


    /* document.querySelectorAll('.js-save-link').forEach((saveLink) => {
        saveLink.addEventListener('click', () => {
            const productId = saveLink.dataset.productId; 
            const container = document.querySelector(`.js-cart-item-container-${productId}`);container.classList.remove('is-editing-quantity');
        });
    });
    */

    document.querySelectorAll('.js-save-link').forEach((saveLink) => {
        saveLink.addEventListener('click', () => {
            const productId = saveLink.dataset.productId; 
            
            const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);
            const newQuantity = Number(quantityInput.value);

            if (newQuantity <= 0 || newQuantity >= 1000) {
                alert('Quantity must be greater than 0 and less than 1000');
            return;
            }

            updateQuantity(productId, newQuantity);
            const container = document.querySelector(`.js-cart-item-container-${productId}`);container.classList.remove('is-editing-quantity');
            const quantityLabel = document.querySelector(`.js-quantity-label-${productId}`);quantityLabel.innerHTML = newQuantity;
            updateCartQuantity();
            renderPaymentSummary();
        });
    });


    document.querySelectorAll('.js-delivery-option').forEach((element) => {
        element.addEventListener('click', () => {
            const {productId, deliveryOptionId} = element.dataset;
            // shorthand for below
            // const productId = element.dataset.productId;
            // const deliveryOptionId = element.dataset.deliveryOptionId;

            updateDeliveryOption(productId, deliveryOptionId);
            renderOrderSummary();
            renderPaymentSummary();
        });
    });
}



// RECURSION = A function can call / re-run itself

// MVC = Model - View - Controller (a design pattern)
// Model = saves and manages data
// View = takes the data and displays it on the page
// Controller = runs some code when we interact with the page


/* 
<div class="delivery-option">
    <input type="radio" checked 
    class="delivery-option-input"
    name="delivery-option-${matchedProduct.id}">
    <div>
        <div class="delivery-option-date">
            Tuesday, June 21
        </div>
        <div class="delivery-option-price">
            FREE Shipping
        </div>
    </div>
</div>

<div class="delivery-option">
    <input type="radio"
    class="delivery-option-input"
    name="delivery-option-${matchedProduct.id}">
    <div>
        <div class="delivery-option-date">
            Wednesday, June 15
        </div>
        <div class="delivery-option-price">
            $4.99 - Shipping
        </div>
    </div>
</div>

<div class="delivery-option">
    <input type="radio"
    class="delivery-option-input"
    name="delivery-option-${matchedProduct.id}">
    <div>
        <div class="delivery-option-date">
            Monday, June 13
        </div>
        <div class="delivery-option-price">
            $9.99 - Shipping
        </div>
    </div>
</div> 
*/