const fetch = require('node-fetch');
const Application = require('../models/applicationModel');
const { log } = require('console');
const db = require('../config/db');
const mailService = require('../services/mailService');

const apiUrl = 'https://jobs-api14.p.rapidapi.com/v2/list?query=Web%20Developer&location=United%20States&autoTranslateLocation=true&remoteOnly=false&employmentTypes=fulltime%3Bparttime%3Bintern%3Bcontractor';
const apiOptions = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': 'ea86ec0756msh17e532df1e1c9c9p170c20jsnebad0933d91c',
    'x-rapidapi-host': 'jobs-api14.p.rapidapi.com',
  },
};

const jobController = {
  getJobs: async (req, res) => {
    try {
      const response = await fetch(apiUrl, apiOptions);
      const data = await response.json();
      res.render('jobs', { jobs: data.jobs, user: req.session.user });
    } catch (error) {
      console.error('Error fetching jobs:', error);
      res.status(500).send('Error fetching jobs');
    }
  },

  getJobDetails: async (req, res) => {
    try {
      const jobId = req.params.id;
      const response = await fetch(apiUrl, apiOptions);
      const data = await response.json();
      const job = data.jobs.find((job) => job.id === jobId);
      res.render('jobDetails', { job , user: req.session.user});
    } catch (error) {
      console.error('Error fetching job details:', error);
      res.status(500).send('Error fetching job details');
    }
  },

  getApplicationPage: (req, res) => {
    const jobId = req.params.id;
    res.render('application', { job: { id: jobId, title: 'Web Developer' }, user: req.session.user });
  },

  submitApplication: (req, res) => {
    const { jobId, name: userName, email: userEmail, phone, gender, graduation } = req.body;

    // Validate all required fields are present
    if (!jobId || !userName || !userEmail || !phone || !gender || !graduation) {
      return res.redirect('/application-form?error=All fields are required.');
    }

    // Get job title and company from the database or your job data source
    const jobTitle = "Sample Job Title"; // Replace this with actual logic to fetch the job title based on jobId
    const companyName = "Sample Company"; // Replace this with actual logic to fetch the company name

    // Prepare the SQL query to insert the application into the database
    const query = `
      INSERT INTO applications (jobId, userName, userEmail, phone, gender, graduation)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    
    // Execute the query with the provided data
    db.query(query, [jobId, userName, userEmail, phone, gender, graduation], async (err, result) => {
      if (err) {
        console.error('Error saving application:', err);
        return res.redirect('/application-form?error=Error saving application.');
      }

      // Send confirmation email
      try {
        await mailService.sendThresholdNotification(userEmail, jobTitle, companyName);
      } catch (emailError) {
        console.error('Error sending email:', emailError);
        return res.redirect('/application-form?error=Error sending confirmation email.');
      }

      // Redirect to the homepage with a success message
      return res.redirect('/?success=Application submitted successfully!');
    }) 
  },

  getApplications: (req, res) => {
    // Check if the user has admin role
    if (req.session.user.role !== 'admin') {
      return res.redirect('/');
    }
  
    // Query to fetch all applications
    const query = 'SELECT * FROM applications';
  
    db.query(query, (err, applications) => {
      if (err) {
        console.error('Error fetching applications:', err);
        return res.status(500).send('Error fetching applications');
      }
  
      // Render the admin applications page
      res.render('applications', { applications, user: req.session.user });
    })
  }
};

module.exports = jobController;