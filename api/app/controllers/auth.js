var Usuario = require("../models/usuario.model.js");
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');



module.exports.logar =  function(req,res){

var query =  Usuario.findOne({email:req.body.email}).exec().then(logar,erro);


function logar(user){
        if(!user){         
        userNotFound = 0;
         erro(userNotFound);
        }if(!bcrypt.compareSync(req.body.senha,user.senha)){
            erro("senha incorreta");
        }else{
            //retornando um token para a view
           var token = jwt.sign({user},"atividadePiw" );
           res.status(200).json({
                message: "autenticado com sucesso",
                token: token,
                idUsuario: user._id
            })
        }

}
function erro(err){
    res.status(401).json(err);
} 
}
module.exports.validar =  function(req,res,next){
    
 jwt.verify(req.query.token,"atividadePiw", function(err,decode){
        if(err){
        return  res.status(401).json({
                title:"Usuário não autenticado",
                error:err
            });
        }if(decode){
            console.log(decode._doc)
        }

       next();
    })
}