/* A load balancer is an application that distribute request to different machine [CPU core] 
 
 * There are several method to achieving load balancing in an application. 
 * Also, note that load balancing is different from server clustering.
 * 1. Using cluster module
 * 2. Nginx and Haproxy 
 * 3. Using express
  
 * In this simple and basic application, cluster module will be used because it is good for horizontal scaling or scale out. A sample application to test is the generation of an RSA key [encryption algotithm] using express and crypto module
*/

const express = require('express');
const cluster = require('cluster');
const { generateKeyPair } = require('crypto');

const numCPUs = require('os').cpus().length;

const app = express();
const PORT = 3000;

// For Master process
if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);
    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    // This event is first when worker died
    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });
}
// For Worker
else {
    // Workers can share any TCP connection
    // In this case it is an HTTP server
    app.listen(PORT, err => {
        err ?
            console.log("Error in server setup") :
            console.log(`Worker ${process.pid} started`);
    });
    // API endpoint
    // Send public key
    app.get('/key', (req, res) => {
        generateKeyPair('rsa', {
            modulusLength: 2048,
            publicKeyEncoding: {
                type: 'spki',
                format: 'pem'
            },
            privateKeyEncoding: {
                type: 'pkcs8',
                format: 'pem',
                cipher: 'aes-256-cbc',
                passphrase: 'top secret'
            }
        }, (err, publicKey, privateKey) => {

            // Handle errors and use the
            // generated key pair.
            res.send(publicKey);
        })
    })
}
