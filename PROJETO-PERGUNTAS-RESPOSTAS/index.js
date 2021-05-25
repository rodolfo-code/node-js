const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const connection = require('./database/database');

connection
  .authenticate()
  .then(() => {
    console.log('Conexão feita com banco de dados');
  })
  .catch((err) => {
    console.log(err);
  });

// Estou dizendo para o Express usar o EJS como View Engine
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.render('index.ejs');
});

app.get('/perguntar', (req, res) => {
  res.render('perguntar.ejs');
});

app.post('/salvarPergunta', (req, res) => {
  const titulo = req.body.titulo;
  const descricao = req.body.descricao;
  res.send(`Formulário recebido! titulo: ${titulo}, descricao: ${descricao}`);
});

app.listen(8080, () => {
  console.log('App rodando');
});
