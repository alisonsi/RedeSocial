var Usuarios = require("../models/usuario.model.js");
var Post = require("../models/post.model.js");
var jwt = require("jsonwebtoken");

//module.exports.myPosts = posts;

module.exports.listarPosts = function(req,res){
    var query = Post.find().sort({data:'desc'});
    var promise = query.exec();
    
    promise.then(
        function(post){
            res.status("200").json(post);
    })
    //res.json(posts);
};


// busca o post a partir do id passado, e depois busca o usuario dono desse post
module.exports.userPost = function(req,res){
   
    var idPost = req.params.id;
    var myPost = Post.findOne({_id:idPost}).exec()    
    myPost.then(
        function(post){
            Usuarios.findOne({_id:post.uid}).exec().then(
                function(user){
                    res.status(200).json(user);
                }
            )
        }
    )

}

//retorna o post com o id passado
module.exports.umPost = function(req,res){
 
    var id = req.params.id;

    var query = Post.findById(id);
    var promise = query.exec();

    promise.then(
        function(post){            
            if(post){
                res.status(200).json(post);
            }else{
                res.status(404).send("Not Found");
            }

        }
        
        )
}
//insere o post no banco

module.exports.addPost = function(req,res){
    
    try{
    var data = dataDaPostagem();
    var usuario =  jwt.verify(req.query.token,"atividadePiw");
    console.log(usuario)
    var meuPost = new Post({
        data:data,
        nomeUser: req.body.nomeUser,
        texto: req.body.texto,
        likes: 0,
        uid: usuario.user._id,
        cid:[],
        lid:[]
    })


    var promise = Post.create(meuPost);
    promise.then(
        function(post){
            res.status(201).json(post);
        },
        function(erro){
            res.status(500).json(erro);
        }
    )}catch(err){
        console.log(err)
        res.status(500).json(err)
    }

}


//atualiza um post
module.exports.atualizaPost = function(req,res){
    var usuario = jwt.verify(req.query.token,"atividadePiw");
    var id = req.params.id;

    Post.findOne({_id:id}).exec().then(
        function(post){
            console.log(post)
            console.log(usuario)
            if(post){
                if(post.uid != usuario.user._id){
                    res.status(400).send("Você não é dono desse post");
                }else{
                    var meuPost = new Post({
                        _id: post._id,
                        texto: req.body.texto,
                        likes: post.likes,
                        uid: post.uid,
                        cid: post.cid
                        
                    })

                    var query = Post.update({"_id":id},meuPost);

                        var promise = query.exec();

                        promise.then(
                            function(post){
                                if(post){
                                    res.status(200).json(post);
                                }else{
                                    res.status(400).send("Post nao encontrado");
                                }
                            },
                            function(erro){
                                res.status(500).json(erro);

                            }
                        )
                }
            }
            else{
                res.status(400).send("Post não encontrado");
            }
        },
        function(){
            res.status(401).send("Error");
        }
    );

    
   
}

module.exports.likePost = function(req,res){
    var idPost = req.params.id;
    var idUsuario = req.query.idUsuario;
    console.log(idPost)
    console.log(idUsuario)
    var likesPost = [];
    likesPost.push(idUsuario);
        var myPost = Post.findOne({_id:idPost}).exec()    
        myPost.then(
            function(data){
                var contLikes = 1;
                
                likesPost = data.lid;
                var contens = likesPost.indexOf(idUsuario);

                if(contens != -1){
                    //Se já curtiu eu removo o id do usuario do array
                    likesPost.splice(contens,1);
                    contLikes = -1;
                }else{
                    //Se ainda não curtiu, apenas adiciono no array.
                    likesPost.unshift(idUsuario);
                } 
                 try {
                        var likes = data.likes;
                        
                        //contLikes irá conter 1 ou -1 
                        Post.update(
                            { "_id" :idPost },
                            { $set: { "likes" : likes + contLikes, "lid":likesPost } }
                        ).exec().then(
                            function(post){
                                if(post){
                                    //retorna 1 ou -1
                                    res.status(200).json({like:contLikes});
                                }else{
                                    res.status(400).send("Post nao encontrado");
                                }
                            },
                            function(erro){
                                res.status(500).json(erro);

                            })                
                        } catch (e) {
                        console.log(e)
                        }                           
            })
             
        

                   
       
}
// remove um post do banco
module.exports.deletarPost = function(req,res){
    var usuario = jwt.verify(req.query.token,"atividadePiw");
    
    var id = req.params.id;


    Post.findOne({_id:id}).exec().then(
        function(post){
           
            if(post){                                    
                if(post.uid != usuario.user._id){
                    res.status(400).json({
                        permisão: "Permissão negada",
                        message:"Você não é dono desse post"
                    });
                }else{
                    console.log("aq2")

                    var query = Post.remove({_id:id});

                        var promise = query.exec();

                        promise.then(
                            function(post){
                                if(post){
                                    res.status(200).json({
                                        data:post,
                                        message:"Post excluido com sucesso"
                                    });
                                }else{
                                    res.status(400).send("Post nao encontrado");
                                }
                            },
                            function(erro){
                                res.status(500).json(erro);

                            }
                        )
                }
            }
            else{
                res.status(400).send("Post não encontrado");
            }
        },
        function(){
            res.status(401).send("Error");
        }
    );


}
function dataDaPostagem(){
   var data1 = new Date();
    var data2 = new Date(      
      data1.getFullYear(),
      data1.getMonth(),
      data1.getDate(),
      data1.getHours(),
      data1.getMinutes(),
      data1.getSeconds()
    )
    return data2;
}