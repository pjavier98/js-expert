const assert = require('assert');
const obj = {};
const arr = [];
const fn = () => {};

// internamente, objetos literais viram funções explicitas
// console.log('new Object() is {}?', new Object().__proto__ === {}.__proto__);
assert.deepStrictEqual(new Object().__proto__, {}.__proto__);

// __proto__ é a referência do objeto que possui as propriedades nele

// console.log('obj.__proto__ === Object.prototype', obj.__proto__ === Object.prototype);
assert.deepStrictEqual(obj.__proto__, Object.prototype);

// console.log('arr.__proto__ === Array.prototype', arr.__proto__ === Array.prototype);
assert.deepStrictEqual(arr.__proto__, Array.prototype);


// console.log('fn.__proto__ === Function.prototype', fn.__proto__ === Function.prototype);
assert.deepStrictEqual(fn.__proto__, Function.prototype);

// o __proto__ de Object.prototype é null
// console.log('obj.__proto__.__proto__ === null', obj.__proto__.__proto__ === null);
assert.deepStrictEqual(obj.__proto__.__proto__, null);

/* ------------------------------------------------------------------------------- */

function Employee() {};
Employee.prototype.salary = () => "salary**";

function Supervisor() {};
// herda a instância do employee

Supervisor.prototype = Object.create(Employee.prototype);
Supervisor.prototype.profitShare = () => "profitShare**";

function Manager() {};
Manager.prototype = Object.create(Supervisor.prototype);
Manager.prototype.monthlyBonuses = () => "monthlyBonuses**";

// podemos chamar via prototype, mas se tentar chamar direto dá erro!!
// console.log('Manager.prototype.salary()', Manager.prototype.salary());
// console.log('Manager.salary()', Manager.salary());

/**
 * se não chamar o 'new', o primeiro __proto__ vai ser sempre a instância
 * de Function sem herdar nossas classes 
 * 
 * Para acessar as classes sem o new, pode acessar via prototype
 * */ 

//  console.log(Manager.prototype.__proto__ === Supervisor.prototype);
assert.deepStrictEqual(Manager.prototype.__proto__, Supervisor.prototype);


/* ------------------------------------------------------------------------------- */

// quando chamamos com o 'new' o __proto__ recebe o prototype
// console.log('manager.__proto__: %s, manager.salary(): %s', new Manager().__proto__, new Manager().salary());
// console.log('Supervisor.prototype === new Manager().__proto__.__proto__', Supervisor.prototype === new Manager().__proto__.__proto__);
assert.deepStrictEqual(Supervisor.prototype, new Manager().__proto__.__proto__);

/* ------------------------------------------------------------------------------- */

const manager = new Manager();
// console.log('manager.salary()', manager.salary());
// console.log('manager.profitShare()', manager.profitShare());
// console.log('manager.monthlyBonuses()', manager.monthlyBonuses());

// console.log(manager.__proto__);
// Employee { monthlyBonuses: [Function (anonymous)] }

// console.log(manager.__proto__.__proto__);
// Employee { profitShare: [Function (anonymous)] }

// console.log(manager.__proto__.__proto__.__proto__);
// { salary: [Function (anonymous)] }

// console.log(manager.__proto__.__proto__.__proto__.__proto__);
// [Object: null prototype] {}

// console.log(manager.__proto__.__proto__.__proto__.__proto__.__proto__);
// null

assert.deepStrictEqual(manager.__proto__, Manager.prototype);
assert.deepStrictEqual(manager.__proto__.__proto__, Supervisor.prototype);
assert.deepStrictEqual(manager.__proto__.__proto__.__proto__, Employee.prototype);
assert.deepStrictEqual(manager.__proto__.__proto__.__proto__.__proto__, Object.prototype);
assert.deepStrictEqual(manager.__proto__.__proto__.__proto__.__proto__.__proto__, null);

/* ------------------------------------------------------------------------------- */

class T1 {
    ping() { return 'ping' };
}

class T2 extends T1 {
    pong() { return 'pong' };
}

class T3 extends T2 {
    shoot() { return 'shoot' };
}

const t3 = new T3();

// console.log('t3 inherits null?', t3.__proto__.__proto__.__proto__.__proto__.__proto__);
// console.log('t3.ping()', t3.ping());
// console.log('t3.pong()', t3.pong());
// console.log('t3.shoot()', t3.shoot());

assert.deepStrictEqual(t3.__proto__.__proto__.__proto__.__proto__.__proto__, null);