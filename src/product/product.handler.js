const repository = require("./product.repository");
const Product = require('./product');

const handler = (product) => {
  console.log('received product:', product)

  return Promise.resolve(repository.insert(new Product(product.id, product.type, product.name, product.version)))
}

module.exports = handler