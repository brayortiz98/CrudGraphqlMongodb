// Traemos las dependencias necesarias
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
const graphqlSchema = require("./schema/index");
const graphqlResolvers = require("./resolvers/index");

// Instanciamos Express, necesario en toda aplicación Express
const app = express();

// Declaramos el endpoint y comos egundo parámetro el esquema y resolver de graphQL
app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    graphiql: true,
  })
);
// Este es el uri para la conexion a MongoDB se trae desde Mongo Atlas
// Usamos process.env para obtener los valores desde Nodemon
const uri = `mongodb+srv://brayan98:Chicharitoortiz98@cluster0.arbvl.mongodb.net/?retryWrites=true&w=majority`;

// Declaramos las opciones para mongoose
const options = { useNewUrlParser: true, useUnifiedTopology: true };

// Usamos mongose para conectarnos al uri con las opciones y entonces escucharlas en el puerto 3000 usando app
mongoose
  .connect(uri, options)
  .then(() => app.listen(3000, console.log("Server is running")))
  .catch((error) => {
    throw error;
  });
