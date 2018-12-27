'use strict';

let MongoClient = require('mongodb').MongoClient,
    url = 'mongodb://localhost:27017/',
    
    /*if using multiple dbNames, you can add dbNames as the third
    function Arg and remove this variable */
    dbName = 'droplet01';

module.exports.queryCollection = queryCollection;

async function queryCollection(colName, query) {
    try {
    let client = await MongoClient.connect(url, { useNewUrlParser: true });
    console.log(`Connected to Mongod: ${client.isConnected()}`);
    
    let database = client.db( `${dbName}` );
    let collection = await database.collection(`${colName}`);
    let results = await collection.find(query).toArray();

    await client.close();
    console.log( `Connection to Mongod closed: ${!client.isConnected()}` );

    return results;
    } catch(err) {
        console.log(`The following error occurred when accessing the db: ${err}`);
        return err;
    }
}