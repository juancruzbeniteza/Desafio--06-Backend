function propsProductUtils(data) {
    const { title, photo, price, stock } = data;
    if (!title || !photo || !price || !stock) {
      const error = new Error(`El titulo, las fotos y el stock son obligatorios`);
      error.statusCode = 404;
      throw error;
    }
  }
  

  export default propsProductUtils;