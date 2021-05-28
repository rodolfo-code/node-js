const express = require('express');
const bodyParser = require('body-parser');
const { getGame, getGameById, setGame } = require('./utils');

const app = express();

app.use(bodyParser.json());

app.get('/games', async (req, res) => {
  const response = await getGame();
  res.status(200).send(response);
});

app.get('/game/:id', async (req, res) => {
  const { id } = req.params;
  if (isNaN(id)) {
    res.sendStatus(400);
  } else {
    const response = await getGameById(id);
    if (!response) {
      res.sendStatus(404);
    }
    res.status(200).send(response);
  }
});

app.post('/game', async (req, res) => {
  const { id, title, price, year } = req.body;
  if ([title, price, year, id].includes(undefined)) {
    return res.sendStatus(401);
  }
  const response = await getGame();

  if (response.find((item) => item.id === id)) {
    return res.send({ message: 'id already exists' });
  }
  response.push({ id, title, price, year });
  console.log(response);
  await setGame(response);
  res.sendStatus(200);
});

app.delete('/game/:id', async (req, res) => {
  const { id } = req.params;
  if (isNaN(id)) {
    res.sendStatus(400);
  } else {
    const response = await getGame();
    const index = response.findIndex((i) => i.id === parseInt(id));
    if (index === -1) {
      res.sendStatus(404);
    } else {
      response.splice(index, 1);
      await setGame(response);
      res.sendStatus(200);
    }
  }
});

app.put('/game/:id', async (req, res) => {
  const { id } = req.params;
  const { title, price, year } = req.body;
  const response = await getGame();
  const index = response.findIndex((i) => i.id === parseInt(id));

  if (isNaN(id)) {
    res.sendStatus(400);
  } else if (index === -1) {
    res.sendStatus(404);
  } else {
    const editGame = { ...response[index], title, price, year };
    const newList = response.map((game) =>
      game.id !== parseInt(id) ? game : editGame,
    );
    await setGame(newList);
    res.sendStatus(200);
  }
});

app.listen(3000, () => {
  console.log('App rodando na porta 3000');
});
