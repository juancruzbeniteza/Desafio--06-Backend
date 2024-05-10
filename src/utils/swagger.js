import __dirname from "../../utils.js";

const swaggerOptions = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Ecommerce",
      description: "Documentation of API"
    },
  },
  apis: [`${__dirname}/src/docs/*.yaml`]
};

export default swaggerOptions;