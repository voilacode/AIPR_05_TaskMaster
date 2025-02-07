const Page = require('../models/Page');
const db = require('../config/db');

exports.getPageBuilder = async (req, res) => {
    try {
        const pages = await Page.getPages(); // Fetch pages from the database
        res.render('index', { pages, user: req.session.user });
    } catch (err) {
        console.error('Error fetching pages:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.savePage = async (req, res) => {
    try {
        const { name, content } = req.body;

        // Ensure content is parsed if it's a string
        let parsedContent;
        if (typeof content === 'string') {
            parsedContent = JSON.parse(content);  
        } else {
            parsedContent = content;  
        }

        // Validate the input
        if (!name || !parsedContent) {
            return res.status(400).json({ message: 'Name and content are required' });
        }

        // Now save the page with the parsed content
        await Page.savePage(name, parsedContent);  // Save the page using the model
        res.status(200).json({ message: 'Page saved successfully' });
    } catch (err) {
        console.error('Error saving page:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.listPages = async (req, res) => {
    try {
        const pages = await Page.getAllPagesWithContent();

        // Ensure all contents are parsed
        pages.forEach(page => {
            if (typeof page.content === 'string') {
                try {
                    page.content = JSON.parse(page.content);
                } catch (e) {
                    console.error(`Error parsing content for page ${page.id}:`, e);
                }
            }
        });

        res.render('list', { pages,  user: req.session.user });
    } catch (err) {
        console.error('Error fetching pages:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.viewPage = async (req, res) => {
    try {
        const pageId = req.params.id;
        const [rows] = await db.execute('SELECT * FROM pages WHERE id = ?', [pageId]);

        if (rows.length === 0) {
            return res.status(404).send('Page not found');
        }

        const page = rows[0];

        if (typeof page.content === "string") {
            page.content = JSON.parse(page.content);
        }

        res.render('page', { page,  user: req.session.user });
    } catch (error) {
        console.error('Error fetching page:', error);
        res.status(500).send('Server error');
    }
};
