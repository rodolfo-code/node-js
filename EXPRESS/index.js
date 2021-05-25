const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Bem vindo ao Express');
});

app.get('/blog/:artigo?', (req, res) => {
  const { artigo } = req.params;
  if (artigo) {
    res.send(`<h2>Artigo: ${artigo} </h2>`);
  } else {
    res.send('Bem vindo ao blog');
  }
});

app.get('/canal/youtube', (req, res) => {
  const canal = req.query['canal'];

  if (canal) {
    res.send(`<h1>Bem vindo ao meu ${canal}</h1>`);
  }
  res.send('Nenhum canal fornecido');
});

app.get('/ola/:nome/:empresa', (req, res) => {
  const { nome, empresa } = req.params;
  res.send(`<h1>Oi ${nome} ${empresa}</h1>`);
});

app.get('/test', (req, res) => {
  res.send('Teste concluido');
});

app.listen(4000, (erro) => {
  if (erro) {
    console.log('Ocorreu um erro');
  } else {
    console.log('Servidor iniciado');
  }
});
