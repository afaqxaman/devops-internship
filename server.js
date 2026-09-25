const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  const APP_NAME = process.env.APP_NAME || 'MyApp';
res.send(`Hello from ${APP_NAME}, Docker mein chal raha hai!`);
});

app.listen(PORT, () => {
  console.log(`Server chal raha hai port ${PORT} par`);
});