const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.static(__dirname)); // Statische Dateien im aktuellen Verzeichnis servieren

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

/*initializeServer();

function initializeServer() {
  // initialize Server
  console.log('Server is being initialized...');

  initializeRecipes()

  // start the server
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}*/