'use strict';

module.exports = (request, response) => {
    
    let send404 = require('./send404'),
        parsedUrl = require('url').parse(request.url),
        ext = require('path').parse(parsedUrl.pathname).ext,
        contentType = {
            '.css': 'text/css',
            '.doc': 'application/msword',
            '.html': 'text/html',
            '.ico': 'image/x-icon', 
            '.jpg': 'image/jpeg',
            '.js': 'text/javascript',
            '.json': 'application/json',
            '.mp3': 'audio/mpeg',
            '.pdf': 'application/pdf',
            '.png': 'image/png',
            '.svg': 'image/svg+xml',
            '.wav': 'audio/wav',
            '.webm': 'video/webm'
            };

    /*
    this server only serves files from ./public dir, 
    auto adds it to the pathname 
    */
    let filePath = './public' + parsedUrl.pathname;

    //directory traversal security
    if ( `${filePath}`.includes('../') ) {
        send404('You\'ve dropped this: ../', response);
        return;
    }  
    
    // /index.html redirect
    if ( request.url == '/' && request.method == 'GET' ) {
        filePath = './public/html/index.html';
        ext = '.html';
    }

    //server of files
    require('fs').createReadStream(filePath)
                 .on('error', (err) => send404(err, response ) )
                 .pipe(response);
    response.setHeader('Content-type', 
                       contentType[ext] || 'text/plain');

}