const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

app.use(bodyParser.json());

const registry = {};

//  curl -X POST http://localhost:3001/register -H "Content-Type: application/json" -d '{"name": "service1", "version": "1.0", "host": "localhost", "port": 8080}'
// Register a new service
app.post('/register', (req, res) => {
  const { name, version, host, port } = req.body;
  if (!name || !version || !host || !port) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const serviceId = `${name}-${version}-${host}:${port}`;
  registry[serviceId] = {
    name: name,
    version: version,
    host: host,
    port: port,
    timestamp: Date.now()
  };

  res.status(200).json({ message: 'Service registered successfully.' });
});

//curl -X POST http://localhost:3001/deregister \-H "Content-Type: application/json" \-d '{"name": "service1", "version": "1.0", "host": "localhost", "port": 8080}'
// Deregister a service
app.post('/deregister', (req, res) => {
  const { name, version, host, port } = req.body;
  if (!name || !version || !host || !port) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const serviceId = `${name}-${version}-${host}:${port}`;
  if (registry[serviceId]) {
    delete registry[serviceId];
    res.status(200).json({ message: 'Service deregistered successfully.' });
  } else {
    res.status(404).json({ message: 'Service not found.' });
  }
});


//http://localhost:3001/discover?serviceName=product-service
// Discover services by name
app.get('/discover', (req, res) => {
  const { serviceName } = req.query;
  const services = Object.values(registry).filter(service => service.name === serviceName);
  if (services.length > 0) {
    res.status(200).json(services);
  } else {
    res.status(404).json({ message: 'Service not found.' });
  }
});

// List all services
app.get('/services', (req, res) => {
  res.status(200).json(Object.values(registry));
});


// Handle 404 for undefined routes
app.use((req, res) => {
  res.status(404).send('Not found');
});

app.listen(port, () => {
  console.log(`Service registry listening on port ${port}`);
});
