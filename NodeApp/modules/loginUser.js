'use strict';

let errorHandler = require('./errorHandler'),
    db = require('../db'),
    session = require('./sessionHandler'),
    tool = require('./genericTools');

module.exports = async (request, response) => {

    let form = await tool.getBody(request); //body sent is the login form
    if ( errorHandler(form, request, response) ) return;

    form = JSON.parse(form); //form cleanup
    form.email = form.email.toLowerCase();

    let query = await db.queryCollection('brownies', {'email' : form.email});
    if ( errorHandler(query, request, response) ) return;

    let test = checkCredentials(form, query);
    if ( errorHandler(test, request, response) ) return;
    
    else if (test === 'pass') {
        let userId = query[0]._id; //find() always returns an array
        console.log(`UserId ${userId} logged in successfully.`);
        
        //do logged in stuff
        
        //session.createSession(userId);
        //session.getCookie

        //add cookie to responseheader 'set-cookie'
        //pipe userHomePage to responsebody
        //piping already sends response, no need to .end()

    } else { //Unexpected error
        let error = new Error('Something went wrong[3]. Please try logging in again.');
        errorHandler(error, request, response);
        return;
    }
}

function checkCredentials(form, query) {

    if (query.length != 1 ) {
        return new Error('User not found.')
    }
    if (form.email != query[0].email ) {
        return new Error('Incorrect email.');
    }
    if (form.password != query[0].password) {
        return new Error('Incorrect password.');
    }
    if (form.email == query[0].email 
        && form.password == query[0].password) {
            return 'pass';
        }
    else return new Error('Something else went wrong[2]. Please try logging in again.');
}