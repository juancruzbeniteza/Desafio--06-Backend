function propsUserUtils(data) {
    const { name, photo, email } = data;
    if (!name || !photo || !email) {
      const error = new Error(`El nombre, la foto y el mail son obligatorios`);
      error.statusCode = 404;
      throw error;
    }
  }
  
  

  export default propsUserUtils;