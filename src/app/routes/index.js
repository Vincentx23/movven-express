const router = require('express').Router();
const authRoutes = require('./auth');
const viewsRouter = require('./views');
const orderRoutes = require('./orders');
const excelRoutes = require('./excel');

router.use('/auth', authRoutes);
router.use('/', viewsRouter);
router.use('/', orderRoutes);
router.use('/excel', excelRoutes);

module.exports = router;
