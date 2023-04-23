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

/*var connection = async () => {
    try {
        await mysql.connect(config)
        console.log('Conexión exitosa a la base de datos SQL Server!')
    } catch (err) {
        console.error('Error al intentar conectarse a la base de datos SQL Server:', err.message)
    }
}

connection.call();*/



//var Connection = require('tedious').Connection;

/*var config = {
    server: 'localhost',  
    authentication: {
        type: 'default',
        options: {
            userName: 'sa', //update me
            password: 'araDST2010'  //update me
        }
    },

    options: {
        // If you are on Microsoft Azure, you need encryption:
        encrypt:false,
        database: 'DSTNET/Central', 
        port:1433
    }
}

var connection = new Connection(config);
connection.on('connect', function (err) {
    console.log(err);
})

connection.connect();*/
class GestorStock {
    constructor() { }

    async getPedidos(req, res, next) {
        let article = 9;
        sql.connect(config, function (err) {
            if (err)
                console.log(err);

            var request = new sql.Request();
            request.query('Select article,amount,description,orderNumber from [Central].[dbo].[SalesOrderLine] where orderNumber >= 12', function (err, result) {

                if (err) {
                    console.log(err);
                    res.send(err);
                } else {
                    var pedidos = (result.recordset);
                    article = 87;
                }
                sql.close();
            });
        });
        await new Promise(r => setTimeout(r, 2000));
        sql.connect(config, function (err) {
            if (err)
                console.log(err);

            var request = new sql.Request();
            console.log(article);
            request.query('Select number,description1,description2 from [Central].[dbo].[Article] where Number = ' + article, function (err, result) {

                if (err) {
                    console.log(err);
                    res.send(err);
                } else {
                    res.send(result);
                }
                sql.close();
            });
        });

    }
}

module.exports = GestorStock;