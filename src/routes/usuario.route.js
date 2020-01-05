const router = require('express').Router()
const usuario = require('../app/Usuario');

/* middleware that is specific to this router
router.use(function (req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
*/

router.get('/', usuario.listar);

module.exports = router;
