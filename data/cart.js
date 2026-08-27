export let cartMain = JSON.parse(localStorage.getItem('cart-main'));
    if (!cartMain) {
        cartMain = [{
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 2,
            deliveryOptionId: '1'
        }, {
            productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
            quantity: 2,
            deliveryOptionId: '2'
        }];
        saveToStorage();
    }
    console.log(cartMain);
// Delete the current cart value and save the recent defualt values
// local.Storage.remoteItem('cart-main');

function saveToStorage() {
    localStorage.setItem('cart-main', JSON.stringify(cartMain));
}


export function addToCart(button) {
    const {productId} = button.dataset;
    const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
    const quantity = Number(quantitySelector.value);

    let matchedItem;
    cartMain.forEach((cartItem) => {
        if (cartItem.productId === productId) {
            matchedItem = cartItem;
        }
    });

    if (matchedItem) {
        matchedItem.quantity += quantity;
    } else {
        cartMain.push({
            productId,
            quantity,
            deliveryOptionId: '1'
        });
    }
    saveToStorage();
}


export function removeFromCart(productId) {
    const newCartMain = [];
    cartMain.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
            newCartMain.push(cartItem);
        }
    });
    cartMain = newCartMain;
    saveToStorage();
}


export function calculateCartQuantity() {
    let cartQuantity = 0;
    cartMain.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
    });
    const cartQuantityElement = document.querySelector('.js-cart-quantity');
    if (cartQuantityElement) {
        cartQuantityElement.textContent = cartQuantity;
    }
    return cartQuantity;
}


export function updateQuantity(productId, newQuantity) {
    let matchedItem;
    cartMain.forEach((cartItem) => {
        if (productId === cartItem.productId) {
        matchedItem = cartItem;
        }
    });
    matchedItem.quantity = newQuantity;
    saveToStorage();
}


export function updateDeliveryOption(productId, deliveryOptionId) {
    let matchedItem;
    cartMain.forEach((cartItem) => {
        if (cartItem.productId === productId) {
            matchedItem = cartItem;
        }
    });

    matchedItem.deliveryOptionId = deliveryOptionId;
    saveToStorage();
}