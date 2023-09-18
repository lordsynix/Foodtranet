const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.static(__dirname)); // Statische Dateien im aktuellen Verzeichnis servieren

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});