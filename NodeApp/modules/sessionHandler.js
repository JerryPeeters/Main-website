'use strict';

let db = require('../db'),
    send404 = require('./send404');


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
    getCookie(response, userId) {
        //checkt eerst isLoggedIn() voor zekerheid, zo nee dan throw error.
        
        if (userId === this[userId].userId) {
            
        }
    }

    //isLoggedIn() -> checkt ook tijd, refresht voor return true. 

    //getCookie

   /* check session moet de tijd handlen. Ouder dan 30 minuten? Dan delete liveSessions[id] en redirect naar login. Dan is er geen selfdestruct nodig. 
    check sessions/loggedIn moet de tijd refreshen + een nieuwe cookie sturen voor de expires. Checken alleen aan serverside, expires in cookie
    is alleen voor de browser. Expires van cookie checken is super kwetsbaar. */

}
