const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// GET endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'GET request successful!',
    timestamp: new Date().toISOString(),
    method: 'GET',
    data: {
      status: 'success',
      endpoint: '/',
      description: 'This is a test GET response'
    }
  });
});

// POST endpoint
app.post('/', (req, res) => {
  const { name, email, message } = req.body;
  
  res.json({
    message: 'POST request successful!',
    timestamp: new Date().toISOString(),
    method: 'POST',
    receivedData: {
      name: name || 'No name provided',
      email: email || 'No email provided',
      message: message || 'No message provided'
    },
    data: {
      status: 'success',
      endpoint: '/',
      description: 'Data received and processed successfully'
    }
  });
});

// Additional test endpoints
app.get('/test', (req, res) => {
  res.json({
    message: 'Test GET endpoint',
    data: {
      id: 1,
      name: 'Test Item',
      description: 'This is a test item from the server'
    }
  });
});

app.post('/test', (req, res) => {
  res.json({
    message: 'Test POST endpoint',
    receivedData: req.body,
    processed: true
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: err.message
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    requestedUrl: req.originalUrl
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log('Available endpoints:');
  console.log('  GET  / - Test GET request');
  console.log('  POST / - Test POST request');
  console.log('  GET  /test - Additional test endpoint');
  console.log('  POST /test - Additional test endpoint');
}); 