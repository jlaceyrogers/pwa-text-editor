// Import required modules
const express = require('express');

// Create an Express application
const app = express();

// Define the port for the server to listen on
const PORT = process.env.PORT || 3000;

// Serve static files from the 'dist' directory of the client
app.use(express.static('../client/dist'));

// Parse URL-encoded data and JSON data in requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Import and configure HTML routes
const htmlRoutes = require('./routes/htmlRoutes');
htmlRoutes(app);

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is now listening on port: ${PORT}`);
});
