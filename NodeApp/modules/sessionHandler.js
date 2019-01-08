'use strict';

let db = require('../db'),
    tool = require('./genericTools');



module.exports = {

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
    setCookieHeader(response, userId) {
        //checkt eerst isLoggedIn() voor zekerheid, zo nee dan throw error.
        //set-cookie header
        if (userId === this[userId].userId) {
            
        }
        //should return response with cookie set
    },
    async isLoggedIn(request) {
        let cookie = request.headers.cookie; //untested
        console.log(cookie);
        let userId = cookie.userId;
        //get useriD, expires and value from cookie
        if (!this[userId]) return false;

        if ( this[userId].expires >= Date.now() &&
             this[userId].value === cookie.value &&
             this[userId] === cookie.userId &&
             this[userID].expires === cookie.expires ) {
                return userId;
        } else return false;
        //userId or false
    }


    //isLoggedIn() -> checkt ook tijd, refresht voor return true. 

    //checkExpires method
    //refreshExpires method

    //getCookie

   /* check session moet de tijd handlen. Ouder dan 30 minuten? Dan delete liveSessions[id] en redirect naar login. Dan is er geen selfdestruct nodig. 
    check sessions/loggedIn moet de tijd refreshen + een nieuwe cookie sturen voor de expires. Checken alleen aan serverside, expires in cookie
    is alleen voor de browser. Expires van cookie checken is super kwetsbaar. */

}
