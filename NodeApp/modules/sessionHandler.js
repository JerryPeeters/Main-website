'use strict';

let db = require('../db'),
    send404 = require('./send404');


module.exports.login = async (request, response) => {
    let body = await bodyFromJSONReq(request);
    body.email = body.email.toLowerCase();

    let result = await checkCredentials(body);

    if ( !(result instanceof Error) && result === 'pass' ) {
        response.writeHead(
            200, 
             'OK', 
            {"Content-Type": "text/plain"}
            );
        response.write(`Login succesful!!!`);
        response.end();    
    } else send404(result, response);
}

module.exports.registerUser = async (request, response) => {
    let body = await bodyFromJSONReq(request);
    delete body.passwordCheck;
    delete body[''];

    body.email = body.email.toLowerCase();
    body.firstname = formatName(body.firstname);
    body.lastname = formatName(body.lastname);

    let result = await db.addDocument('brownies', body);

    console.log( await db.queryCollection('brownies', body) );

    if ( !(result instanceof Error) && result === 'pass' ) {
        response.writeHead(
            200, 
             'OK', 
            {"Content-Type": "text/plain"}
            );
        response.write(`Register succesful!!!`);
        response.end();    
    } else send404(result, response);
}

// module.exports.isLoggedIn = () => {
//     return true if logged in based on cookie
// }

function formatName(str) {
    let name = ''
    str = str.toLowerCase();
    str = str[0].toUpperCase() + str.slice(1);

    if ( str.includes(' ') ) { //if multiple names
        let arr = str.split(' ');
        for (let i = 0; i < arr.length; i++) {
            arr[i] = arr[i][0].toUpperCase() + arr[i].slice(1);
            if ( i > 0 ) arr[i] = ' ' + arr[i];
            name += arr[i];
        }
        str = name;
        name = '';
    }
    if ( str.includes('-') ) { //if multiple names '-'
        let arr = str.split('-');
        for (let i = 0; i < arr.length; i++) {
            arr[i] = arr[i][0].toUpperCase() + arr[i].slice(1);
            if ( i > 0 ) arr[i] = '-' + arr[i];
            name += arr[i];
        }
        str = name;
        name = '';
    }
    return str;
}

async function checkCredentials(obj) {
    let query = {'email' : obj.email}
    let userDB = await db.queryCollection('brownies', query);

    if (userDB instanceof Error ) {
        return userDB;
    } 
    if (userDB.length != 1 ) {
        return new Error('User not found.')
    }
    if (obj.email != userDB[0].email ) {
        return new Error('Incorrect email.');
    }
    if (obj.password != userDB[0].password) {
        return new Error('Incorrect password.');
    }
    if (obj.email == userDB[0].email 
        && obj.password == userDB[0].password) {
            return 'pass';
        }
    else return new Error('Something else went wrong.');
}

function bodyFromJSONReq(request) {
    return new Promise((resolve, reject) => { //async datastream promise
        let body = [];

        request //construct obj of chunked datastream
        .on('data', (chunk) => { 
            body.push(chunk);
        })
        .on('end', () => {
            body = Buffer.concat(body).toString();
            body = JSON.parse(body);
            resolve(body);
        })
        .on('error', (err) => {
            reject(err);
        })
    })
}

