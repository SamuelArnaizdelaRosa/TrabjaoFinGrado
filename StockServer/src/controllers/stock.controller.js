const sql = require("mssql");

const config = {
    authentication: {
        type: 'default',
        options: {
            userName: 'sa', //update me
            password: 'araDST2010'  //update me
        }
    },
    server: 'localhost\\DSTNET',
    database: 'Central',
    options: {
        trustServerCertificate: false,
        encrypt: false
    }
}

class GestorStock {
    constructor() { }

    getPedidos(req, res, next) {
        var pedidos;
        var orderNumber = 12;
        sql.connect(config, function (err) {
            if (err) {
                console.log(err);
            } else {
                var request = new sql.Request();
                request.query('Select article,amount,description,orderNumber from [Central].[dbo].[SalesOrderLine] where orderNumber >= ' + orderNumber + '', function (err, result) {

                    if (err) {
                        console.log(err);
                        res.send(err);
                    } else {
                        pedidos = (result.recordset);
                        res.send(pedidos);
                    }
                    sql.close();
                });
            }
        });
    }

    getProductos(req, res, next) {
        var productos;
        sql.connect(config, function (err) {
            if (err) {
                console.log(err);
            } else {
                var request = new sql.Request();
                request.query('Select number,parent,description1,description2,description3,description4 FROM [Central].[dbo].[Article]', function (err, result) {

                    if (err) {
                        console.log(err);
                        res.send(err);
                    } else {
                        productos = (result.recordset);
                        res.send(productos);

                    }
                    sql.close();
                });
            }
        });
    }

    getPrecio(req, res, next) {
        var precios;
        sql.connect(config, function (err) {
            if (err) {
                console.log(err);
            } else {
                var request = new sql.Request();
                request.query('Select article,price FROM [Central].[dbo].[ArticleTariff] where price is not null', function (err, result) {

                    if (err) {
                        console.log(err);
                        res.send(err);
                    } else {
                        precios = (result.recordset);
                        res.send(precios);
                    }
                    sql.close();
                });
            }
        });
    }
}

module.exports = GestorStock;