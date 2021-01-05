const assert = require('assert');
const { time } = require('console');

/*-----------------------------------------*/

const uniqueKey = Symbol('username');
const user = {};

user['username'] = 'value for normal objects';
user[uniqueKey] = 'value for symbol';

// console.log('getting normal objects', user.username);
// console.log('getting normal objects', user[Symbol['username']]);
// console.log('getting normal objects', user[uniqueKey]);

assert.deepStrictEqual(user.username, 'value for normal objects');

// sempre único em nível de endereço de memória
assert.deepStrictEqual(user[Symbol['username']], undefined);
assert.deepStrictEqual(user[uniqueKey], 'value for symbol');

// é dificil de pegar, mas não é secreto
// console.log('symbols', Object.getOwnPropertySymbols(user)[0]);

assert.deepStrictEqual(Object.getOwnPropertySymbols(user)[0], uniqueKey);

// byPass - má prática (não tem no codebase do node)
user[Symbol.for('password')] = 123
assert.deepStrictEqual(user[Symbol.for('password')], 123);

/*-----------------------------------------*/

// well known symbols
const obj = {
    // iterators
    [Symbol.iterator]: () => ({
        items: ['c', 'b', 'a'],
        next() {
            return {
                done: this.items.length === 0,
                value: this.items.pop(),
            }
        }
    }),
};

// for (const item of obj) {
//     console.log('item', item);
// }

// console.log('item', ...obj);
assert.deepStrictEqual([...obj], ['a', 'b', 'c']);

const kItems = Symbol('kItems');

class MyDate {
    constructor(...args) {
        this[kItems] = args.map(arg => new Date(...arg));
    }

    [Symbol.toPrimitive](coercionType) {
        if (coercionType !== 'string') throw new TypeError();

        const itens = this[kItems]
            .map(item => new Intl
                .DateTimeFormat('pt-BR', { month: 'long', day: '2-digit', year: 'numeric' })
                .format(item)
            );

        return new Intl.ListFormat('pt-BR', { style: 'long', type: 'conjunction' }).format(itens);
    }
    
    *[Symbol.iterator]() {
        for (const item of this[kItems]) {
            yield item;
        }
    }

    async *[Symbol.asyncIterator]() {
        const timeout = ms => new Promise(r => setTimeout(r, ms));

        for (const item of this[kItems]) {
            await timeout(100);
            yield item.toISOString();
        }
    }

    get [Symbol.toStringTag]() {
        return 'WHAT?';
    }
}

const myDate = new MyDate(
    [2020, 03, 01],
    [2018, 02, 02],
)

const expectedDates = [
    new Date(2020, 03, 01),
    new Date(2018, 02, 02)
];

// console.log('MyDate', myDate);
assert.deepStrictEqual(Object.prototype.toString.call(myDate), '[object WHAT?]');

assert.throws(() => myDate + 1, TypeError);

// coerção explicita para chamar o toPrimitive
assert.deepStrictEqual(String(myDate), '01 de abril de 2020 e 02 de março de 2018');

// implementar o iterator
assert.deepStrictEqual([...myDate], expectedDates);

// chama o Symbol.iterator

// (async () => {
//     const dates = await Promise.all([...myDate]);
//     assert.deepStrictEqual(dates, expectedDates);
// })();

// implementar o iterator com promisses
// (async () => {
//     for await(const item of myDate) {
//         console.log('asyncIterator', item);
//     }
// })();

(async () => {
    const dates = [];

    for await (const date of myDate) { 
        dates.push(date);
    }
    const expectedDatesInISOString = expectedDates.map(item => item.toISOString());
    assert.deepStrictEqual(dates, expectedDatesInISOString);
})();

