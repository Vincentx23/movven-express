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


module.exports = router
