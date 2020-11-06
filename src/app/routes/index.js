const router = require('express').Router();
const authRoutes = require('./auth');
const viewsRouter = require('./views');
const orderRoutes = require('./orders');
const excelRoutes = require('./excel');
const userRoutes = require('./users')

router.use('/auth', authRoutes);
router.use('/', viewsRouter);
router.use('/', orderRoutes);
router.use('/excel', excelRoutes);
router.use('/', userRoutes)

module.exports = router;
