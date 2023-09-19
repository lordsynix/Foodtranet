const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { initializeRecipes } = require('./recipes.js');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(cors());

initializeRecipes();

app.post('/api/searchRecipes', (req, res) => {
  const { ingredients } = req.body;

  console.log('Api called');
  console.log(ingredients);
  res.json({ ingredients });
  console.log('--------------------------------');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});