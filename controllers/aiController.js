const aiModel = require('../models/aiModel');

exports.getPage = (req, res) => {
    const user = req.session.user;
    res.render('home', { user });
};

exports.generatePage = async (req, res) => {
    let { prompt } = req.body;
    const user = req.session.user;

    prompt += "Use inline styling only!";
    const generatedCode = await aiModel.generateWebPageCode(prompt);
    
    if (!generatedCode) {
        return res.render('home', { error: 'Failed to generate code', code: '' });
    }

    res.render('result', { code: generatedCode, user });
};

