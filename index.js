// Basic Express server setup
const express = require('express');
const app = express();
let port = process.env.PORT || 3000;

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Middleware for parsing JSON bodies
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.send('Century Security API is running');
});

// Function to try different ports
const startServer = (retries = 10) => {
  app.listen(port, (err) => {
    if (err) {
      if (retries > 0 && err.code === 'EADDRINUSE') {
        console.log(`Port ${port} is busy, trying port ${port + 1}`);
        port += 1;
        startServer(retries - 1);
      } else {
        console.error('Error starting server:', err);
      }
      return;
    }
    console.log(`Server is running on port ${port}`);
  }).on('error', (err) => {
    console.error('Server error:', err);
  });
};

// Start the server
startServer();

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
}); 