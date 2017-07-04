var mongoose = require("mongoose");

module.exports = function(){
    let schema = mongoose.Schema({
        data:{
            type:Date,
            required:true            
        },
        nomeUser:{
            type:String,
            required:true
        },
        texto:{
            type:String,
            required:true
        },
        likes:{
            type:Number
        },
        uid:{
            type:mongoose.Schema.ObjectId,
            required:true,
        },
        cid:{
            type:[]
        },
        lid:{
            type:[]
        }
    });
    return mongoose.model("Post",schema); // o mongoose sempre irá procurar pelo o plural do nome do modelo e em minusculo
}();