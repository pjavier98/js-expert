const { deepStrictEqual } = require('assert');

let counter = 0;
let counter2 = counter;

counter2++;

// ?
// counter => 0
// counter2 => 1

// Passagem de valor por cópia
// Tipo primitivo gera uma cópia em memória

deepStrictEqual(counter, 0);
deepStrictEqual(counter2, 1);

/* --------------------------------------------------------- */

const item = { counter: 0 };
const item2 = item;

item2.counter++;

// ?
// item.counter => 1
// item2.counter => 1

// Passagem de valor por referência
// Tipo de referência copia o endereço de memória e aponta para o mesmo lugar

deepStrictEqual(item, { counter: 1 });

item.counter++;

deepStrictEqual(item2, { counter: 2 });



