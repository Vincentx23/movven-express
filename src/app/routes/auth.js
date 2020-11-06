const router = require('express').Router();
const {register, login, me, tokenIsValid} = require('../controllers/auth')
const verifyToken = require ('../middlewares/verifyToken');

router.route('/register')
    .post(verifyToken,register)

router.route('/login')  
    .post(login)

router.route('/me')
    .get(verifyToken,me)


router.route('/tokenIsValid')
    .post(tokenIsValid)

module.exports = router;