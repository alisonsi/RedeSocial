var http = require("http");
var db = require("./config/database.js");
var app = require("./config/express.js")();

//criando um servidor com express escutando na porta especificada
http.createServer(app).listen(app.get("port"),function(){
    console.log("escutando na porta"+app.get("port"));
})

//Conexão com o banco, caso o banco nao existe ele é criado
db("mongodb://127.0.0.1/redesocial");


