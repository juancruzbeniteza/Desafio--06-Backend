const errors = {
    error: { message: "Error", statusCode: 400 },
    token: { message: "Invalid Token!", statusCode: 405 },
    auth: { message: "Invalid Credentials", statusCode: 401 },
    forbidden: { message: "Forbidden", statusCode: 403 },
    notFound: { message: "Not Found", statusCode: 404 },
    fatal: { message: "Fatal", statusCode: 500 },
  };
  
  export default errors;