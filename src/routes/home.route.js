var router = require('express').Router()

router.get('/', function(req, res){
	res.render('index.ejs', {
		titulo: 'Node e Mysql'
	});
});

module.exports = router;
