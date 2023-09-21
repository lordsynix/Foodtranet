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

fetch('autocomplete.json')
    .then(response => response.json())
    .then(data => {
        const inputField = document.getElementById('ingredients');
        const list = document.getElementById('autocomplete-list');
        
        inputField.addEventListener('input', function() {
            const inputValue = this.value.toLowerCase();
            list.innerHTML = '';

            if (inputValue.length === 0) {
                list.style.display = 'none';
                return;
            }

            const filteredData = data.filter(item => item.toLowerCase().includes(inputValue));
            
            if (filteredData.length === 0) {
                list.style.display = 'none';
                return;
            }

            filteredData.forEach(item => {
                const listItem = document.createElement('li');
                const AutolistItem = document.createElement('li');
                listItem.textContent = item;
                listItem.addEventListener('click', function() {
                    
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
                            deleteIngredient(ingredient, AutolistItem);
                        };
                        deleteButton.classList.add('delete-button'); // Apply the class

                        
                        

                        // Append the span and button to the list item
                        inputElement.value = ''; // Clear the input field
                        

                        ingredientList.appendChild(listItem);
                        AutolistItem.textContent = item;
                        listItem.appendChild(AutolistItem);
                        listItem.appendChild(deleteButton);

                        ingredientsArray.push(AutolistItem); // Add the ingredient to the array
                        


                        // Automatically save the updated array
                        saveIngredients();
                    }
                    
                });
                list.appendChild(listItem);
            });

            list.style.display = 'block';
        });

        // Hide the autocomplete list when clicking outside
        document.addEventListener('click', function(event) {
            if (event.target !== inputField && event.target !== list) {
                list.style.display = 'none';
            }
        });
    })
    .catch(error => {
        console.error('Error loading JSON data:', error);
    });
