const Products = (sequelize, DataTypes) => {
  return sequelize.define('Products', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
  });
};

module.exports = Products;
