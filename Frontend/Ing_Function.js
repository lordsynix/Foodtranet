// script.js
const ingredientsArray = []; // Initialize an array to store ingredients

function addIngredient(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent form submission
        const inputElement = document.getElementById('ingredients');
        const ingredient = inputElement.value.trim();
        if (ingredient !== '') {
            const ingredientList = document.getElementById('ingredientList');
            const listItem = document.createElement('li');
            listItem.textContent = ingredient;
            ingredientList.appendChild(listItem);
            inputElement.value = ''; // Clear the input field

            // Add the ingredient to the array
            ingredientsArray.push(ingredient);

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

function saveIngredients() {
    // You can use the ingredientsArray for further processing or storage
    console.log(ingredientsArray);

    // For example, you can convert it to JSON and send it to a server
    const ingredientsJSON = JSON.stringify(ingredientsArray);
    // Then you can send 'ingredientsJSON' to your server or save it to localStorage, etc.
}
