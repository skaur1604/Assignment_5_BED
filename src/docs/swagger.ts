import swaggerJsdoc from "swagger-jsdoc";

export const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: { title: "RecipeHub API", version: "1.0.0" },
  },
  apis: ["./routes/*.js", "./validation/*.js"],
};

export const swaggerSpec = swaggerJsdoc(swaggerOptions);
