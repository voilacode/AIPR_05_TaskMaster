const express = require('express');
const jobController = require('../controllers/JobController');
const { ensureAuthenticated } = require('../middlewares/authMiddleware'); 

const router = express.Router();

router.get('/', ensureAuthenticated, jobController.getJobs);
router.get('/jobs/:id', ensureAuthenticated, jobController.getJobDetails);
router.get('/apply/:id', ensureAuthenticated, jobController.getApplicationPage);
router.post('/submit-application', ensureAuthenticated, jobController.submitApplication);
router.get('/admin/applications', ensureAuthenticated, jobController.getApplications);

module.exports = router;