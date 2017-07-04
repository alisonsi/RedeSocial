var mongoose = require("mongoose");

module.exports = function(uri){
    //Recebe uma uri que indica qual o banco deve se conectar
    mongoose.connect(uri);
    
//connection.on recebe dois paramentro, um evento e uma função que seré executada quando esse evento ocorrer

    mongoose.connection.on("connected",function(){
        console.log("Servidor conectado: "+uri);
    })
    mongoose.connection.on("disconnected",function(){
        console.log("Servidor desconectado");
    })
    mongoose.connection.on("error",function(error){
        console.log("Ocorreu um erro"+error)
    })
    mongoose.set("debug",true);
};
