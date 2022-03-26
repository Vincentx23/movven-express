const router = require('express').Router();
const authRoutes = require('./auth');
const viewsRouter = require('./views');
const orderRoutes = require('./orders');
const excelRoutes = require('./excel');
const userRoutes = require('./users')
const businessRoutes = require('./business');
const externalApis = require('./externalApis');

router.use('/auth', authRoutes);
router.use('/', viewsRouter);
router.use('/api', businessRoutes);
router.use('/', orderRoutes);
router.use('/excel', excelRoutes);
router.use('/api/business', externalApis)
router.use('/', userRoutes)

module.exports = router;
