const searchIngredients = []; // Create an emty array

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

function storeInput(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent form submission
        const inputElement = document.getElementById('ingredientInput');
        const ingredient = inputElement.value.trim();
        if (ingredient !== '') {
            addIngredientToTable(ingredient);
            addIngredientToArray(ingredient);
            inputElement.value = '';
        }
    }
}

function addIngredientToTable(ingredient) {
    // Erstellen Sie eine <tr>-Zeile
    const row = document.createElement('tr');

    // Erstellen Sie eine <td>-Zelle für das Element
    const cell1 = document.createElement('td');
    cell1.textContent = ingredient;

    // Erstellen Sie eine <td>-Zelle für den Button
    const cell2 = document.createElement('td');
    const button = document.createElement('button');
    button.textContent = 'Delete'; 
    button.addEventListener('click', function() {
        deleteIngredient(ingredient); 
    });
    cell2.appendChild(button);

    row.setAttribute('id', ingredient)
    row.classList.add('ingredientRow');

    // Add cells to the rows
    row.appendChild(cell1);
    row.appendChild(cell2);

    // Add the row to the table
    document.getElementById('ingredientTable').appendChild(row);
}

function updateArray() {
    console.log(searchIngredients);
}

function addIngredientToArray(ingredient) {
    searchIngredients.push(ingredient);
    updateArray();
}

function deleteIngredient(ingredient) {
    var rowId = document.getElementById(ingredient);
    var i = rowId.parentNode.parentNode.parentNode.rowIndex;
    document.getElementById('ingredientTable').deleteRow(i)
    searchIngredients.splice(searchIngredients.indexOf(ingredient), 1)
    updateArray();
}

function clearIngredients() {
    // Holen Sie sich die Tabelle, die Sie löschen möchten, z.B. mit einer ID
    const table = document.getElementById('ingredientTable'); // Ersetzen Sie 'meineTabelle' durch die tatsächliche ID Ihrer Tabelle

    if (table) {
        // Durchlaufen Sie die Zeilen der Tabelle von unten nach oben und löschen Sie sie
        for (let i = table.rows.length - 1; i >= 0; i--) {
            table.deleteRow(i);
        }
    }

    searchIngredients.length = 0; // Clear the array
    updateArray();
}

fetch('http://localhost:3000/api/getIngredients')
    .then(response => response.json())
    .then(data => {
        const inputField = document.getElementById('ingredientInput');
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
                listItem.textContent = item;
                
                listItem.addEventListener('click', function() {
                    addIngredientToTable(filteredData[0]);
                    addIngredientToArray(filteredData[0]);
                    const inputElement = document.getElementById('ingredientInput');
                    inputElement.value = '';
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
