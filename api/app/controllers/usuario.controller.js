var Posts = require("../models/post.model.js");
var Usuario = require("../models/usuario.model.js");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var auth = require("../controllers/auth.js")


//lista todos os usuarios
module.exports.listarUsuario = function(req,res){
    var query = Usuario.find();
    var promise = query.exec();
    
    promise.then(
        function(usuarios){
            res.status(200).json(usuarios);
        }
    )

};

//retorna os post de um determinado usuário
module.exports.postUsuario = function(req,res){
    var idUser = req.params.id;
    var query = Posts.find({uid:idUser});
    var promise = query.exec();

    promise.then(
        function(posts){
            res.status(200).json(posts);
        }
    )
}

//recupara um usuario
module.exports.recuperarUsuario = function(req,res){
    
   var id = req.params.id;

    var query = Usuario.findOne({_id:id})
    var promise = query.exec(); 
   
    promise.then(
        function(usuario){
            console.log(usuario)
            res.status(200).json(usuario);
        },
        function(erro){
            res.status(500).send(erro);
        }

    )

}
//insere um usuario 
module.exports.addUsuario = function(req,res){
    var usuario = new Usuario({
        nome: req.body.nome,
        email:req.body.email,
        senha:bcrypt.hashSync(req.body.senha,10)
    });

    var promise = Usuario.create(usuario);

    promise.then(
        function(user){
                var token = jwt.sign({user},"atividadePiw" );
                res.status(200).json({
                message: "autenticado com sucesso",
                token: token,
                idUsuario: user._id
            })
        },
        function(erro){
            res.status(500).send(erro);
        }
    )

}

//atualiza um usuario
module.exports.atualizarUsuario = function(req,res){
    var d = jwt.verify(req.query.token,"atividadePiw");
    var id = d._doc._id;
    var usuario = new Usuario({
        _id:id,
        nome: req.body.nome,
        email: req.body.email,
        senha: bcrypt.hashSync(req.body.senha,10)
    })

    var query = Usuario.update({_id:id},usuario);
    var promise = query.exec();

    promise.then(
        function(usuario){
            res.status(200).json(usuario);
        },
        function(erro){
            res.status(500).send(erro);
        }
    )    
    
}
//remove um usuario
module.exports.deletarUsuario = function(req,res){
    
    var d = jwt.verify(req.query.token,"atividadePiw");
    var id = d._doc._id;

    var query = Usuario.remove({_id:id});
    var promise = query.exec();
    
    promise.then(
        
         function(usuario){
            res.status(200).json(usuario);
        },
        function(err){
            res.status(500).send(erro);
        }

    )

}
