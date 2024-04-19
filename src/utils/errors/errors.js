const errors = {
  message: (message) => ({ message, statusCode: 400 }),
  passCb: (message, statusCode) => ({ message, statusCode }),
  error: { message: "Error", statusCode: 405 },
  existPass:{ message: "User already exists", statusCode:401 },
  auth: { message: "Invalid credentials", statusCode: 406 },
  forbidden: { message: "Forbidden", statusCode: 403 },
  notFound: { message: "Not Found docs", statusCode: 404 },
  fatal: { message: "Fatal", statusCode: 500 },
};

export default errors;