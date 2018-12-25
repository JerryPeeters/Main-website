'use strict';

let MongoClient = require('mongodb').MongoClient,
    url = 'mongodb://localhost:27017/';

// module.exports.printCollection = printCollection;


MongoClient.connect(url, {useNewUrlParser: true })
.then( client => {
    console.log('connection opened.');
    return client;
})
// .then( client => client.close() )
// .then( console.log('connection closed') )
.then( console.log('test2') )
.catch( err => console.log(err) );



// setTimeout( () => { 
//     client1.close()
//     .then( console.log('connection closed.') )
//     .catch( err => console.log(err) );
// }, 5000);

// function openConnection() {
//     let newClient
    
//     MongoClient.connect(url, {useNewUrlParser: true })
//     .then( client => { 
//         newClient = client;
//         console.log('connection opened.');
//         return newClient; 
//     })
//     .catch( err => console.log(err) );
// };





// function printCollection(dbName, colName) {
//     let result
//     //This returns a promise, with a connectedclient as result or error
    
    
//     MongoClient.connect(url, {useNewUrlParser: true })
//     .then( client => client.db(`${dbName}`) )
//     .then( db => db.collection(`${colName}`) )
//     .then( collection => collection.find().toArray() )
//     .then( arr => result = arr)
//     .then() 
//     .catch( err => console.log(err) );
    
    
    
    
    
    
    
//     let result = 'test1';
    
    
    
    
    
    
//     let dbClient = MongoClient.connect(url,
//                         { useNewUrlParser: true }, 
//                         function(err, newClient) {
//                             if (err) return `${err}`;
//                             return newClient;
//                         });
    
//     console.log(dbClient); //hier een errorcheck maken
    
//     let db = dbClient.db(`${dbName}`);
    
//     result = db.collection(`${colName}`).find().toArray( (err, arr) => {
//         if (err) return `${err}`;
//         return arr;
//     });
//     console.log(result);
//     dbClient.close();
//     return result;
// }
    

    

