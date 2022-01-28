const assert = require('assert');

const myMap = new Map();
/**
 * Pode ter qualquer coisa como chave
 */
myMap
    .set(1, 'one')
    .set('Erick', { text: 'two' })
    .set(true, () => 'hello');

/**
 * Usando um constructor
 */

const myMapWithConstructor = new Map([
    ['1', 'str1'],
    [1, 'str1'],
    [true, 'bool1'],
]);

// console.log('myMap', myMap);
// console.log('myMap.get(1)', myMap.get('Erick'));

assert.deepStrictEqual(myMap.get(1), 'one');
assert.deepStrictEqual(myMap.get('Erick'), { text: 'two' });
assert.deepStrictEqual(myMap.get(true)(), 'hello');

// Em Objects a chave só pode ser string ou symbol (number é coergido a string)
const onlyReferenceWorks = { id: 1 };
myMap.set(onlyReferenceWorks, { name: 'ErickWendel' });

// console.log('get', myMap.get(onlyReferenceWorks));
assert.deepStrictEqual(myMap.get({ id: 1 }), undefined);
assert.deepStrictEqual(myMap.get(onlyReferenceWorks), { name: 'ErickWendel' });

// utilitários
/**
 * No Object seria Object.keys({ a: 1 }).length 
 * para saber a quantidade de chaves do nosso objeto 
 */

assert.deepStrictEqual(myMap.size, 4);

/**
 * para verificar se um item existe no objeto
 * item.key => se não existe => undefined
 * if () => coerção implícita para boolean e retorna false
 * 
 * forma melhor para o JS
 * ({ name: 'Erick' }).hasOwnProperty('name') => true
 */

assert.ok(myMap.has(onlyReferenceWorks));

/**
 * para remover um item do objeto
 * delete item.id
 * imperformático para o JS
 */

assert.ok(myMap.delete(onlyReferenceWorks));

/**
 * não da para iterar em Objects diretamente
 * tem que transformar em Objects.entries
 */

assert
    .deepStrictEqual(JSON.stringify([...myMap]), JSON.stringify([[1,"one"],["Erick",{"text":"two"}],[true, () => {}]]));

// for (const [key, value] of myMap) {
//     console.log({ key, value });
// }

/**
 * Objeto é inseguro, pois dependendo do nome da chave,
 * pode substituir algum comportamento padrão
 * 
 * ({ }).toString() => '[object Object]'
 * ({ toString: () => 'Hey' }).toString() === 'Hey'
 * 
 * qualquer chave pode colidir, com as propriedades herdadas do objeto como
 * constructor, toString, valueOf e etc.
 */

const actor = {
    name: 'Xuxa da Silva',
    toString: 'Queen: Xuxa da Silva'
}

myMap.set(actor);

assert.ok(myMap.has(actor));
assert.throws(() => myMap.get(actor).toString, TypeError);

/**
 * Não da para limpar um Object sem reassiná-lo
 */

 myMap.clear();
 assert.deepStrictEqual([...myMap.keys()], []);

/* -------------------------------------------------------------------------- */

/**
 * Weakmap
 */

/**
 * Pode ser coletado após perder as referências
 * usado em casos bem específicos
 */

/**
 * Tem a maioria dos beneficios do map 
 * mas não é iterável
 * só chaves de referencia e que você já conheça
 * mais leve e preve leak de memória, porque depois que as instâncias
 * saem da memória, tudo é limpo
 */

const weakMap = new WeakMap();
const hero = { name: 'Flash' };

// weakMap.set(hero);
// weakMap.get('name');
// weakMap.has(hero);
// weakMap.delete(hero);