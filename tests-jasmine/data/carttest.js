import { 
    addToCart, 
    cartMain, 
    loadFromStorage } from '../../data/cart.js';

// PASSED from CHATGPT
describe('Test Suite: addToCart', () => {
    beforeEach(() => {
        spyOn(localStorage, 'setItem');
    });

    it('Adds an existing product to the cart', () => {
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1,
                deliveryOptionId: '1'
            }]);
        });
        loadFromStorage();

        const button = document.createElement('button');
        button.dataset.productId =
            'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';

        const quantitySelector = document.createElement('select');
        quantitySelector.className =
            'js-quantity-selector-e43638ce-6aa0-4b85-b27f-e1d07eb678c6';

        quantitySelector.innerHTML = `
            <option value="1" selected>1</option>
        `;
        document.body.appendChild(button);
        document.body.appendChild(quantitySelector);

        addToCart(button);
        expect(cartMain.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cartMain[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cartMain[0].quantity).toEqual(2);
    });


    it('Adds a new product to the cart', () => {
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([]);
        });
        loadFromStorage();

        const button = document.createElement('button');
        button.dataset.productId =
            'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';

        const quantitySelector = document.createElement('select');
        quantitySelector.className =
            'js-quantity-selector-e43638ce-6aa0-4b85-b27f-e1d07eb678c6';

        quantitySelector.innerHTML = `
            <option value="1" selected>1</option>
        `;
        document.body.appendChild(button);
        document.body.appendChild(quantitySelector);
        addToCart(button);
        expect(cartMain.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cartMain[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cartMain[0].quantity).toEqual(1);
    });
});


// FROM SuperSimplevDev
/* 
describe('Test Suite: addToCart', () => {
    it('Adds an existing product to the cart', () => {
        
    });

    it('Adds a new product to the cart', () => {
        spyOn(localStorage, 'setItem');


        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([]);
        });
        loadFromStorage();

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cartMain.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cartMain[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cartMain[0].quantity).toEqual(1);
    });
}); */