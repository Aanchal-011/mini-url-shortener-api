// controllers/urlController.js
const Url = require('../models/Url');
const shortid = require('shortid');
const validUrl = require('valid-url');

const baseUrl = process.env.BASE_URL;

exports.shortenUrl = async (req, res) => {
  try {
    console.log(" Received request body:", req.body); 

    const { url: originalUrl } = req.body;

    if (!originalUrl) {
      console.warn(" URL is missing in request.");
      return res.status(400).json({ error: 'URL is required' });
    }

    if (!validUrl.isUri(originalUrl)) {
      console.warn("Invalid URL format received:", originalUrl);
      return res.status(400).json({ error: 'Invalid URL format' });
    }

    const shortCode = shortid.generate();
    const shortUrl = `${baseUrl}/${shortCode}`;

    const newUrl = new Url({
      originalUrl,
      shortCode,
    });

    await newUrl.save();

    console.log("Shortened URL created:", shortUrl); 

    res.json({ shortUrl });
  } catch (err) {
    console.error(" Error in shortenUrl:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.redirectUrl = async (req, res) => {
  try {
    const { code } = req.params;

    const url = await Url.findOne({ shortCode: code });

    if (!url) {
      console.warn(` No URL found for code: ${code}`);
      return res.status(404).json({ error: 'Short URL not found' });
    }

    url.clicks++;
    await url.save();

    console.log(` Redirecting to: ${url.originalUrl}`); 
    res.redirect(url.originalUrl);
  } catch (err) {
    console.error(' Error in redirectUrl:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
