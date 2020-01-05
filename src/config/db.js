var mysql = require('mysql2');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'usuario',
    password: 'senha',
    database: 'banco',
    debug    :  false,
    multipleStatements: true
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;

/*
var dbConn;
async function conectar(){
	dbConn = await mysql.createConnection({
		    host: 'localhost',
		    user: '',
		    password: '',
		    database: '',
	        port: '3306'
	});
	dbConn.connect(function(err){
		try{
			if (err) throw err;
			console.log("conectado!");
		}catch(err){
			//res.json({error:err});
			//conectar()

			setTimeout(function(){ conectar() }, 1000);
			console.log("NAO conectado!");
		}
	})
}
conectar()
*/
