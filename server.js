const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware для парсинга данных из POST-запроса
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Обработчик POST-запроса для регистрации пользователя
app.post('/api/register', (req, res) => {
  const { username, email, password } = req.body;
  console.log('New user registered:', { username, email, password });
  res.send('User registered successfully');
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});