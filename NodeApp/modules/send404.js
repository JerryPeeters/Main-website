'use strict';

module.exports = (err, response) => {
        response.writeHead(
            404, 
            'Page not found', 
            {"Content-Type": "text/plain"}
            );
        response.write(`Page or file not found. The following error occurred: ${err}`);
        response.end();
        
        console.log(err);
}