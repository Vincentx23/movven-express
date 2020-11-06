const router = require('express').Router();
const {getUsers} = require('../controllers/users')
const verifyToken = require ('../middlewares/verifyToken');

router.route('/users/:role')
    .get(verifyToken,getUsers)

module.exports = router