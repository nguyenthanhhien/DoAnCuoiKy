var express = require('express');
var router = express.Router();
var multer= require('multer');
var upload= multer({dest:'public/img/'})

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/profile',upload.any(), function(req, res, next)
  {
  	console.log("test ham");
		res.send(req.files);
  });

module.exports = router;
