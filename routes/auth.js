const { Router } = require('express');
const { check } = require('express-validator');

const { login, refreshToken } = require('../controllers/auth');
const { validateErrors } = require('../middlewares/validate-errors');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.post('/login',[
    check('email', 'email is required').isEmail(),
    check('password', 'password is required').not().isEmpty(),
    validateErrors
], login );

//Me fijo si el token existe en la db y si es asi creo uno nuevo
router.get('/', validateJWT, refreshToken );


module.exports = router;