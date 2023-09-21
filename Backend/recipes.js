const fs = require('fs');

const recipes = [];
const indexedRecipes = {};

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

      recipes.forEach(recipe => {
        if (recipe.hasOwnProperty('search_ingredients')) {
          recipe.search_ingredients.forEach(ingredient => {
            if (!indexedRecipes[ingredient]) {
              indexedRecipes[ingredient] = [];
            }
            if (!indexedRecipes[ingredient].includes(recipe)) {
              indexedRecipes[ingredient].push(recipe);
            }
          });
        }
      });

      console.log("Indexed recipes");
      console.log('--------------------------------');
    } catch (parseError) {
      console.error('Fehler beim Parsen der JSON-Datei:', parseError);
    }
  });
}

function searchRecipes(ingredients) {
  console.log(ingredients);

  const matchingRecipes = findMatchingRecipes(ingredients);

  return matchingRecipes;
}

function findMatchingRecipes(ingredients) {
  const matchingRecipes = [];

  // Durchlaufen Sie alle Rezepte
  for (const recipe of recipes) {
    const recipeIngredients = recipe.search_ingredients || [];

    // Zählen Sie die Übereinstimmungen der Zutaten in diesem Rezept
    let matchCount = 0;
    for (const ingredient of ingredients) {
      if (recipeIngredients.includes(ingredient)) {
        matchCount++;
      }
    }

    // Fügen Sie das Rezept zur Liste der Übereinstimmungen hinzu
    matchingRecipes.push({
      recipe: recipe,
      matchCount: matchCount,
    });
  }

  // Sortieren Sie die Rezepte nach der Anzahl der Übereinstimmungen in absteigender Reihenfolge
  matchingRecipes.sort((a, b) => b.matchCount - a.matchCount);

  for (i = 0; i < 5; i++) {
    console.log(matchingRecipes[i].matchCount, "/", ingredients.length ,"ingredients matching");
  }
  // Wählen Sie die besten 5 Rezepte aus
  const top5Recipes = matchingRecipes.slice(0, 5).map(item => item.recipe);

  return top5Recipes;
}

module.exports = {
  initializeRecipes,
  searchRecipes
};