import crypto from "crypto";

class ProductManager {
  static #products = [];
  constructor() {
  }

  create(data) {
    try {
      const newProduct = {
        _id: crypto.randomBytes(12).toString("hex"),
        title: data.title,
        photo: data.photo,
        price: data.price,
        stock: data.stock,
      };

      if (data.title && data.photo && data.price && data.stock) {
        ProductManager.#products.push(newProduct);
        return newProduct._id;
      } else {
        throw new Error(
          "Los campos title, photo, price, stock son obligatorias"
        );
      }
    } catch (error) {
      throw error;
    }
  }

  read({ filter, sortAndPaginate }) {try {
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
        (product) => product.id === id
      );

      if(product){
        return product
      }else{
        throw new Error("No encontrado")
      }
    } catch (error) {
      throw error;
    }
    
  }

  destroy(id){
    try {
      const product = ProductManager.#products.find(
        (product) => product.id === id
      );
      if (!product) {
        throw new Error("No se encontro producto!");
      } else {
        const index = ProductManager.#products.indexOf(product);
        ProductManager.#products.splice(index, 1);
        
        return product
      }
    } catch (error) {
      throw error;
    }
  }

  update(id,data){
    try {
     const one= this.readOne(id);
     
     if(!one){
       throw new Error("No se encontro producto!")
      }else{

        const index = ProductManager.#products.indexOf(one);
          one.title= data.title || one.title,
          one.photo= data.photo || one.photo,
          one.price= data.price || one.price,
          one.stock= data.stock || one.stock,

          ProductManager.#products[index] = one;
          

        return one
      }

    } catch (error) {
      throw error
    }
  }
}

const ManagerProduct = new ProductManager();
export default ManagerProduct;