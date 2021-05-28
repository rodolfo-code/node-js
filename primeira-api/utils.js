const fs = require('fs/promises');

async function getGame() {
  const res = await fs.readFile('./db.json', 'utf-8');
  return JSON.parse(res);
}

async function getGameById(id) {
  const resId = await fs.readFile('./db.json', 'utf-8');
  const obj = JSON.parse(resId);
  return obj.find((game) => game.id === parseInt(id));
}

async function setGame(newGame) {
  return fs.writeFile('./db.json', JSON.stringify(newGame));
}

module.exports = { getGame, getGameById, setGame };
