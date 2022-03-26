const router = require('express').Router();


router.get('/', function (req, res) {
	res.render('index',
	  {
        message: req.flash('loginMessage')
	  });

  });


router.get('/dashboard', function (req, res) {
	res.render('dashboard',
	  {
        message: req.flash('Dashboard Message')
	  });

  });

router.get('/file', function (req, res) {
	res.render('file',
		{
			message: req.flash('Process File')
		});

});

router.get('/admin', function (req, res) {
	res.render('admin',
		{
			message: req.flash('Administration')
		});

});

router.get('/users', function (req, res) {
	res.render('users',
		{
			message: req.flash('User creator')
		});

});

router.get('/business', function (req, res) {
	res.render('business',
		{
			message: req.flash('Business creator')
		});

});

router.get('/driversorders', function (req, res) {
	res.render('driversorders',
		{
			message: req.flash('driver orders managent')
		});

});


module.exports = router
