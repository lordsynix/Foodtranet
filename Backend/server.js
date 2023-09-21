const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const { initializeRecipes, searchRecipes } = require('./recipes.js');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(cors());

initializeRecipes();

app.post('/api/searchRecipes', (req, res) => {
  const { ingredients } = req.body;

  console.log('Api called');
  const response = searchRecipes(ingredients);

  res.json({ response });
  console.log('--------------------------------');
});

app.get('/api/getIngredients', (req, res) => {
  const filePath = 'ingredients.json';

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Fehler beim Lesen der Datei:', err);
      res.status(500).send('Interner Serverfehler');
      return;
    }
    console.log('ingredients data sent');
    res.send(data);
  });
});

app.get('/api/getRecipes', (req, res) => {
  const filePath = 'testData.json';

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Fehler beim Lesen der Datei:', err);
      res.status(500).send('Interner Serverfehler');
      return;
    }
    console.log('raw recipes data sent');
    res.send(data);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});