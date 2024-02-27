const express = require('express');
const URL = require("../models/url");
const {handleGenerateNewShortURL, handleGetAnalytics} = require('../controllers/url');

const router = express.Router();

router.post('/', handleGenerateNewShortURL)

router.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        {
            shortId
        },
        {   $push: {
            visitHistory: {
                timestamp: Date.now(),
            },
        },
    }
    );
    res.redirect(entry.redirectURL);
});

router.get('/analytics/:shortId', handleGetAnalytics)

module.exports = router;