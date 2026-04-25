const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');

// Helper to get project id from API key
async function getProjectId(apiKey) {
  const { data, error } = await supabase
    .from('projects')
    .select('id')
    .eq('api_key', apiKey)
    .single();
  if (error) return null;
  return data.id;
}

// GET /flags - list flags for the project
router.get('/', async (req, res) => {
  const projectId = await getProjectId(req.apiKey);
  if (!projectId) return res.status(403).json({ error: 'Invalid API key' });

  const { data, error } = await supabase
    .from('feature_flags')
    .select('*')
    .eq('project_id', projectId);
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// POST /flags - create a new flag
router.post('/', async (req, res) => {
  const projectId = await getProjectId(req.apiKey);
  if (!projectId) return res.status(403).json({ error: 'Invalid API key' });
  const { name, description, default_value } = req.body;
  const { data, error } = await supabase
    .from('feature_flags')
    .insert({
      name,
      description,
      default_value,
      project_id: projectId,
    })
    .single();
  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json(data);
});

module.exports = router;
