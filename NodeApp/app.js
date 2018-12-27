'use strict';

let http = require('http'),
    getTimeStamp = require('./modules/getTimeStamp'),
    port = require('./port').portnumber,
    send404 = require('./modules/send404'),
    db = require('./db');

http.createServer(requestHandler).listen(port);
console.log(`Server now running on port ${port}....`);


function requestHandler(request, response) {
    //log request in console
    console.log(`[${getTimeStamp()}]Request: ${request.method} ${request.url}`);
    
    if (request.url == '/database') {
        let collection = db.printCollection('droplet01', 'brownies')
        response.writeHead(
            200, 
            'OK', 
            {"Content-Type": "text/plain"}
            );
        response.write(collection);
        response.end();
    }
   
    /*
    basic webserver 
    send404 handler
    directory traversal security
    */
    else require('./modules/basicServer')(request, response);
}
