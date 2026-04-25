// Controller for handling flag-related requests
const FeatureFlag = require('../models/feature_flag');

async function createFlag(req, res) {
  try {
    const flag = new FeatureFlag(req.body);
    flag.projectId = req.project.id;
    // Save to database (implementation depends on your DB)
    res.status(201).json(flag);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function updateFlag(req, res) {
  try {
    const flag = await getFlag(req.params.id);
    if (!flag) return res.status(404).json({ error: 'Flag not found' });
    flag.update(req.body);
    res.json(flag);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function listFlags(req, res) {
  try {
    // Fetch all flags for project
    res.json(await getProjectFlags(req.project.id));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getFlag(req, res) {
  try {
    const flag = await getFlag(req.params.id);
    if (!flag) return res.status(404).json({ error: 'Flag not found' });
    res.json(flag);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { createFlag, updateFlag, listFlags, getFlag };
