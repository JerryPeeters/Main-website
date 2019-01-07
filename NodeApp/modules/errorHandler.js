'use strict'

module.exports = (err, request, response) => {
    if ( err instanceof Error ) {
        response.writeHead(
            404, 
            'Unspecified error occurred', 
            {"Content-Type": "text/plain"}
            );
        response.write(`The following error occurred: ${err}`);
        response.end();
        console.log(err);
        return true
    } else return false;
}