const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { emailValidator } = require('../helpers/db-validators');
const { muestraErroresEncontrados } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post(
    '/new',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email').custom( emailValidator ),
        check('password', 'El password debe ser de 6 caracteres').isLength({ min: 6 }),
        muestraErroresEncontrados         
    ],
    crearUsuario);
    
router.post(
    '/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe ser de 6 caracteres').isLength({ min: 6 }),
        muestraErroresEncontrados         
        
    ],
    loginUsuario);

router.get('/renew', validarJWT, revalidarToken);



module.exports = router;