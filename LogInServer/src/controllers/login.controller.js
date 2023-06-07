const mysql = require("mysql2");
const jwt = require("jsonwebtoken");
var crypto = require("crypto-js");

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

    async registrarUsuario(req, res) {
        var passEncriptada = '';
        if (!(req.body.nombreUsuario && req.body.nombre && req.body.apellidos && req.body.email && req.body.pass)) {
            res.status(204).send("Se requieren todos los campos.");
            return;
        }

        passEncriptada = await crypto.SHA256(req.body.pass).toString();

        connection.query("SELECT * FROM usuarios where nombreusuario ='" + req.body.nombreUsuario + "' OR email='" + req.body.email + "'", function (error, result) {
            if (error) {
                console.log(error);
            } else if (result.length > 0) {
                res.send({status:'fail',mensaje:'Usuario ya registrado'})
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

    async login(req, res) {
        if (!(req.body.email && req.body.pass)) {
            res.status(204).send("Requeridos todos los campos");
            return;
        }
        var passEncriptada = await crypto.SHA256(req.body.pass).toString();

        connection.query("SELECT * FROM usuarios where email='" + req.body.email + "' AND pass='" + passEncriptada + "'", function (err, result) {
            if (err) {
                console.log(err);
                res.status(500).send("Problema con la conexión a la BBDD");
            } else if (result.length > 0) {
                const token = jwt.sign(
                    { user_id: req.body.email },
                    process.env.TOKEN_KEY,
                    {
                        expiresIn: "2h",
                    }
                );
                res.send({ status: 'ok', mensaje: 'Login correcto', token: token });
                connection.query("UPDATE usuarios set token='" + token + "' where email ='" + req.body.email + "'", function (error, result) {
                    if (error) {
                        console.log(error);
                    } else {
                        if (result.affectedRows > 0) {
                            console.log("AÑADIDO TOKEN");
                        }else{
                            console.log("NO AÑADIDO TOKEN");
                        }
                    }
                })
            } else {
                res.send({ status: 'fail', mensaje: 'Email o contraseña incorrectos' });
            }
        });
    }

    comprobarToken(req, res) {
        const token =
            req.body.token || req.query.token || req.headers["x-access-token"];

        if (!token) {
            res.status(204).send("Requeridos todos los campos");
            return;
        }
        connection.query("SELECT * FROM usuarios where token= '" + token + "'", function (error, result) {
            if (error) {
                res.status(500).send("Problemas con la BBDD");
            } else if (result.length > 0) {
                res.send(result);
            }else{
                res.send({ status: 'fail', mensaje: 'No hay usuarios con este token' });
            }
        })
    }
}

module.exports = GestorUsuarios;