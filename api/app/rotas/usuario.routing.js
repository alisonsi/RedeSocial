var controller = require("../controllers/usuario.controller.js");
var auth = require("../controllers/auth.js");
var cors = require('cors')
module.exports = function(app){
    
    app.
    use(cors()).
    //login app
    post("/api/usuarios/logar",auth.logar)
    
    //Insere um usuario 
    .post("/api/usuarios",controller.addUsuario)

    //.use("/api/usuarios/",auth.validar)
    
    //Todos os posts de um usuário
    .get("/api/usuarios/:id/posts", controller.postUsuario)

    //Todos os posts
    .get("/api/usuarios", controller.listarUsuario)

    //Retorna um usuario a partir de um id
    .get("/api/usuarios/:id", controller.recuperarUsuario)

    //Update de um usuario
    .put("/api/usuarios",controller.atualizarUsuario)

    //Exclui um usuário
    .delete("/api/usuarios",controller.deletarUsuario)

    
    
}


