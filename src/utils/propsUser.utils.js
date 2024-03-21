function propsUserUtils(data) {
    const { name, photo, email, password } = data;
    if (!name || !photo || !email || !password) {
      const error = new Error(`name & photo & email & password are required`);
      error.statusCode = 404;
      throw error;
    }
  }
  
  

  export default propsUserUtils;