module.exports = function ValidatorError(message) {
  this.name = 'ValidationError';
  this.message = message;
};
