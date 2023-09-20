// script.js

// Initialize an array to store ingredients
const ingredientsArray = [];

function addIngredient(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent form submission
        const inputElement = document.getElementById('ingredients');
        const ingredient = inputElement.value.trim();
        if (ingredient !== '') {
            const ingredientList = document.getElementById('ingredientList');
            const listItem = document.createElement('li');

            // Create a span for the ingredient text
            const ingredientSpan = document.createElement('span');
            ingredientSpan.textContent = ingredient;

            // Create a button to delete the ingredient
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.onclick = function () {
                deleteIngredient(ingredient, listItem);
            };
            deleteButton.classList.add('delete-button'); // Apply the class

            // Add the ingredient to the array
            ingredientsArray.push(ingredient);

            // Append the span and button to the list item
            listItem.appendChild(ingredientSpan);
            listItem.appendChild(deleteButton);

            ingredientList.appendChild(listItem);
            inputElement.value = ''; // Clear the input field


            // Automatically save the updated array
            saveIngredients();
        }
    }
}

function clearIngredients() {
    const ingredientList = document.getElementById('ingredientList');
    ingredientList.innerHTML = ''; // Clear the list
    ingredientsArray.length = 0; // Clear the array

    // Automatically save the cleared array
    saveIngredients();
}

function deleteIngredient(ingredient, listItem) {
    const ingredientList = document.getElementById('ingredientList');
    const index = ingredientsArray.indexOf(ingredient);
    if (index !== -1) {
        ingredientsArray.splice(index, 1); // Remove the ingredient from the array
        ingredientList.removeChild(listItem); // Remove the ingredient from the list

        // Automatically save the updated array
        saveIngredients();
    }
}

function saveIngredients() {
    // You can use the ingredientsArray for further processing or storage
    console.log(ingredientsArray);

    // For example, you can convert it to JSON and send it to a server
    const ingredientsJSON = JSON.stringify(ingredientsArray);
    // Then you can send 'ingredientsJSON' to your server or save it to localStorage, etc.
}

// Laden der JSON-Datei
fetch('http://localhost:3000/ingredients.json')
    .then(response => response.json())
    .then(data => {
        // Hier haben Sie Zugriff auf die Liste der möglichen Zutaten in der 'data'-Variablen
        const possibleIngredients = data;

        const inputElement = document.getElementById('ingredients');

        autocomplete({
            input: inputElement,
            minLength: 1, // Mindestanzahl von Zeichen, um Vorschläge anzuzeigen
            fetch: function (text, update) {
                text = text.toLowerCase();
                // Filtern Sie Zutaten, die den eingegebenen Text enthalten
                const suggestions = possibleIngredients.filter(ingredient => ingredient.toLowerCase().includes(text));
                update(suggestions);
            },
            onSelect: function (item) {
                // Wird aufgerufen, wenn der Benutzer einen Vorschlag auswählt
                inputElement.value = item;
            }
        });
    })
    .catch(error => console.error('Fehler beim Laden der JSON-Datei:', error));


