function propsProductUtils(data) {
    const { title, price, stock } = data;
    if (!title || !price || !stock) {
      const error = new Error(`title & price & stock are required`);
      error.statusCode = 404;
      throw error;
    }
  }
  

  export default propsProductUtils;