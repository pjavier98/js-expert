import { ContextStrategy } from "./src/base/contextStrategy.js";
import { PostgresStrategy } from "./src/strategies/postgresStrategy.js";
import { MongodbStrategy } from "./src/strategies/mongodbStrategy.js";

const postgresConnectionString = "postgres://pj:pass@localhost:5432/heroes"
const postgresContext = new ContextStrategy(new PostgresStrategy(postgresConnectionString));
await postgresContext.connect();

const mongodbConnectioString = "mongodb://pj:pass@localhost:27017/heroes";
const mongodbContext = new ContextStrategy(new MongodbStrategy(mongodbConnectioString));
await mongodbContext.connect();

const data = [
    {
        name: 'pj',
        type: 'transaction',
    },
    {   
        name: 'jp',
        type: 'activity-log',
    }
];

const contextTypes = {
    transaction: postgresContext,
    'activity-log':  mongodbContext
}

for (const { type, name } of data) {
    const context = contextTypes[type];

    await context.create({ name: name + Date.now() });

    console.log(type, context.dbStrategy.constructor.name);
    console.log(await context.read());
}