const ProductRepository = require('./product.repository')

describe("ProductRepository", () => {
  it("has some products", () => {
    return expect(ProductRepository.fetchAll()).resolves.toHaveLength(3);
  })
});
