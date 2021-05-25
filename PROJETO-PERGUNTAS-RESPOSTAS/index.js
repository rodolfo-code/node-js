const express = require('express');

const app = express();

// Estou dizendo para o Express usar o EJS como View Engine
app.set('view engine', 'ejs');

app.get('/:nome/:lang', (req, res) => {
  const { nome, lang } = req.params;
  const exibirMsg = true;
  res.render('index.ejs', {
    nome: nome,
    lang: lang,
    empresa: 'Guia do Programador',
    inscritos: 8000,
    msg: exibirMsg,
  });
});

app.listen(8080, () => {
  console.log('App rodando');
});
