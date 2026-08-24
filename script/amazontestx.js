import { 
    addToCart, 
    calculateCartQuantity } from '../data/cart.js';
import { productsx } from '../data/products.js';
import { formatCurrency } from './utility/money.js';

// import * as cartModule from '../data/cart13.js';
// cartModule.cartx
// cartModule.addToCart('id');
// ESM = EcmaScript Module (Ecmasciprt = Javascript)

// hello();

let productsxHTML = '';

productsx.forEach((product) => {
    productsxHTML += `
        <div class="product-container">
            <div class="product-image-container">
                <img class="product-image" src="${product.image}">
            </div>
            <div class="product-name limit-text-to-2-lines">
                ${product.name}
            </div>
            <div class="product-rating-container">
                <img class="product-rating-stars" src="images/ratings/rating-${Math.round(product.rating.stars * 10)}.png">
                <div class="product-rating-count link-primary">
                    ${product.rating.count}
                </div>
            </div>
            <div class="product-price">
                $${formatCurrency(product.priceCents)}
            </div>
            <div class="product-quantity-container">
                <select class="js-quantity-selector-${product.id}">
                    <option selected value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
            </div>
            <div class="product-spacer"></div>
            <div class="added-to-cart added-to-cart-visible-${product.id}">
                <img src="images/icons/checkmark.png">
                Added
            </div>
            <button class="add-to-cart-button button-primary js-add-to-cart"
            data-product-id="${product.id}">
                Add to Cart
            </button>
        </div>
    `;
});

document.querySelector('.js-products-grid').innerHTML = productsxHTML;

calculateCartQuantity();

document.querySelectorAll('.js-add-to-cart').forEach((button) => {
    let addedMessageTimeoutId;

    button.addEventListener('click', () => {
        addToCart(button);
        calculateCartQuantity();
        const {productId} = button.dataset;
        const addedMessage = document.querySelector(`.added-to-cart-visible-${productId}`);
        addedMessage.classList.add('added-to-cart-visible');
        clearTimeout(addedMessageTimeoutId);
        addedMessageTimeoutId = setTimeout(() => {
            addedMessage.classList.remove('added-to-cart-visible');
        }, 2000);
    });
});

/* 
document.querySelectorAll('.js-add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
        const {productId} = button.dataset;
        addToCart(button);
        updateCartQuantity();
        // showAddedToCartMessage(button)
    });
}); */

/* 
document.querySelectorAll('.js-add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
        const productId = button.dataset.productId;
        const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
        const quantityValue = Number(quantitySelector.value);

        // A flag to check if the product already exists in the cart
        let matchedItem;
        cartx.forEach((item) => {
            if (item.productId === productId) {
                matchedItem = item;
            }
        });

        if (matchedItem) {
            matchedItem.quantity += quantityValue;
        } else {
            cartx.push({
                productId: productId,
                quantity: quantityValue,
            });
        }

        let cartQuantity = 0;
            cartx.forEach((item) => {
            cartQuantity += item.quantity;
        });

        document.querySelector('.js-cart-quantity').textContent = cartQuantity;
    });
}); 
 */
/* if (cartx.some((item) => item.productId === productId)) {
        cartx.find((item) => item.productId === productId).quantity++;
    } else {
        cartx.push({
        productId: productId,
        quantity: 1
        });
    } */


/* 
Data attributes are always in KEBAB CASE, and the corresponding JS variable is in CAMEL CASE.
product-name = KEBAB CASE
productId = CAMEL CASE 
*/




