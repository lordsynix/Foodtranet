// script.js
const ingredientsArray = []; // Initialize an array to store ingredients



const ingredientTitle = document.getElementById('ingredientTitle');
function showIngredientTitle() {
    if (ingredientsArray.lenght > 0) {
        ingredientTitle.style.display = 'block' ;
    } else {
        ingredientTitle.style.display = 'none' ;
    }
}
showIngredientTitle();

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
            deleteButton.classList.add('delete-button'); // Apply the class

            // Append the span and button to the list item
            listItem.appendChild(ingredientSpan);
            listItem.appendChild(deleteButton);

            ingredientList.appendChild(listItem);
            inputElement.value = ''; // Clear the input field

            // Add the ingredient to the array
            ingredientsArray.push(ingredient);

            // Automatically save the updated array
            saveIngredients();
            
            if (ingredientsArray.lenght > 0) {
                ingredientTitle.style.display = 'block' ;
            } else {
                ingredientTitle.style.display = 'none' ;
            }
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
    console.log(ingredientsArray);

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

// Die Checkbox-Elementreferenzen abrufen
const vegan = document.getElementById('vegan');
const vegetarian = document.getElementById('vegetarian');
const noAllergies = document.getElementById('noAllergies');

// Ein Event-Listener hinzufügen, der auf Änderungen des Checkbox-Status reagiert
vegan.addEventListener('change', function() {
    aktualisiereCheckboxWert(vegan); // Funktion mit checkbox1 aufrufen
});

vegetarian.addEventListener('change', function() {
    aktualisiereCheckboxWert(vegetarian); // Funktion mit checkbox2 aufrufen
});

noAllergies.addEventListener('change', function() {
    aktualisiereCheckboxWert(noAllergies); // Funktion mit checkbox2 aufrufen
});


// Die Funktion einmalig aufrufen, um die initialen Werte anzuzeigen
aktualisiereCheckboxWert(vegan);
aktualisiereCheckboxWert(vegetarian);
aktualisiereCheckboxWert(noAllergies);