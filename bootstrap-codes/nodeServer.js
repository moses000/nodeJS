const http = require("http");

class NodeServer {
  // This method starts the server using a callback function. It listens on the specified port; the default is 5000.
  constructor(port = 5000, toStart = 'startServer_callback') {
    this.port = port;
    toStart ? this.startServer_callback() : this.startServer_event();
  }

  // This method starts a server using an event listener. It listens on the specified port; the default is 8000.
  startServer_event() {
    http.createServer().on('request', (request, res) => {
      res.writeHead(200, { 'content-type': 'application/json' });
      res.end(JSON.stringify({ data: "This is a bootstrap code to start a simple server using an event listener" }));
    }).listen(this.port, () => {
      console.log(`Server listening on port ${this.port} using an event listener.`);
    });
  }

  // This method starts the server using a callback function. It listens on the specified port; the default is 5000.
  startServer_callback() {
    http.createServer((req, res) => {
      res.writeHead(200, { 'content-type': 'application/json' });
      res.end(JSON.stringify({ data: "This is a bootstrap code to start a simple server using a callback" }));
    }).listen(this.port, () => {
      console.log(`Server listening on port ${this.port} using a callback function.`);
    });
  }
}

// Check if the script is the main module being run
if (require.main === module) {
  const startServer = new NodeServer(5000);
}

module.exports = NodeServer;
