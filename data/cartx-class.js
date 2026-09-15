import { validDeliveryOption } from '../data/deliveryoptions.js';

// Use PascalCase for things that generates objects.
// PascalCase = starts every word with a capital.
// Class = object generator
class Cart {
    cartItems;
    localStoragekey;

    constructor(localStoragekey) {
        this.localStoragekey = localStoragekey;
        this.loadFromStorage();
    }

    loadFromStorage() {
        this.cartItems = JSON.parse(localStorage.getItem(this.localStoragekey));
        if (!this.cartItems) {
            this.cartItems = [{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 2,
                deliveryOptionId: '1'
            }, {
                productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                quantity: 2,
                deliveryOptionId: '2'
            }];
            // saveToStorage();
        }
    }

    saveToStorage() {
    localStorage.setItem(this.localStoragekey, JSON.stringify(this.cartItems));
    }

    addToCart(button) {
    const {productId} = button.dataset;
    const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
    const quantity = Number(quantitySelector.value);

    let matchedItem;
    this.cartItems.forEach((cartItem) => {
        if (cartItem.productId === productId) {
            matchedItem = cartItem;
        }
    });

    if (matchedItem) {
        matchedItem.quantity += quantity;
    } else {
        this.cartItems.push({
            productId,
            quantity,
            deliveryOptionId: '1'
        });
    }
    this.saveToStorage();
    }

    removeFromCart(productId) {
    const newCartMain = [];
    this.cartItems.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
            newCartMain.push(cartItem);
        }
    });
    this.cartItems = newCartMain;
    this.saveToStorage();
    }

    calculateCartQuantity() {
    let cartQuantity = 0;
    this.cartItems.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
    });
    const cartQuantityElement = document.querySelector('.js-cart-quantity');
        if (cartQuantityElement) {
            cartQuantityElement.textContent = cartQuantity;
        }
        return cartQuantity;
    }

    updateQuantity(productId, newQuantity) {
    let matchedItem;
    this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
        matchedItem = cartItem;
        }
        if (!matchedItem) {
            return;
        }
    });
    matchedItem.quantity = newQuantity;
    this.saveToStorage();
    }

    updateDeliveryOption(productId, deliveryOptionId) {
    let matchedItem;
    this.cartItems.forEach((cartItem) => {
        if (cartItem.productId === productId) {
            matchedItem = cartItem;
        }
        
    });
        if (!matchedItem) {
            return;
        }
        if (!validDeliveryOption(deliveryOptionId)) {
            return;
        }
    matchedItem.deliveryOptionId = deliveryOptionId;
    this.saveToStorage();
    }
}

// Instance of a Class
const cartBasic = new Cart('cart-oopbasic');
const cartBusiness = new Cart('cart-oopbusiness');

console.log(cartBasic);
console.log(cartBusiness);
console.log(cartBusiness instanceof Cart);

// Delete the current cart value and save the recent defualt values
// local.Storage.remoteItem('cart-main');

/* 
Object-Oriented Programming (OOP)
    - another style of programming
    - organizing our code into objects
    - tries to represent the real world 
*/