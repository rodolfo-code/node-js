const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const connection = require('./database/database');
const Pergunta = require('./database/pergunta');
const Resposta = require('./database/Resposta');

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
  // metodo findAll equivale a SELECT * FROM tabela
  Pergunta.findAll({ raw: true, order: [['id', 'DESC']] }).then((perguntas) => {
    res.render('index.ejs', {
      perguntas: perguntas,
    });
  });
});

app.get('/perguntar', (req, res) => {
  res.render('perguntar.ejs');
});

app.post('/salvarPergunta', (req, res) => {
  const { titulo, descricao } = req.body;
  // o metodo create equivale ao INSERT INTO...
  // pergunta é a tabela
  Pergunta.create({
    titulo: titulo,
    descricao: descricao,
  }).then(() => {
    res.redirect('/');
  });
});

app.get('/pergunta/:id', (req, res) => {
  const { id } = req.params;
  Pergunta.findOne({
    where: { id: id },
  }).then((pergunta) => {
    if (pergunta) {
      res.render('pergunta', {
        pergunta: pergunta,
      });
    } else {
      res.redirect('/');
    }
  });
});

app.post('/responder', (req, res) => {
  const { corpo, pergunta } = req.body;
  Resposta.create({
    corpo: corpo,
    perguntaId: pergunta,
  }).then(() => {
    res.redirect(`/pergunta/${perguntaId}`);
  });
});

app.listen(8080, () => {
  console.log('App rodando');
});
