// script.js
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
        }
    }
}

function clearIngredients() {
    const ingredientList = document.getElementById('ingredientList');
    while (ingredientList.firstChild) {
        ingredientList.removeChild(ingredientList.firstChild);
    }
}
