const assert = require('assert');

/**
 * usado na maioria das vezes para listas de itens únicos
 */

const arr1 = ['0', '1', '2'];
const arr2 = ['2', '0', '3'];
const arr3 = arr1.concat(arr2);

// console.log('arr3', arr3.sort());
assert.deepStrictEqual(arr3.sort(), [ '0', '0', '1', '2', '2', '3' ]);

const set = new Set();
arr1.map(item => set.add(item));
arr2.map(item => set.add(item));

// console.log('Set with add per item', set);
assert.deepStrictEqual(Array.from(set), [ '0', '1', '2', '3' ]);

// rest/spread
assert.deepStrictEqual(Array.from(new Set([...arr1, ...arr2])), [ '0', '1', '2', '3' ]);

// console.log('set.keys', set.keys());

// só existe por conta do map
// console.log('set.values', set.values()); 

/**
 * no array comum, para saber se um item existe
 * [].indexOf('1') !== -1 ou [0].includes
 */

assert.ok(set.has('3'));

/**
 * mesma teoria do Map, mas você sempre trabalha com a lista toda
 * não tem get, então você pode saber se o item está ou não no array e é isso
 * na documentação tem exemplos sobre como fazer uma interseção
 * saber o que tem na lista e não tem na outra e assim por diante
 */

const users01 = new Set([
    'erick',
    'mariazinha',
    'xuxa da silva',
]);

const users02 = new Set([
    'joazinho',
    'erick',
    'julio',
]);

const intersection = new Set([...users01].filter(user => users02.has(user)));
assert.deepStrictEqual(Array.from(intersection), ['erick']);

const difference = new Set([...users01].filter(user => !users02.has(user)));
assert.deepStrictEqual(Array.from(difference), ['mariazinha',  'xuxa da silva']);

// weakset

/**
 * mesma ideia do weakmap
 * não é enumerável (iterável)
 * só trabalha com chaves como referência
 * só tem métodos simples
 */

const user = { id: 123 };
const user2 = { id: 321 };
const weakSet = new WeakSet([ user ]);

// weakSet.add(user2);
// weakSet.delete(user);
// weakSet.has(user);

const oldItems = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
];

const newItems = [
    { id: 3 },
    { id: 4 },
];

const getIntersection = (firstList, secondList) => {
    const firstIds = firstList.map(item => item.id);
    const secondIds = secondList.map(item => item.id);

    const secondSet = new Set([...secondIds]);

    const IdsInFirstOnly = Array.from(new Set([...firstIds].filter(id => !secondSet.has(id))));

    return IdsInFirstOnly;
}

const idsToDelete = getIntersection(oldItems, newItems);
const elementsToDelete = oldItems.filter(item => idsToDelete.includes(item.id));
console.log('elementsToDelete => ', elementsToDelete);

const idsToCreate = getIntersection(newItems, oldItems);
const elementsToCreate = newItems.filter(item => idsToCreate.includes(item.id));
console.log('elementsToCreate => ', elementsToCreate);
