require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/pagos',   require('./routes/pagos'));

app.listen(port, () => {
  console.log(`SERVER INICIADO EN EL PUERTO ${port}`)
});