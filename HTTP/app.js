const http = require('http');

http
  .createServer((req, res) => {
    res.end('<h1>Iniciando</h1>');
  })
  .listen(8181);
console.log('Servidor rodando');
