const http = require("http");
const fs = require("fs");
const path = require("path");
const EventEmitter = require('events');
const util = require('util');

class NodeServer extends EventEmitter {
  // Constructor for the NodeServer class
  constructor(port = 5000, startMethod = 'startServer_callback', baseFile = 'index.html') {
    super();  // Call the constructor of the EventEmitter class
    this.port = port;  // Set the port property
    this.baseFile = baseFile;  // Set the base file property

    // Determine the start method dynamically
    if (startMethod === 'startServer_callback') {
      this.createServerCallback();  // Start server using callback method
    } else if (startMethod === 'startServer_event') {
      this.createServerEvent();  // Start server using event method
    } else {
      throw new Error('Invalid startMethod. Use "startServer_callback" or "startServer_event".');
    }
  }

  // Method to create server using callback approach
  createServerCallback() {
    const server = http.createServer(this.handleRequest.bind(this));
    
    // Start the server and emit 'listening' event
    server.listen(this.port, () => {
      this.emit('listening', this.port, 'callback');
    });
  }

  // Method to create server using event-driven approach
  createServerEvent() {
    const server = http.createServer();

    // Event listener for the 'request' event
    server.on('request', (req, res) => {
      this.handleRequest(req, res);
    });

    // Start the server and emit 'listening' event
    server.listen(this.port, () => {
      this.emit('listening', this.port, 'event');
    });
  }

  // Method to handle HTTP requests
  handleRequest(req, res) {
    // console.log(util.inspect(req, { depth: 0 }));
    const fileExtension = path.extname(req.url).slice(1);
    const requestedFile = req.url === '/' ? `/${this.baseFile}` : req.url;
    if(requestedFile !== '/favicon.ico'){
      fs.readFile(`.${requestedFile}`, (err, data) => {
        if (err) {
          this.handleError(res);
        } else {
          const contentType = this.getContentType(fileExtension);
          this.sendResponse(res, data, contentType);
        }
      });
    }
  }

  // Method to handle errors and send a generic 500 Internal Server Error response
  handleError(res) {
    res.writeHead(500, { 'content-type': 'text/html' });
    res.end('<html><body><h1>Internal Server Error</h1></body></html>');
  }

  // Method to get the content type based on file extension
  getContentType(fileExtension) {
    switch (fileExtension) {
      case 'css':
        return 'text/css';
      case 'js':
        return 'text/javascript';
      default:
        return 'text/html';
    }
  }

  // Method to send an HTTP response with specified content type
  sendResponse(res, data, contentType) {
    res.writeHead(200, { 'content-type': contentType });
    res.end(data);
  }
}

// Code to run when this script is executed directly
if (require.main === module) {
  const startServerCallback = new NodeServer(5000, 'startServer_callback');
  const startServerEvent = new NodeServer(5001, 'startServer_event');

  // Listen for the 'listening' event and log a message
  startServerCallback.on('listening', (port, method) => {
    console.log(`Server listening on port ${port} using ${method}-driven approach.`);
  });

  startServerEvent.on('listening', (port, method) => {
    console.log(`Server listening on port ${port} using ${method}-driven approach.`);
  });
}

// Export the NodeServer class for use in other modules
module.exports = NodeServer;
