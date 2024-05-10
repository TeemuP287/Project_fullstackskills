const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000; // Määritä portti, jonka Express-palvelin kuuntelee

// Määritä perustason reititys
app.get('/', (req, res) => {
  res.send('Tervetuloa Express-palvelimeen!');
});

// Käynnistä Express-palvelin
app.listen(PORT, () => {
  console.log(`Express-palvelin käynnissä portissa ${PORT}`);
});
