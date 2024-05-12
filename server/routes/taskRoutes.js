// taskRoutes.js
const express = require('express');
const router = express.Router();

// Reitti tehtävien listaukselle
router.get('/', (req, res) => {
  // Haetaan tehtävät tietokannasta ja lähetetään ne vastauksena
});

// Reitti tehtävän lisäämiselle
router.post('/', (req, res) => {
  // Lisätään uusi tehtävä tietokantaan
});

// ...

module.exports = router;
