import { addToCart, cartMain } from '../../data/cart.js';

describe('Test Suite: addToCart', () => {
    it('Adds an existing product to the cart', () => {
        expect(addToCart).toEqual('20.95');
    });

    it('Adds a new product to the cart', () => {
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([]);
        });
        console.log(localStorage.getItem('cartMain'));

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cartMain.length).toEqual(1);
    });
});


// Test Coverage = how much of the code is being tested
// Flaky Test = test that sometimes passes and sometimes fails