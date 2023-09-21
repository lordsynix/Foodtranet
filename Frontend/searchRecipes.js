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
