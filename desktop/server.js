const express = require('express');
const Server = express();
const PORT = 9000;

// host server with express using 'PORT' variable
Server.listen(PORT, '0.0.0.0', (err)=>{
    if (err) throw err;
    console.log(`bidirectional-media-transfer: Listening on port ${PORT}`);
});


// Handle GET requests on '/' route
// return a '200' status code response with a body that reads 'Connection successful!'
Server.get('/', (req, res) => {
    res.statusCode(200).send("Connection successful!");
});