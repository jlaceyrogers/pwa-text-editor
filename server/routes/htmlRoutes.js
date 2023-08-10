const path = require('path');

// Export a function that sets up the HTML route
module.exports = (app) => {
  // Define a route to handle requests to the root URL
  app.get('/', (req, res) => {
    // Build the file path to the 'index.html' in the 'dist' directory
    const indexPath = path.join(__dirname, '../client/dist/index.html');
    
    // Send the 'index.html' file as the response
    res.sendFile(indexPath);
  });
};
