var express = require("express");
var cors = require('cors');
var routersPost = require("../app/rotas/post.routing.js");
var routersUsuario = require("../app/rotas/usuario.routing.js");
var bodyParser = require('body-parser');
const path = require('path');
module.exports = function(){
    
    
    var app = express();
    //app.use(cors);
    app.set("port",3000);

    var bodyParser = require('body-parser')
        app.use(bodyParser.json() );       // to support JSON-encoded bodies
        app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
        extended: false
    }));
 
    

    // quem estiver dentro da pasta public estara sendo servido pelo middleware
    app.use(express.static("../public"));
    
    routersPost(app);
    routersUsuario(app);

     app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });
    return app;
}
