const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  const APP_NAME = process.env.APP_NAME || 'MyApp';
  res.send(`Hello from ${APP_NAME}, running in Docker!`);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});