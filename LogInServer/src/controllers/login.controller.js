const mysql = require("mysql2");
var crypto = require("crypto-js");
const Usuario = require("../model/user")

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "usuariostfg"
});

class GestorUsuarios {
    constructor() { }

    getUsuarios(req, res) {
        connection.query("SELECT * FROM usuarios", function (error, result) {
            if (error) {
                console.log(error);
            } else if (result.length > 0) {
                res.send(result);
            } else { res.send({ status: 'ok', mensaje: 'Tabla vacía' }) }
        });
    }

    comprobarRegistrado(nombreUsuario, email) {
        let yaRegistrado = false;
        connection.query("SELECT * FROM usuarios where nombreusuario ='" + nombreUsuario + "' AND email='" + email + "'", function (error, result) {
            if (error) {
                console.log(error);
            } else if (result.length != 0) {
                console.log(result);
                yaRegistrado = true;
            } else {
                yaRegistrado = false;
            }
        });
        console.log(yaRegistrado);
        return yaRegistrado;
    }

    async registrarUsuario(req, res) {
        var passEncriptada = '';
        if (!(req.body.nombreUsuario && req.body.nombre && req.body.apellidos && req.body.email && req.body.pass)) {
            res.status(400).send("Se requieren todos los campos.");
        }

        //let yaRegistrado = this.comprobarRegistrado(req.body.nombreUsuario, req.body.email);

        passEncriptada = await crypto.SHA256(req.body.pass).toString();

        connection.query("SELECT * FROM usuarios where nombreusuario ='" + req.body.nombreUsuario + "' AND email='" + req.body.email + "'", function (error, result) {
            if (error) {
                console.log(error);
            } else if (result.length > 0) {
                res.status(400).send("Usuario ya registrado.")
                return;
            } else {
                connection.query("INSERT INTO usuarios (nombreusuario,nombre,apellidos,email,pass) VALUES('" +
                    req.body.nombreUsuario + "','" + req.body.nombre + "','" + req.body.apellidos + "', '" + req.body.email + "','" + passEncriptada + "'  )", function (error, result) {
                        if (error) {
                            console.log(error.message);
                            res.status(500).json({ mensaje: error.message });
                            return;
                        } else {
                            res.send({ status: 'ok', mensaje: "Registrado correctamente" });
                        }
                    });
            }
        });
    }



}


module.exports = GestorUsuarios;