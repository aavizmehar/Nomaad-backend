const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const { User } = require('../models/User.model.js');
const { Host } = require('../models/Host.model.js');
const { Program } = require('../models/Program.model.js');

router.use(auth(['admin']));

router.get('/users', async (req, res) => {
  try {
    const users = await User.findAll({ attributes: ['id', 'name', 'email', 'role'] });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/hosts', async (req, res) => {
  try {
    const hosts = await Host.findAll({ include: { model: User, attributes: ['name', 'email'] } });
    res.json(hosts);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/hosts/:id/approve', async (req, res) => {
  try {
    const host = await Host.findByPk(req.params.id);
    if (!host) return res.status(404).json({ error: 'Host not found' });

    host.verified = true;
    await host.save();
    res.json({ message: 'Host approved', host });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/programs', async (req, res) => {
  try {
    const programs = await Program.findAll();
    res.json(programs);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;