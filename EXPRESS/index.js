const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Bem vindo ao Express');
});

app.get('/blog', (req, res) => {
  res.send('Bem vindo ao blog');
});

app.get('/canal/youtube', (req, res) => {
  res.send('<h1>Bem vindo ao meu canal</h1>');
});

app.listen(4000, (erro) => {
  if (erro) {
    console.log('Ocorreu um erro');
  } else {
    console.log('Servidor iniciado');
  }
});
