const router = require('express').Router()
const pessoa = require('../app/Pessoa');

/* 
router.use(function (req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
*/

router.post('/salvar', pessoa.salvar);
router.get('/adicionar', pessoa.listarProfissoes);
router.get('/listar', pessoa.listar);
router.get('/revisar/:idPessoa', pessoa.revisar);
//router.delete('/deletar/:id', pessoa.deletar);
router.get('/deletar/:idPessoa', pessoa.deletar);
router.put('/editar', pessoa.editar);

module.exports = router;
