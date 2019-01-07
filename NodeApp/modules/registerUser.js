'use strict';

let errorHandler = require('./errorHandler'),
    db = require('../db'),
    tool = require('./genericTools');


module.exports = async (request, response) => {
    let body = await tool.getBody(request);
    if ( errorHandler(body, request, response) ) return;
    
    let user = JSON.parse(body); //cleaning the user obj
    delete user.passwordCheck; 
    delete user[''];
    user.email = user.email.toLowerCase();
    user.firstname = tool.formatName(user.firstname);
    user.lastname = tool.formatName(user.lastname);

    //add user to db
    let added = await db.addDocument('brownies', user); 
    if ( errorHandler(added, request, response) ) return;

    response.writeHead(
        200, 
        'OK', 
        {"Content-Type": "text/plain"}
        );
    response.write(`Register succesful!!!`);
    response.end();    
}