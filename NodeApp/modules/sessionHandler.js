'use strict';

let db = require('../db'),
    tool = require('./genericTools');



module.exports = {

    createSession(userId) {
        delete this[userId];
        this[userId] = {
            'userId': userId,
            'checksum': tool.randomInt(),
            'expires': Date.now() + (1000*60*30)
        };
        return true;
    },
    setCookieHeader(response, userId) {
        let expiresUTC = new Date(this[userId].expires).toUTCString();
        let cookie = `userId=${userId}+${this[userId].checksum}-; expires=${expiresUTC}; path="/"`;      
        response.setHeader('Set-Cookie', cookie);
        return response;
    },
    isLoggedIn(request) {
        let cookie = tool.parseCookie(request.headers.cookie);

        if (cookie instanceof Error) {
            console.log(`Error parsing cookie: ${cookie}`);
            return false;
        };

        let userId = cookie.userId;
        let checksum = cookie.checksum;

        if (!this[userId]) return false;

        if ( this[userId].expires >= Date.now() &&
            this[userId].checksum === +checksum ) {
                return true;
        } else return false;
    }
    //to do: refreshSession(userId)



    //isLoggedIn() -> checkt ook tijd, refresht voor return true. 

    //checkExpires method
    //refreshExpires method

    //getCookie

   /* check session moet de tijd handlen. Ouder dan 30 minuten? Dan delete liveSessions[id] en redirect naar login. Dan is er geen selfdestruct nodig. 
    check sessions/loggedIn moet de tijd refreshen + een nieuwe cookie sturen voor de expires. Checken alleen aan serverside, expires in cookie
    is alleen voor de browser. Expires van cookie checken is super kwetsbaar. */

}
