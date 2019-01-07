'use strict';

let db = require('../db'),
    send404 = require('./send404');


module.exports.login = async (request, response) => {
    let formObj = await bodyFromJSONReq(request);
    formObj.email = formObj.email.toLowerCase();

    //get userdata from DB
    let query = {'email' : formObj.email}
    let userDB = await db.queryCollection('brownies', query);

    let result = compareCredentials(formObj, userDB);
    if (result === 'pass') {
        userDB = userDB[0]; //only obj from the array
        let userId = userDB._id;
        session.createSession(userId);
       
       
       
       
        // let cookieObj = await createSessionCookieObj(userDB); //todo
        //check if cookieObj instanceof Error -> send404
        
        // let cookie = createCookie(cookieObj); //todo
        
        //add cookie to responseheader 'set-cookie'

        //pipe userHomePage to responsebody
        //piping already sends response, no need to .end()

    } else send404(result, response); //sends Error obj as response





    // if ( !(result instanceof Error) && result === 'pass' ) {
    //     response.writeHead(
    //         200, 
    //          'OK', 
    //         {"Content-Type": "text/plain"}
    //         );
    //     response.write(`Login succesful!!!`);
    //     response.end();    
    // } else send404(result, response);
    //send cookie and redirect
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


/*---------------Internal module functions---------------*/


//sessionhandler object

let session = {

    createSession(userId) {
        let cookieObj = {
            'userId': userId,
            'value': randomInt(),
            'expires': Date.now() + (1000*60*30) 
        };
        if (this[userId]) {
            delete this[userId];
        };
        this[userId] = cookieObj;
        return true;
    },
    writeCookie(response, userId) {
        if (userId === this[userId].userId) {
            
        }
    }
   /* check session moet de tijd handlen. Ouder dan 30 minuten? Dan delete liveSessions[id] en redirect naar login. Dan is er geen selfdestruct nodig. 
    check sessions/loggedIn moet de tijd refreshen + een nieuwe cookie sturen voor de expires. Checken alleen aan serverside, expires in cookie
    is alleen voor de browser. Expires van cookie checken is super kwetsbaar. */

}


async function createSessionCookieObj(userDB) {
    //session collection: browniesSessions
    let cookieObj = {
        '_id': userDB._id,
        'value': randomInt(),
        'expires': Date.now() + (1000*60*30) 
    };

    let saveCookie = await db.addDocument('browniesSessions', cookieObj);
    if (saveCookie instanceof Error
        && saveCookie.message.startsWith("E11000 duplicate key error") ) {
            console.log('duplication error')
            //duplicate error, delete document function
    } 
    else if (saveCookie === 'pass') {
        console.log('succes!');
        //return cookieObj
    } 
    else return new Error('Something else went wrong.');


    //     saveCookie = deleteDocument('browniesSessions'), 
    //                                 { '_id' : cookieObj._id };
    //     //deleteDocument should return error or 'pass'
    // } else if (saveCookie === 'pass') {
    //     return cookieObj;
    // } else return new Error('Error saving cookie')
}

function randomInt() {
    let value = Math.random();
    value = value * 1000000000000000000;
    value = Math.round(value);
    return value;
}

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

function compareCredentials(formObj, userDB) {

    if (userDB instanceof Error ) {
        return userDB;
    } 
    if (userDB.length != 1 ) {
        return new Error('User not found.')
    }
    if (formObj.email != userDB[0].email ) {
        return new Error('Incorrect email.');
    }
    if (formObj.password != userDB[0].password) {
        return new Error('Incorrect password.');
    }
    if (formObj.email == userDB[0].email 
        && formObj.password == userDB[0].password) {
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

