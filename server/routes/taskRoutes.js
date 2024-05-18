const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Reitti tehtävien listaukselle
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Reitti tehtävän lisäämiselle
router.post('/', async (req, res) => {
  const { title, description, completed } = req.body;
  const task = new Task({
    title,
    description,
    completed
  });

  try {
    const newTask = await task.save();
    // Poista updated_at kenttä ennen vastauksen lähettämistä
    const { updated_at, ...taskWithoutUpdatedAt } = newTask.toObject();
    res.status(201).json(taskWithoutUpdatedAt);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Päivitetty put-reitti, joka ottaa huomioon tehtävän tilan
router.put('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Tehtävää ei löydy.' });
    }

    // Tarkistetaan, onko tehtävä muuttunut
    const isTaskModified = task.title !== req.body.title ||
                          task.description !== req.body.description ||
                          task.completed !== req.body.completed;

    if (isTaskModified) {
      task.title = req.body.title;
      task.description = req.body.description;
      task.completed = req.body.completed; // Päivitetään tehtävän tila
      task.updated_at = Date.now(); // Päivitä muokkauspäivämäärä vain jos tehtävää on muokattu
      await task.save();
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Reitti tehtävän poistamiselle
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Tehtävää ei löydy.' });
    }
    await Task.deleteOne({ _id: req.params.id });
    res.json({ message: 'Tehtävä poistettu.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;