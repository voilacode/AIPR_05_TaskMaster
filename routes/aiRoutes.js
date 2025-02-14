const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');
const { ensureAuthenticated } = require('../middlewares/authMiddleware'); 

router.get('/page', ensureAuthenticated, aiController.getPage);
router.post('/page',ensureAuthenticated,  aiController.generatePage);

module.exports = router;
