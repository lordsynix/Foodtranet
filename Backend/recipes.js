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

/*function searchRecipes(ingredients) {

  // Filtern Sie die Rezepte, die das erste gegebene Ingredient enthalten
  const possibleMatches = recipes.forEach(recipe => {
    recipe.ingredients.includes(ingredients[0]);
  });

  const matchingRecipes = possibleMatches.forEach(possibleMatch => {
    recipe.ingredients.includes(ingredients);
  })

  console.log(matchingRecipes);
}*/

function searchRecipes(ingredients) {

  // Filtern Sie die Rezepte, die das erste gegebene Ingredient enthalten

  console.log(ingredients);
  const possibleMatches = [];
  recipes.forEach(recipe => {
    if (recipe.hasOwnProperty('ingredients')) {
      recipe.ingredients.forEach(ingredient => {
        if (ingredient == ingredients[0]) {
          possibleMatches.push(recipe);
        }
      });
    }
  });
  /*const Matches = [];
  if (possibleMatches.hasOwnProperty('ingredients')) {
    for (let i = 1; i < ingredients.length; i++) {
      for (let j = 0; j < possibleMatches.length; j++) {
      if (possibleMatches[j].includes == ingredients[i]) {
        Matches.push(possibleMatches[j]);
      }
      }


    }
  }
  */
  const Matches = [];
  if (possibleMatches.hasOwnProperty('ingredients')) {
    for (let j = 0; j < possibleMatches.length; j++) {
      for (let i = 1; i < ingredients.length; i++) {
        if (possibleMatches[j].includes == ingredients[i]) {
          Matches.push(possibleMatches[j]);
        }
      }
    }
  }
}


          console.log(Matches);
          console.log(possibleMatches);
          return Matches[0];
        

        module.exports = {
          initializeRecipes,
          searchRecipes
        };