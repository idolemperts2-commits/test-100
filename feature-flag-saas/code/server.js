const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const supabase = require('./config/supabase');
const flagsRouter = require('./routes/flags');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Simple API key auth middleware
app.use((req, res, next) => {
  const auth = req.headers['authorization'];
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing API key' });
  }
  const apiKey = auth.slice('Bearer '.length).trim();
  req.apiKey = apiKey;
  next();
});

app.use('/flags', flagsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Feature Flag SaaS API listening on port ${PORT}`));
