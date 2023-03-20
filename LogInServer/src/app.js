require("dotenv").config();
const express = require("express");
const router = require("../src/routers/login.routers");
const errorHandler = require("../src/errors/errorHandling");

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(router);

server.use(function (req, res) {
    res.status(404).json({
        error: true,
        codigo: 404,
        mensaje: "No se encuentra el recurso"
    })
});

server.use(errorHandler);

module.exports = server;