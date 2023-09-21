const ingredientsArray = []; // Initialize an array to store ingredients
const searchIngredients = [];


function addIngredient(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent form submission
        const inputElement = document.getElementById('ingredients');
        const ingredient = inputElement.value.trim();
        if (ingredient !== '') {
            const ingredientList = document.getElementById('ingredientList');
            const listItem = document.createElement('li');
            listItem.classList.add('ingredientList')

            // Create a span for the ingredient text
            const ingredientSpan = document.createElement('span');
            ingredientSpan.textContent = ingredient;

            // Create a button to delete the ingredient
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.onclick = function() {
                deleteIngredient(ingredient, listItem);
            };
            deleteButton.classList.add('deleteButton'); // Apply the class

            // Append the span and button to the list item
            listItem.appendChild(ingredientSpan);
            listItem.appendChild(deleteButton);

            ingredientList.appendChild(listItem);
            inputElement.value = ''; // Clear the input field

            // Add the ingredient to the array
            ingredientsArray.push(ingredient);
            searchIngredients.push(ingredient);

            console.log(searchIngredients);

            // Automatically save the updated array
            saveIngredients();
            
            
        }
    }
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


function clearIngredients() {
    const ingredientList = document.getElementById('ingredientList');
    ingredientList.innerHTML = ''; // Clear the list
    ingredientsArray.length = 0; // Clear the array

    // Automatically save the cleared array
    saveIngredients();
}

function saveIngredients() {
    // You can use the ingredientsArray for further processing or storage
    

    // For example, you can convert it to JSON and send it to a server
    const ingredientsJSON = JSON.stringify(ingredientsArray);
    // Then you can send 'ingredientsJSON' to your server or save it to localStorage, etc.
}


// Eine Funktion erstellen, um den Wert einer Checkbox als Boolean zu speichern und anzuzeigen
function aktualisiereCheckboxWert(checkboxElement) {
    const wertAlsBoolean = checkboxElement.checked;
    console.log(checkboxElement.id, wertAlsBoolean);
    // Hier kannst du den Wert weiterverarbeiten oder speichern
}

function searchRecipes() {
    const params = new URLSearchParams();
    params.append('ingredients', JSON.stringify(ingredientsArray));
    
    const url = `searchRecipes.html?${params.toString()}`;

    window.open(url, '_blank');
    
}

// Die Checkbox-Elementreferenzen abrufen
const vegan = document.getElementById('vegan');
const vegetarian = document.getElementById('vegetarian');
const noAllergies = document.getElementById('noAllergies');

// Ein Event-Listener hinzufügen, der auf Änderungen des Checkbox-Status reagiert
vegan.addEventListener('change', function() {
    aktualisiereCheckboxWert(vegan); 
});

vegetarian.addEventListener('change', function() {
    aktualisiereCheckboxWert(vegetarian); 
});

noAllergies.addEventListener('change', function() {
    aktualisiereCheckboxWert(noAllergies); 
});


// Die Funktion einmalig aufrufen, um die initialen Werte anzuzeigen
aktualisiereCheckboxWert(vegan);
aktualisiereCheckboxWert(vegetarian);
aktualisiereCheckboxWert(noAllergies);

fetch('http://localhost:3000/api/getIngredients')
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
                    
                    searchIngredients.push(filteredData[0]);
                    console.log(searchIngredients);
                    
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
                            listItem.removeChild(AutolistItem);
                            listItem.removeChild(deleteButton)
                        };
                        deleteButton.classList.add('deleteButton'); // Apply the class

                        
                        

                        // Append the span and button to the list item
                        inputElement.value = ''; // Clear the input field
                        

                        ingredientList.appendChild(listItem);
                        AutolistItem.textContent = item;
                        listItem.appendChild(AutolistItem);
                        AutolistItem.appendChild(deleteButton);

                        
                        
                                        
                        


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

    

