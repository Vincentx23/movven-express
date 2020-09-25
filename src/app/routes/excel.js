const router = require('express').Router();

const uploadMulter = require('../middlewares/uploadMulter');

const {upload, download} = require('../controllers/excel');
const verifyToken = require('../middlewares/verifyToken');



router.route('/upload')
    .post(verifyToken, uploadMulter.single("file"), upload);

router.route('/download')
    .get(download);


module.exports = router;
