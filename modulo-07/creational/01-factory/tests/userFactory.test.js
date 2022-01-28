const rewiremock = require('rewiremock/node');
const { deepStrictEqual } = require('assert');
const database = require('../src/utils/database');

const dbData = [{ name: 'Pedro Javier' }, { name: 'Javier Pedro'} ];

class MockDatabase {
    connect = () => this;
    find = async (query) => dbData;
}

rewiremock(() => require('../src/utils/database')).with(MockDatabase);



(async () => {
    {
        const expected = [{ name: 'PEDRO JAVIER' }, { name: 'JAVIER PEDRO'} ];

        rewiremock.enable();
        
        const UserFactory = require('../src/factory/userFactory');

        const userFactory = await UserFactory.createInstance();
        const result = await userFactory.find();

        deepStrictEqual(result, expected);

        rewiremock.disable();
    }
})()