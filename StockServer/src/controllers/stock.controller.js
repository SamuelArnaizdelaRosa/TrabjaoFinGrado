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

    getPedidos(req, res,next) {
        sql.connect(config, function (err) {
            if (err)
             console.log(err);
          
            var request = new sql.Request();
            request.query('Select [Article],[Description],[Amount] from [Central].[dbo].[SalesOrderLine] where orderNumber = 13', function (err, result) {
          
              if (err) {
               console.log(err);
               res.send(err);
              }else{
                res.send(result);
              }
              sql.close();
              
             });
           });
        /*console.log("HOLA");
        try {
            // make sure that any items are correctly URL encoded in the connection string
            sql.connect(config)
            console.log("CONEXIÓN HECHA")
            const result = sql.query`SELECT * FROM [Central].[dbo].[SalesOrderLine]`

            console.dir(result)
            res.send(result);
        } catch (err) {
            res.send(err);
        }*/
    }


}




module.exports = GestorStock;