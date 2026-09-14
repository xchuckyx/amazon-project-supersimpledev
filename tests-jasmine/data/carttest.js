import { 
    addToCart, 
    cartMain, 
    loadFromStorage,
    removeFromCart } from '../../data/cart.js';

// PASSED from CHATGPT
describe('Test Suite: addToCart', () => {
    const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';

    beforeEach(() => {
        spyOn(localStorage, 'setItem');
    });

    it('Adds an existing product to the cart', () => {
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: productId1,
                quantity: 1,
                deliveryOptionId: '1'
            }]);
        });
        loadFromStorage();

        const button = document.createElement('button');
        button.dataset.productId = productId1;

        const quantitySelector = document.createElement('select');
        quantitySelector.className =
            /* 'js-quantity-selector-e43638ce-6aa0-4b85-b27f-e1d07eb678c6'; */
            'js-quantity-selector-' + productId1;

        quantitySelector.innerHTML = `
            <option value="1" selected>1</option>
        `;
        document.body.appendChild(button);
        document.body.appendChild(quantitySelector);

        addToCart(button);

        expect(cartMain.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cartMain[0].productId).toEqual(productId1);
        expect(cartMain[0].quantity).toEqual(2);
    });


    it('Adds a new product to the cart', () => {
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([]);
        });
        loadFromStorage();

        const button = document.createElement('button');
        button.dataset.productId = productId1;

        const quantitySelector = document.createElement('select');
        quantitySelector.className =
            /* 'js-quantity-selector-e43638ce-6aa0-4b85-b27f-e1d07eb678c6'; */
            'js-quantity-selector-' + productId1;

        quantitySelector.innerHTML = `
            <option value="1" selected>1</option>
        `;
        document.body.appendChild(button);
        document.body.appendChild(quantitySelector);
        addToCart(button);

        expect(cartMain.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cartMain[0].productId).toEqual(productId1);
        expect(cartMain[0].quantity).toEqual(1);
    });
});


describe('test suite: removeFromCart', () => {
    const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';

    beforeEach(() => {
        spyOn(localStorage, 'setItem');
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: productId1,
                quantity: 1,
                deliveryOptionId: '1'
            }]);
        });
    });

    it('removes a product from the cart', () => {
        loadFromStorage();
        removeFromCart(productId1);
        
        expect(cartMain.length).toEqual(0);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart-main', JSON.stringify([]));
    });

    it('does nothing if product is not in the cart', () => {
        loadFromStorage();
        removeFromCart('does-not-exist');
    
        expect(cartMain.length).toEqual(1);
        expect(cartMain[0].productId).toEqual(productId1);
        expect(cartMain[0].quantity).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart-main', JSON.stringify([{
            productId: productId1,
            quantity: 1,
            deliveryOptionId: '1'
        }]));
    });
});
