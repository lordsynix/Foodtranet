const urlParams = new URLSearchParams(window.location.search);
const dataArrayString = urlParams.get('ingredients');

const data = JSON.parse(dataArrayString);
let ingredients = [];

data.forEach(ingredient => {
    ingredients.push(ingredient.toLowerCase());
});

console.log(ingredients);


fetch('http://localhost:3000/api/searchRecipes', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ingredients }),
})
    .then((response) => response.json())
    .then((data) => {
        // Hier kannst du die Antwort auswerten, die vom Server zurückgegeben wird.
        console.log('Antwort vom Server:', data);

        // Annahme: data enthält ein Array von Rezepten
        const recipesContainer = document.getElementById('recipes-container');

        // Durchlaufen Sie die Rezepte und erstellen Sie für jedes ein HTML-Element
        data.response.forEach((recipe) => {
            const recipeDiv = document.createElement('div');
            recipeDiv.classList.add('recipe');

            const title = document.createElement('h2');
            title.textContent = recipe.title; // Angenommen, die Response enthält das Feld "title"

            const ingredientsList = document.createElement('ul');
            recipe.ingredients.forEach((ingredient) => {
                const listItem = document.createElement('li');
                listItem.textContent = ingredient;
                ingredientsList.appendChild(listItem);
            });

            const instructions = document.createElement('p');
            instructions.textContent = recipe.instructions; // Angenommen, die Response enthält das Feld "instructions"

            recipeDiv.appendChild(title);
            recipeDiv.appendChild(ingredientsList);
            recipeDiv.appendChild(instructions);

            recipesContainer.appendChild(recipeDiv);
        });

        // Setzen der Ladeleiste auf 100% und ausblenden
        progressBar.style.width = '100%';
        progressBar.style.display = 'none';
    })
    .catch((error) => {
        console.error('Fehler bei der Anfrage:', error);
    });

const progressBar = document.querySelector('.bar');
let progress = 0;

function updateProgressBar() {
    if (progress < 100) {
        progress++;
        progressBar.style.width = `${progress}%`;
        progressBar.setAttribute('data-progress', progress); // Setzen Sie das Attribut data-progress
    } else {
        clearInterval(interval);
        progressBar.style.display = 'none'
    }
}

const interval = setInterval(updateProgressBar, 1000);
