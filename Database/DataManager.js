class Recipe 
{
    constructor(id, title, instructions, ingredients, pictureLink) 
    {
      this.id = id;
      this.title = title;
      this.instructions = instructions;
      this.ingredients = ingredients;
      this.pictureLink = pictureLink;
    }
}
  
// Lese die JSON-Datei
const selectedFile = 'testData.json';

fetch(jsonFilePath)
    .then(response => response.json())
    .then(data => {
        // Zeige den JSON-Inhalt im Browser an
        fileContent.textContent = JSON.stringify(data, null, 2);
    })
    .catch(error => {
        fileContent.textContent = 'Error loading JSON file: ' + error.message;
    });
  
  // Eine Funktion, um die JSON-Daten in Recipe-Objekte umzuwandeln
  function parseRecipes(data) {
    const recipes = [];
    for (const id in data) {
      const recipeData = data[id];
      const recipe = new Recipe(
        id,
        recipeData.title,
        recipeData.instructions,
        recipeData.ingredients,
        recipeData.picture_link
      );
      recipes.push(recipe);
    }
    return recipes;
  }
  
  // Verwendung:
  const recipes = parseRecipes(jsonData);
  
  // Jetzt enthält die 'recipes'-Array alle Rezepte als Recipe-Objekte
  console.log(recipes);