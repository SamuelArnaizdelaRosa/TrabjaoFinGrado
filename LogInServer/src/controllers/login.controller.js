const mysql = require("mysql2");
const Usuario = require("../model/user")

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "usuariostfg"
});

class GestorUsuarios{
    constructor(){}

    getUsuarios(req,res){
        connection.query("SELECT * FROM usuarios", function(error,result){
            if(error){
                console.log(error);
            }else if(result.length>0){
                res.send(result);
            }else{res.send({status:'ok',mensaje:'Tabla vacía'})}
        });
    }
    
    
}


module.exports = GestorUsuarios;