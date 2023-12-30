# NodeServer

NodeServer is a versatile and user-friendly Node.js server class designed for efficiently serving static files. 
Whether you are developing a web application or hosting static content, NodeServer provides a flexible and customizable 
solution for handling HTTP requests. 
It supports both callback and event-driven approaches, giving you the freedom to choose the server startup method that suits your needs.

## Table of Contents

- [Key Features](#key-features)
- [Usage](#usage)
- [Configuration](#configuration)
- [Usage as a Package](#usage-as-a-package)
- [Requirements](#requirements)
- [Installation](#installation)
- [License](#license)

## Key Features

- **Flexibility**: Choose between callback and event-driven methods to start the server.
- **Dynamic Configuration**: Easily set the server's port, startup method, and a base file for root URL access.
- **Error Handling**: The server intelligently prevents reading the favicon.ico file and responds gracefully to any file read errors.
- **Content Type Handling**: Automatically determines and sets the content type based on file extensions, providing a seamless experience for serving various file types.
- **Well-Documented**: The code is extensively commented for easy understanding and integration.

## Usage

```javascript
const NodeServer = require('./NodeServer');

// Start the server using the callback method
const serverCallback = new NodeServer(5000, 'startServer_callback');

// Start the server using the event-driven method
const serverEvent = new NodeServer(5001, 'startServer_event');

// Listen for the 'listening' event and log a message
serverCallback.on('listening', (port, method) => {
  console.log(`Server listening on port ${port} using ${method}-driven approach.`);
});

serverEvent.on('listening', (port, method) => {
  console.log(`Server listening on port ${port} using ${method}-driven approach.`);
});
```

## Configuration

- `port`: The port on which the server listens (default: 5000).
- `startMethod`: The method to start the server ('startServer_callback' or 'startServer_event', default: 'startServer_callback').
- `baseFile`: The base file to serve when the root URL is accessed (default: 'index.html').

## Usage as a Package

If using NodeServer as a package, ensure it is installed using npm:

```bash
npm install nodeserver-package
```

Then, you can import and use it in your project:

```javascript
const NodeServer = require('nodeserver-package');
// ... (rest of the code remains the same)
```

## Requirements

- Node.js installed.

## Installation

To use NodeServer in your project, you can clone the repository or install it as a package via npm:

```bash
npm install nodeserver-package
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
