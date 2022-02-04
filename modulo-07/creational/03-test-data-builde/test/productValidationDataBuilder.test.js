const { expect } = require('chai');
const { it, describe } = require('mocha');

const { productValidator } = require('./../src');
const { ProductDataBuilder } = require('./model/productDataBuilder');

describe('Test Data Builder', () => {
    it('should not return error with valid product', () => {
        const product = ProductDataBuilder.newProduct().build()

        const result = productValidator(product);

        const expected = {
            errors: [],
            result: true,
        };

        expect(result).to.be.deep.equal(expected);
    });

    describe('Product Validation Rules', () => {
        it('sould return an object error when create a product with invalid id', () => {
            const product = ProductDataBuilder.newProduct().withInvalidId().build()

            const result = productValidator(product);

            const expected = {
                errors: [`id: invalid length, current [${product.id}] expected to be between 2 and 20`],
                result: false,
            };

            expect(result).to.be.deep.equal(expected); 
        });

        it('sould return an object error when create a product with invalid name', () => {
            const product = ProductDataBuilder.newProduct().withInvalidName().build()

            const result = productValidator(product);

            const expected = {
                errors: [`name: invalid value, current [${product.name}] expected to be only words`],
                result: false,
            }

            expect(result).to.be.deep.equal(expected); 
        });

        it('sould return an object error when create a product with invalid price', () => {
            const product = ProductDataBuilder.newProduct().withInvalidPrice().build()

            const result = productValidator(product);

            const expected = {
                errors: [`price: invalid value, current [${product.price}] expected to be between 0 and 1000`],
                result: false,
            }

            expect(result).to.be.deep.equal(expected); 
        });

        it('sould return an object error when create a product with invalid category', () => {
            const product = ProductDataBuilder.newProduct().withInvalidCategory().build()

            const result = productValidator(product);

            const expected = {
                errors: [`category: invalid value, current [${product.category}] expected to be ${['electronic', 'organic'].join(', ')}`],
                result: false,
            }

            expect(result).to.be.deep.equal(expected); 
        });
    })
})