const { expect } = require('chai');
const { it, describe } = require('mocha');

const { productValidator } = require('./../src');
const { ProductMotherObject } = require('./model/productMotherObject');

describe('Test Mother Object', () => {
    it('should not return error with valid product', () => {
        const product = ProductMotherObject.valid()

        const result = productValidator(product);

        const expected = {
            errors: [],
            result: true,
        };

        expect(result).to.be.deep.equal(expected);
    });

    describe('Product Validation Rules', () => {
        it('sould return an object error when create a product with invalid id', () => {
            const product = ProductMotherObject.withInvalidId();

            const result = productValidator(product);

            const expected = {
                errors: [`id: invalid length, current [${product.id}] expected to be between 2 and 20`],
                result: false,
            };

            expect(result).to.be.deep.equal(expected); 
        });

        it('sould return an object error when create a product with invalid name', () => {
            const product = ProductMotherObject.withInvalidName();

            const result = productValidator(product);

            const expected = {
                errors: [`name: invalid value, current [${product.name}] expected to be only words`],
                result: false,
            }

            expect(result).to.be.deep.equal(expected); 
        });

        it('sould return an object error when create a product with invalid price', () => {
            const product = ProductMotherObject.withInvalidPrice();

            const result = productValidator(product);

            const expected = {
                errors: [`price: invalid value, current [${product.price}] expected to be between 0 and 1000`],
                result: false,
            }

            expect(result).to.be.deep.equal(expected); 
        });

        it('sould return an object error when create a product with invalid category', () => {
            const product = ProductMotherObject.withInvalidCategory();

            const result = productValidator(product);

            const expected = {
                errors: [`category: invalid value, current [${product.category}] expected to be ${['electronic', 'organic'].join(', ')}`],
                result: false,
            }

            expect(result).to.be.deep.equal(expected); 
        });
    })
})