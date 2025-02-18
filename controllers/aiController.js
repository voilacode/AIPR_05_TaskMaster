// Import AI model
const aiModel = require('../models/aiModel');

// Render AI app page with form to take prompt
exports.getAIApp = (req, res) => {
  const user = req.session.user;
  res.render('aiapp', { user, content: '' });
};

// Handle AI content generation
exports.generateAIContent = async (req, res) => {
  const { task, time } = req.body;

  console.log('Task:', task);
  console.log('Time:', time);
  console.log(task, time, req.body);
  const user = req.session.user;

  // Generate content using AI model
  const generatedContent = await aiModel.generateAIContent(task, time);
  let content = generatedContent;

  // Show error if content generation fails
  if (!generatedContent) {
    return res.render('aiApp', {
      error: 'Failed to generate code',
      content: '',
    });
  }

  // Render AI app page with generated content
  res.render('index', { content: content, user });
};
