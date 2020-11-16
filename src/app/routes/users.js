const router = require('express').Router();
const {getUsers, getUsersByRole} = require('../controllers/users')
const verifyToken = require ('../middlewares/verifyToken');

router.route('/users/:0')
    .get(verifyToken,getUsers)


router.route('/usersRole/:role')
    .get(verifyToken, getUsersByRole)

module.exports = router