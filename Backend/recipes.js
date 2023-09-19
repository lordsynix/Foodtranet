const fs = require('fs');

const recipes = [];

function initializeRecipes() {
  fs.readFile('recipes.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Fehler beim Lesen der JSON-Datei:', err);
      return;
    }

    try {
      const recipesData = JSON.parse(data);
      recipes.push(...recipesData);
      console.log('Successfully loaded', recipes.length, 'recipes');
      console.log('--------------------------------');
    } catch (parseError) {
      console.error('Fehler beim Parsen der JSON-Datei:', parseError);
    }
  });
}

module.exports = { initializeRecipes };