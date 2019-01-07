'use strict';

let http = require('http'),
    tool = require('./modules/genericTools'),
    port = require('./port').portnumber,
    errorHandler = require('./modules/errorHandler'),
    db = require('./db'),
    sessionHandler = require('./modules/sessionHandler');

http.createServer(requestHandler).listen(port);
console.log(`Server now running on port ${port}....`);


function requestHandler(request, response) {
    
    console.log(`[${tool.getTimeStamp()}]Request: ${request.method} ${request.url}`);
    
    if (request.url == '/login' 
        && request.method == 'POST') {
        require('./modules/loginUser')(request, response);
    }

    else if (request.url == '/register'
        && request.method == 'POST') {
        require('./modules/registerUser')(request, response);
    }
   
    /*
    basic webserver 
    send404 handler
    directory traversal security
    */
    else require('./modules/basicServer')(request, response);
}
