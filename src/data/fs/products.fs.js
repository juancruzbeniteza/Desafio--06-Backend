import fs from "fs";

class ProductManager {
  static #products = [];

  constructor() {
    this.path = "./src/data/fs/files/products.json";
    this.conf = "utf-8";
    this.init();
  }

  init() {
    const exist = fs.existsSync(this.path);
    if (exist) {
      ProductManager.#products = JSON.parse(
        fs.readFileSync(this.path, this.conf)
      );
    } else {
      fs.writeFileSync(this.path, JSON.stringify([], null, 2));
    }
  }

  create(data) {
    try {
      ProductManager.#products.push(data);

      fs.writeFileSync(
        this.path,
        JSON.stringify(ProductManager.#products, null, 2)
      );
      return data._id;
    } catch (error) {
      throw error;
    }
  }

  read({ filter, sortAndPaginate }) {
    try {
        let filteredProducts = ProductManager.#products;
        if (filter) {
            filteredProducts = filteredProducts.filter(product => product.name.toLowerCase().includes(filter.name.toLowerCase()));
        }

        if (sortAndPaginate) {
            const { page = 1, limit = 10, sort } = sortAndPaginate;
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;
            if (sort) {
                filteredProducts = filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
            }
            filteredProducts = filteredProducts.slice(startIndex, endIndex);
        }

        if (filteredProducts.length === 0) {
            throw new Error("No se encontraron productos!");
        }
        return filteredProducts;
    } catch (error) {
        throw error;
    }
}

  readOne(id) {
    try {
      const product = ProductManager.#products.find(
        (product) => product._id === id
      );
      if (!product) {
        throw new Error("No se encontro producto!");
      } else {
        return product;
      }
    } catch (error) {
      throw error
    }
  }

  destroy(id){
    try {
      const product = ProductManager.#products.find(
        (product) => product._id === id
      );
      if (!product) {
        throw new Error("No se encontro producto!");
      } else {
        const index = ProductManager.#products.indexOf(product);
        ProductManager.#products.splice(index, 1);
        fs.writeFileSync(
          this.path,
          JSON.stringify(ProductManager.#products, null, 2)
        );
        return product
      }
    } catch (error) {
      throw error
    }
  }

  update(id,data){
    try {
     const one= this.readOne(id);

      if(!one){
        throw new Error("No se encontro producto!")
      }else{
          one.title= data.title || one.title,
          one.photo= data.photo || one.photo,
          one.price= data.price || one.price,
          one.stock= data.stock || one.stock,

        fs.writeFileSync(
          this.path,
          JSON.stringify(ProductManager.#products, null, 2)
        );

        return one
      }

    } catch (error) {
      throw error
    }
  }
}

const ManagerProduct = new ProductManager();
export default ManagerProduct;