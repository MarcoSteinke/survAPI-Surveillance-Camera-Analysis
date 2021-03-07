const express = require('express');
const app = express();
const port = 3000;

const cors = require('cors');

app.use(cors());

app.get('/', (req, res) => res.json(1));
app.listen(port, () => console.log(`Example app listening on port ` + port));