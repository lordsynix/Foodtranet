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

function searchRecipes(ingredients) {
  console.log(ingredients);
  const possibleMatches = [];
  recipes.forEach(recipe => {
    if (recipe.hasOwnProperty('search_ingredients')) {
      recipe.search_ingredients.forEach(ingredient => {
        if (ingredient == ingredients[0]) {
          possibleMatches.push(recipe);
        }
      });
    }
  });

  /*let Matches = [];
  if (possibleMatches.hasOwnProperty('ingredients')) {
    for (let j = 0; j < possibleMatches.length; j++) {
      for (let i = 1; i < ingredients.length; i++) {
        if (possibleMatches[j].includes == ingredients[i]) {
          Matches.push(possibleMatches[j]);
        }
      }
    }
  }
  console.log(Matches);*/
  console.log(possibleMatches.length, "recipes found");
  if (possibleMatches.length > 5){
    return possibleMatches.slice(0, 5);
  }
  return possibleMatches;
}

module.exports = {
  initializeRecipes,
  searchRecipes
};