var controller = require("../controllers/post.controller.js");
var cors = require('cors')
module.exports = function(app){
    
    
    app.
    use(cors()).
    //Retorna o usuario de um determinado post
    get("/api/posts/:id/usuario", controller.userPost)

    //Lista todos os posts
    .get("/api/posts", controller.listarPosts)

    //Recupera um post a partir de um id
    .get("/api/posts/:id", controller.umPost)

    //Insere um post no banco
    .post("/api/posts/",controller.addPost)

    //Update de um post
    .put("/api/posts/:id",controller.atualizaPost)

    .put("/api/posts/:id/like",controller.likePost)
    //Exclui um post especifico
    .delete("/api/posts/:id",controller.deletarPost);
}

