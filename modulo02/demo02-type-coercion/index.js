true + 2;
// 3

true - 2;
// -1

'21' + true;
// '21true'

'21' - true;
// 20

// 16 vezes
9999999999999999;
// 10000000000000000

0.1 + 0.2;
// 0.30000000000000004

3 > 2;
// true

2 > 1;
// true

3 > 2 > 1;
// false

'21' - - 1;
// 22

'1' == 1;
// true

'1' === 1;
// false

3 > 2 >= 1;
// true 

/*----------------------------------------------------------*/

String(123) // (explícita)
// '123'

123 + '' // (implícita)
// '123'

console.assert(String(123) === '123', 'explicit convertion to string');
console.assert(123 + '' === '123', 'implicit convertion to string');

// (||) Sempre vai retornar o primeiro argumento se as duas condições forem true
console.assert('hello' || 123 === 'hello', '|| returns the first element');

// (&&) Sempre vai retornar o último argumento se as duas condições forem true
console.assert('hello' && 123 === 123, '|| returns the last element');

/*----------------------------------------------------------*/

const item = {
    name: 'Pedro Javier',
    age: 22,

    // string: 1 se não for primitivo, chama o valueOf
    toString() {
        return `Name: ${this.name}, Age: ${this.age}`;
    },

    // number: 1 se não for primitivo, chama o toString
    valueOf() {
        return { hey: 'dude' };
    },

    // tem prioridade
    [Symbol.toPrimitive](coerctionType) {
        // console.log('trying to convert to', coerctionType);
        const types = {
            string: JSON.stringify(this),
            number: '0007'
        };

        return types[coerctionType] || types.string;
    }
}

// console.log('toString: ', String(item));

// vai retornar NaN pois o toString retornou a string
// console.log('valueOf: ', Number(item));

// console.log('String: ', String(item));
// console.log('Number: ', Number(item));

// chama a conversão default
// console.log('Date: ', new Date(item));

console.assert(item + 0 === '{"name":"Pedro Javier","age":22}0')
// console.log('!!item is true?', !!item);

console.assert(!!item);

// console.log('string.concat', 'Ae'.concat(item));
console.assert('Ae'.concat(item) === 'Ae{"name":"Pedro Javier","age":22}');

// console.log('implicit + explicit coercion (using ==)', item == String(item));
console.assert(item == String(item));

const item2 = { ...item, name: 'Zézin', age: 20 };
// console.log('New Object', item2);
console.assert(item2.name === 'Zézin' && item2.age === 20);

