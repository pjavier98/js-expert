import { expect, describe, test, jest, beforeEach } from '@jest/globals';
import { BaseBusiness } from '../src/business/base/baseBusiness.js';
import { OrderBusiness } from '../src/business/orderBusiness.js';
import { Order } from '../src/entities/order.js';
import { NotImplementedException } from '../src/utils/exceptions.js';

describe('Test suite for Template Method Design Pattern', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  describe('#OrderBusiness', () => {
    test('execution Order Business without Template Method', () => {
      const order = new Order({
        customerId: 1,
        amount: 100000,
        products: [{ description: 'Ferrari' }]
      });

      const orderBusiness = new OrderBusiness();

      const isValid = orderBusiness._validateRequiredFields(order);

      expect(isValid).toBeTruthy();

      const result = orderBusiness._create(order);
      expect(result).toBeTruthy();
    });

    test('execution Order Business with Template Method', () => {
      const order = new Order({
        customerId: 1,
        amount: 100000,
        products: [{ description: 'Ferrari' }]
      });

      const orderBusiness = new OrderBusiness();

      const calledValidationFn = jest.spyOn(
        orderBusiness,
        orderBusiness._validateRequiredFields.name
      );

      const calledCreateFn = jest.spyOn(
        orderBusiness,
        orderBusiness._create.name
      );

      const result = orderBusiness.create(order);
      expect(result).toBeTruthy();
      expect(calledValidationFn).toHaveBeenCalled();
      expect(calledCreateFn).toHaveBeenCalled();
    });
  })
});