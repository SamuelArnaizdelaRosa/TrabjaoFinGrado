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
            return;
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

    async login(req, res) {
        if (!(req.body.email && req.body.pass)) {
            res.status(400).send("Requeridos todos los campos");
            return;
        }
        var passEncriptada = await crypto.SHA256(req.body.pass).toString();

        connection.query("SELECT * FROM usuarios where email='" + req.body.email + "' AND pass='" + passEncriptada + "'", function (err, result) {
            if (err) {
                console.log(err);
                res.status(400).send("Problema con la conexión a la BBDD");
            } else if (result.length > 0) {
                const token = jwt.sign(
                    { user_id: req.body.email },
                    process.env.TOKEN_KEY,
                    {
                        expiresIn: "1m",
                    }
                );
                res.send({ status: 'ok', mensaje: 'Login correcto', token: token });
                connection.query("UPDATE usuarios set token='" + token + "' where email ='" + req.body.email + "'", function (error, result) {
                    if (error) {
                        console.log(error);
                    } else {
                        if (result.affectedRows > 0) {
                            console.log("AÑADIDO TOKEN");
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

        if (!(req.body.email && token)) {
            res.status(400).send("Requeridos todos los campos");
            return;
        }
        connection.query("SELECT * FROM usuarios where token '" + token + "' AND email='" + req.body.email + "'", function (error, result) {
            if (error) {
                res.status(400).send("Problemas con la BBDD");
            } else if (result.length > 0) {
                res.send({ status: 'ok', mensaje:'Autenticación correcta'});
            }
        })
    }
}

module.exports = GestorUsuarios;