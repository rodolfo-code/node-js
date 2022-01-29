module.exports = function recursoIndevidoError(
  message = 'Você nao tem credenciais necessárias para acessar esse recurso',
) {
  this.name = 'RecursoIndevidoError';
  this.message = message;
};
