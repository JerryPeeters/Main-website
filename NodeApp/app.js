'use strict';

let http = require('http'),
    getTimeStamp = require('./modules/getTimeStamp'),
    port = require('./port').portnumber,
    send404 = require('./modules/send404'),
    db = require('./db'),
    sessionHandler = require('./modules/sessionHandler');

http.createServer(requestHandler).listen(port);
console.log(`Server now running on port ${port}....`);


function requestHandler(request, response) {
    
    console.log(`[${getTimeStamp()}]Request: ${request.method} ${request.url}`);
    
    if (request.url == '/login' 
        && request.method == 'POST') {
        sessionHandler.login(request, response);
    }

    else if (request.url == '/register'
        && request.method == 'POST') {
        sessionHandler.registerUser(request, response);
    }
   
    /*
    basic webserver 
    send404 handler
    directory traversal security
    */
    else require('./modules/basicServer')(request, response);
}
