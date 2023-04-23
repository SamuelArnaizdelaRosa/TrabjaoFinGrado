const mysql = require("mssql");

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
      trustServerCertificate: true,
      encrypt:false
    }
  }
  
  var connection = async function() {
    try {
      await mysql.connect(config)
      console.log('Conexión exitosa a la base de datos SQL Server!')
    } catch (err) {
      console.error('Error al intentar conectarse a la base de datos SQL Server:', err.message)
    }
  }

  connection.call();
  
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

   getPedidos(req, res) {
        /*connection.query("SELECT * FROM SalesOrderLine", function (error, result) {
            if (error) {
                console.log(error);
            } else if (result.length > 0) {
                res.send(result);
            } else { res.send({ status: 'ok', mensaje: 'Tabla vacía' }) }
        });*/


    }


}

module.exports = GestorStock;