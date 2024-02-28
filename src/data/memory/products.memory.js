import crypto from "crypto";

class ProductManager {
  static #products = [];

  create(data) {
    try {
      // Verificar que se proporcionen todos los campos obligatorios antes de crear un nuevo producto
      if (!data.title || !data.photo || !data.price || !data.stock) {
        throw new Error("Todos los campos (título, foto, precio, stock) son obligatorios");
      }

      const newProduct = {
        id: crypto.randomBytes(12).toString("hex"),
        title: data.title,
        photo: data.photo,
        price: data.price,
        stock: data.stock,
      };

      ProductManager.#products.push(newProduct);
      return newProduct;
    } catch (error) {
      return error.message;
    }
  }

  read() {
    try {
      if (ProductManager.#products.length === 0) {
        throw new Error("No se encontraron productos");
      } else {
        return ProductManager.#products;
      }
    } catch (error) {
      return error.message;
    }
  }

  readOne(id) {
    try {
      const product = ProductManager.#products.find(
        (product) => product.id === id
      );

      if (product) {
        return product;
      } else {
        throw new Error("Producto no encontrado");
      }
    } catch (error) {
      return error.message;
    }
  }

  destroy(id) {
    try {
      const productIndex = ProductManager.#products.findIndex(
        (product) => product.id === id
      );

      if (productIndex === -1) {
        throw new Error("Producto no encontrado");
      } else {
        ProductManager.#products.splice(productIndex, 1);
        return "Producto eliminado";
      }
    } catch (error) {
      return error.message;
    }
  }

  update(id, data) {
    try {
      const existingProduct = this.readOne(id);

      if (!existingProduct) {
        throw new Error("Producto no encontrado");
      } else {
        // Actualizar solo los campos proporcionados en el parámetro `data`
        existingProduct.title = data.title || existingProduct.title;
        existingProduct.photo = data.photo || existingProduct.photo;
        existingProduct.price = data.price || existingProduct.price;
        existingProduct.stock = data.stock || existingProduct.stock;

        return "Producto actualizado";
      }
    } catch (error) {
      return error.message;
    }
  }
}

const Manager = new ProductManager();

console.log(
  Manager.create({
    title: "Manager",
    photo: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fcodigoespagueti.com%2Fnoticias%2Ftecnologia%2Fapple-recluta-ingenieros-para-comenzar-a-trabajar-en-tecnologia-6g%2F&psig=AOvVaw3RiAqygAhd3D_C_DGldjOs&ust=1708459539934000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCIi7mfOZuIQDFQAAAAAdAAAAABAE",
    price: 30,
    stock: 10,
  })
);

console.log(Manager.read());
