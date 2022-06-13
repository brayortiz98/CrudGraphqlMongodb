// Comenzamos traendo el modelo de datos
const Article = require("../models/article");

// Exportamos las funciones que resolverá las peticiones
module.exports = {
  // Esta función es para los querys
  articles: async () => {
    try {
      // creamos una constante que mediante find me trae todo el arreglo de registros
      const articlesFetched = await Article.find();
      // Hacemos un map al arreglo y creamos otro arreglo pero con los datos que queremos mostrar
      return articlesFetched.map((article) => {
        return {
          ...article._doc,
          _id: article.id,
          createdAt: new Date(article._doc.createdAt).toISOString(),
        };
      });
    } catch (error) {
      throw error;
    }
  },

  // Esta otra función es para el mutation
  createArticle: async (args) => {
    try {
      // Creamos un objeto a partir de los args que son los que mandamos
      const { title, body } = args.article;
      // Creamos el objeto article con el objeto anterior
      const article = new Article({
        title,
        body,
      });
      // Hacemos un await guardando el articulo creado con save
      const newArticle = await article.save();
      // Retornamos un objeto con el resultado del await y el id
      return { ...newArticle._doc, _id: newArticle.id };
    } catch (error) {
      throw error;
    }
  },

  deleteArticle: async (id) => {
    try {
      const deletedPost = await Post.findByIdAndDelete(id);
      return {
        ...deletedPost._doc,
        _id: deletedPost.id,
        createdAt: new Date(deletedPost._doc.createdAt).toISOString(),
      }
    } catch (error) {
      throw error
    }
  },
};
