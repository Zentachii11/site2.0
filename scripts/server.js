const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pool = require('./db');
const app = express();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

function verifyToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Отсутствует токен' });
  }

  jwt.verify(token.split(' ')[1], 'secret_key1', (err, decoded) => {
    if (err) {
      console.error('Ошибка верификации токена:', err);
      return res.status(401).json({ message: 'Невалидный токен' });
    } else {
      req.user_id = decoded.user.id;
      next();
    }
  });
}

app.post('/checkToken', (req, res) => {
  const token = req.body.token;

  if (!token) {
    return res.status(401).json({ message: 'Отсутствует токен' });
  }

  jwt.verify(token, 'secret_key1', (err, decoded) => {
    if (err) {
      console.error('Ошибка верификации токена:', err);
      return res.status(401).json({ message: 'Невалидный токен' });
    } else {
      return res.status(200).json({ message: 'Токен верифицирован' });
    }
  });
});

app.post('/register', async (req, res) => {
  try {
    const { login, email, password } = req.body;

    const client = await pool.connect();

    const query = `
      SELECT * FROM users
      WHERE username = $1
    `;
    const values = [login];

    const result = await client.query(query, values);

    if (result.rows.length > 0) {
      res.status(409).send('Пользователь с таким логином уже существует');
    } else {
      bcrypt.hash(password, 10, async (err, hashedPassword) => {
        if (err) {
          console.error('Ошибка хэширования пароля:', err);
          res.status(500).send('Ошибка сервера');
        } else {
          const insertQuery = `
            INSERT INTO users (username, email, password)
            VALUES ($1, $2, $3)
            RETURNING id
          `;
          const insertValues = [login, email, hashedPassword];

          const insertionResult = await client.query(insertQuery, insertValues);
          const insertedUserId = insertionResult.rows[0].id;

          const user = {
            id: insertedUserId,
            username: login,
          };

          jwt.sign({ user }, 'secret_key1', { expiresIn: '24h' }, (err, token) => {
            if (err) {
              console.error('Ошибка создания токена:', err);
              res.status(500).send('Ошибка создания токена');
            } else {
              res.json({ token });
            }
          });
        }
      });
    }

    client.release();
  } catch (err) {
    console.error('Ошибка регистрации:', err);
    res.status(500).send('Произошла ошибка при регистрации');
  }
});




app.post('/login', async (req, res) => {
  try {
    const { login, password } = req.body;

    const client = await pool.connect();

    const query = `
      SELECT * FROM users
      WHERE username = $1
    `;
    const values = [login];

    const result = await client.query(query, values);

    if (result.rows.length === 0) {
      res.status(401).send('Неверный логин или пароль');
    } else {
      const storedPassword = result.rows[0].password;

      bcrypt.compare(password, storedPassword, (err, bcryptRes) => {
        if (err) {
          console.error('Ошибка сравнения паролей:', err);
          res.status(500).send('Ошибка сервера');
        } else {
          if (bcryptRes) {
            const user = {
              id: result.rows[0].id,
              username: login,
            };

            jwt.sign({ user }, 'secret_key1', { expiresIn: '24h' }, (err, token) => {
              if (err) {
                console.error('Ошибка создания токена:', err);
                res.status(500).send('Ошибка создания токена');
              } else {
                res.json({ token });
              }
            });
          } else {
            res.status(401).send('Неверный логин или пароль');
          }
        }
      });
    }

    client.release();
  } catch (err) {
    console.error('Ошибка авторизации:', err);
    res.status(500).send('Произошла ошибка при авторизации');
  }
});

app.get('/userProfile', verifyToken, async (req, res) => {
  try {
    const userId = req.user_id;

    const client = await pool.connect();

    const query = `
      SELECT username
      FROM users
      WHERE id = $1
    `;

    const values = [userId];

    const result = await client.query(query, values);
    const userProfile = result.rows[0];

    if (!userProfile) {
      return res.status(404).json({ error: 'Профиль пользователя не найден' });
    }

    res.status(200).json(userProfile);
    
    client.release();
  } catch (error) {
    console.error('Ошибка при получении профиля пользователя:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});



app.post('/addComputer', async (req, res) => {
  try {
    const { title, description, gpu, cpu, cooling, ram, price, price_per_month } = req.body;

    const client = await pool.connect();

    const query = `
      INSERT INTO computers (title, description, gpu, cpu, cooling, ram, price, price_per_month)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `;

    const values = [title, description, gpu, cpu, cooling, ram, price, price_per_month];
    const result = await client.query(query, values);
    const insertedComputer = result.rows[0];
    res.status(201).json({ message: 'ПК успешно добавлен', computer: insertedComputer });
    client.release();
  } catch (error) {
    console.error('Ошибка при добавлении ПК:', error.message);
    res.status(500).send('Ошибка сервера');
  }
});

app.get('/computers', async (req, res) => {
  try {
    const client = await pool.connect();

    const query = `
      SELECT * FROM computers
    `;

    const result = await client.query(query);
    const computers = result.rows;

    res.json({ computers });

    client.release();
  } catch (error) {
    console.error('Ошибка при получении данных о компьютерах:', error.message);
    res.status(500).send('Ошибка сервера');
  }
});

app.delete('/deleteComputer/:id', async (req, res) => {
  try {
    const computerId = req.params.id;
    const result = await pool.query('DELETE FROM computers WHERE id = $1', [computerId]);
    res.status(200).json({ message: 'Компьютер успешно удален' });
  } catch (error) {
    console.error('Ошибка при удалении компьютера:', error);
    res.status(500).send('Ошибка сервера');
  }
});




app.post('/createOrder', verifyToken, async (req, res) => {
  let client;
  try {
    const { computer_id, customer_name, email, phone_number, delivery_address, payment_method } = req.body;

    client = await pool.connect();

    const query = `
      INSERT INTO orders (user_id, computer_id, customer_name, email, phone_number, delivery_address, payment_method)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;

    const values = [req.user_id, computer_id, customer_name, email, phone_number, delivery_address, payment_method];
    const result = await client.query(query, values);
    const insertedOrder = result.rows[0];
    await client.query('COMMIT');
    res.status(201).json({ message: 'Заказ успешно создан', order: insertedOrder });
  
  } catch (error) {
    if (client) {
      await client.query('ROLLBACK');
      client.release();
    }
    console.error('Ошибка при создании заказа:', error.message);
    res.status(500).send('Ошибка сервера');
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
