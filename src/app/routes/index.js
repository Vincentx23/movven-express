const router = require('express').Router();
const authRoutes = require('./auth');
const viewsRouter = require('./views');
const orderRoutes = require('./orders')

router.use('/auth', authRoutes);
router.use('/', viewsRouter);
router.use('/', orderRoutes);

module.exports = router;