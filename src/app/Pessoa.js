var dbConn = require("../config/db");
module.exports = {
	salvar: async function(req, res, next){
		var query = 'INSERT INTO pessoa(id_profissao,nome) VALUES (?,?) ';
	    await dbConn.execute(query, [req.body.id_profissao, req.body.nome], function (error, results, fields){
			try{
	        	if(error){
	        		//throw error;
	        		res.json({ error: true, data: [], message: 'could not return the request' });
	        	}else{
					res.redirect('/pessoa/listar');
	        	}
			}catch(err){
				console.log(err)
				//res.status(200).send(err)
				//res.json({error:err});
			}
	    });
	},
	listar: async function(req, res, next){

		var query='';
		query += "SELECT ps.id, ps.nome, pr.nome AS atividade "
		query += "FROM pessoa AS ps "
		query += "INNER JOIN profissao AS pr "
		query += "ON pr.id = ps.id_profissao ";
	    await dbConn.execute(query, function (error, results){
			try{
	        	if(error){
	        		//throw error;
	        		res.json({ error: true, data: [], message: 'could not return the request' });
	        	}else{
					res.render('pessoas/listar', {lista: results});
	        	}
			}catch(err){
				console.log(err)
			}
	    });
	},
	revisar: async function(req, res, next){

		const { idPessoa } = req.params;
		var query = "SELECT * FROM pessoa WHERE id = ?; ";
		query += "SELECT id, nome FROM profissao; ";

	    await dbConn.query(query,[idPessoa], function (error, results){
			try{
	        	if(error){
	        		//throw error;
	        		res.json({ error: true, data: [], message: 'could not return the request' });
	        	}else{
	        		//res.json({ error: true, data: results, message: 'OK' });
					res.render('pessoas/revisar', {
						id: results[0][0].id,
						nome: results[0][0].nome,
						id_profissao: results[0][0].id_profissao,
						profissoes:results[1] 
					});
	        	}
			}catch(err){
				console.log(err)
			}
	    });
	},
	deletar: async function(req, res, next){

		const { idPessoa } = req.params;
		var query = "DELETE FROM pessoa WHERE id = ?; ";

	    await dbConn.query(query,[idPessoa], function (error, results){
			try{
	        	if(error){
	        		//throw error;
	        		res.json({ error: true, data: [], message: 'could not return the request' });
	        	}else{
	        		//res.json({ error: true, data: results, message: 'OK' });
					res.redirect('/pessoa/listar');
	        	}
			}catch(err){
				console.log(err)
			}
	    });
	},
	editar: async function(req, res, next){

		const { nome, id_profissao, id } = req.body;
		var query = "UPDATE pessoa SET nome = ?, id_profissao = ? WHERE id = ? ";
	    await dbConn.execute(query,[nome, id_profissao, id], function (error, results){
			try{
	        	if(error){
	        		//throw error;
	        		res.json({ error: true, data: [], message: 'could not return the request' });
	        	}else{
	        		//res.json({ error: true, data: results, message: 'OK' });
					res.redirect('/pessoa/listar');
	        	}
			}catch(err){
				console.log(err)
			}
	    });
	},
	listarProfissoes: async function(req, res, next){
	    await dbConn.execute('SELECT id, nome FROM profissao', function (error, results){
			try{
	        	if(error){
	        		//throw error;
	        		res.json({ error: true, data: [], message: 'could not return the request' });
	        	}else{
					res.render('pessoas/adicionar', {lista: results});
	        	}
			}catch(err){
				console.log(err)
			}
	    });
	},
}
/*
	usar 'execute' no lugar de 'query':

	1 - A consulta e os dados são enviados ao servidor de banco de dados separadamente.
	2 - A raiz do problema de injeção de SQL está na mistura do código e dos dados.
	3 - Com prepared statements, o MySQL não precisa preparar o plano para a mesma consulta todas as vezes, isso resulta em melhor desempenho.
*/