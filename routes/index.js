var express = require('express');
var router = express.Router();
// Requires multiparty 
multiparty = require('connect-multiparty'),
multipartyMiddleware = multiparty(),

// Requires controller
FileController = require('../controllers/FileController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/api/voice-snippet', function(req, res, next){
  res.json({
      name: 'Snippet-1', 
      stream: 12345
    })
})
router.post('/api/file/upload', multipartyMiddleware, FileController.uploadFile)
router.post('/api/files/upload', multipartyMiddleware, FileController.uploadFiles)

module.exports = router;
