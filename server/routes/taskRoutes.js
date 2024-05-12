// server/routes/taskRoutes.js
const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Reitti tehtävien listaukselle
router.get('/', async (req, res) => {
  // ...
});

// Reitti tehtävän lisäämiselle
router.post('/', async (req, res) => {
  // ...
});

// Reitti tehtävän poistamiselle
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Tehtävää ei löydy.' });
    }
    await task.remove();
    res.json({ message: 'Tehtävä poistettu.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Reitti tehtävän päivittämiselle
router.patch('/:id', async (req, res) => {
    try {
      const task = await Task.findById(req.params.id);
      if (!task) {
        return res.status(404).json({ message: 'Tehtävää ei löydy.' });
      }
      task.title = req.body.title;
      task.description = req.body.description;
      task.completed = req.body.completed;
      await task.save();
      res.json(task);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

module.exports = router;
