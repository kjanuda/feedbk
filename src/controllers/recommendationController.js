const Recommendation = require('../models/Recommendation');
const crypto = require('crypto');


function gravatarUrl(email, size = 200) {
const hash = crypto.createHash('md5').update((email || '').trim().toLowerCase()).digest('hex');
return `https://www.gravatar.com/avatar/${hash}?d=identicon&s=${size}`;
}


exports.createRecommendation = async (req, res) => {
try {
const { fullName, email, universityOrCompany, feedback } = req.body;
if (!fullName || !email || !feedback) {
return res.status(400).json({ message: 'fullName, email and feedback are required' });
}


// compute avatar url using gravatar (fallback will be identicon)
const avatarUrl = gravatarUrl(email);


const rec = new Recommendation({ fullName, email, universityOrCompany, feedback, avatarUrl });
await rec.save();
return res.status(201).json(rec);
} catch (err) {
console.error(err);
return res.status(500).json({ message: 'Server error' });
}
};


exports.getRecommendations = async (req, res) => {
try {
const recs = await Recommendation.find().sort({ createdAt: -1 });
res.json(recs);
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Server error' });
}
};