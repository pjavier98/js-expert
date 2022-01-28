const Fibonacci = require('./fibonacci');
const sinon = require('sinon');
const assert = require('assert');


// Fibonacci: o próximo valor é a soma dos dois anteriores
(async () => {
    {
        const fibonacci = new Fibonacci();
        const spy = sinon.spy(fibonacci, fibonacci.execute.name);

        // fibonacci.execute();
        // console.log('callcount', spy.callCount);

        for await(const it of fibonacci.execute(3)) {};


        const expectedCallCount = 4;
        assert.deepStrictEqual(spy.callCount, expectedCallCount);
    }

    {
        const fibonacci = new Fibonacci();
        const spy = sinon.spy(fibonacci, fibonacci.execute.name);
        /**
         * vai aguardar a execução do execute, pegar os valores 
         * retornados e jogar na variável results para podermos ver  
         * */ 
        const [...results] = fibonacci.execute(5);
        /**
         * [0] input = 5, current = 0, next = 1
         * [1] input = 4, current = 1, next = 1
         * [2] input = 3, current = 1, next = 2
         * [3] input = 2, current = 2, next = 3
         * [4] input = 1, current = 3, next = 5
         * [5] input = 0, => STOP
         */

         const { args } = spy.getCall(2);

         const expectedResult = [0, 1, 1, 2, 3];
         const expectedParams = Object.values({
            input: 3,
            current: 1,
            next: 2
         });

         assert.deepStrictEqual(args, expectedParams);
         assert.deepStrictEqual(results, expectedResult);

        // const expectedCallCount = 4;
        // assert.deepStrictEqual(spy.callCount, expectedCallCount);
    }
})();
