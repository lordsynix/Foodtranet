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
            deleteButton.onclick = function() {
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


// script.js

// Get the input field and the datalist
const ingredientsInput = document.getElementById('ingredients');
const ingredientList = document.getElementById('ingredientDataList');

// Handle the input event
function autocomplete() {
    const inputValue = ingredientsInput.value.toLowerCase();

    // Clear the previous autocomplete options
    ingredientList.innerHTML = '';

    // Filter and add matching options from the list
    for (const option of ingredientList.options) {
        const optionValue = option.value.toLowerCase();
        if (optionValue.includes(inputValue)) {
            const newOption = document.createElement('option');
            newOption.value = option.value;
            ingredientList.appendChild(newOption);
        }
    }
}

// Handle selecting an autocomplete option
ingredientsInput.addEventListener('change', function() {
    const selectedIngredient = ingredientsInput.value;
    if (selectedIngredient) {
        // You can do something with the selected ingredient here
        console.log('Selected ingredient: ' + selectedIngredient);
    }
});
