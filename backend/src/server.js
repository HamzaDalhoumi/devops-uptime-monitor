const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory "database"
let services = [];
let nextId = 1;

// GET /api/health (for testing)
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// GET /api/services - list all services
app.get('/api/services', (req, res) => {
  res.json(services);
});

// POST /api/services - create a new service
app.post('/api/services', (req, res) => {
  const { name, url } = req.body;

  if (!name || !url) {
    return res.status(400).json({ message: 'name and url are required' });
  }

  const newService = {
    id: nextId++,
    name,
    url,
    status: 'UNKNOWN',
    lastCheckedAt: null,
    lastStatusCode: null,
    responseTimeMs: null
  };

  services.push(newService);
  res.status(201).json(newService);
});

// PUT /api/services/:id/check - REAL status check with HTTP request
app.put('/api/services/:id/check', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const service = services.find((s) => s.id === id);

  if (!service) {
    return res.status(404).json({ message: 'Service not found' });
  }

  const start = Date.now();

  try {
    const response = await fetch(service.url, {
      method: 'GET',
      timeout: 5000 // 5 seconds timeout
    });

    service.responseTimeMs = Date.now() - start;
    service.lastStatusCode = response.status;
    service.status = response.ok ? 'UP' : 'DOWN';
  } catch (err) {
    // Any error = DOWN
    console.error('Error checking service:', err.message);
    service.responseTimeMs = null;
    service.lastStatusCode = null;
    service.status = 'DOWN';
  }

  service.lastCheckedAt = new Date().toISOString();

  res.json(service);
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
