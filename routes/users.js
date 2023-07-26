const { Router } = require('express');
const { check } = require('express-validator');
const { validateChars } = require('../middlewares/validate-characters');
const { roleIsValid, mailIsValid, existUserID } = require('../helpers/db-validators');

const { 
    getUsers, 
    putUsers, 
    postUsers, 
    deleteUsers 
    } = require('../controllers/users');


const router = Router();


router.get('/', getUsers);

router.put('/:id',[
    check('id','No es un ID válido').isMongoId(),
    check('id').custom( existUserID ),
    validateChars,
],putUsers );

router.post('/register',[
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El correo no es válido').isEmail(),
    check('email').custom(mailIsValid),
    check('password', 'La contraseña debe tener al menos 6 carácteres').isLength({ min:6 }),
    check('role', 'No es un rol válido').not().isIn(['ADMIN_ROLE','USER_ROLE']),
    //check('role').custom( roleIsValid ),
    validateChars
], postUsers);

router.delete('/:id', [
    check('id','No es un ID válido').isMongoId(),
    check('id').custom( existUserID ),
    validateChars
],deleteUsers);

module.exports = router;
 