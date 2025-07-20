const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser } = require('../controllers/authController');
const { viewArticles } = require('../controllers/articleController');

// Render signup page
router.get('/signup', (req, res) => res.render('signup'));

// Handle signup request
router.post('/signup', registerUser);

// Render login page
// router.get('/login', (req, res) => res.render('login'));
router.get('/login', (req, res) => {
    const message = req.session.message || '';  // Retrieve message from session
    req.session.message = '';  // Clear the message after using it
    res.render('login', { message });  // Pass message to the template
});


// Handle login request
router.post('/login', loginUser);

// Handle logout request
router.get('/logout', logoutUser);

router.get('/', viewArticles);


module.exports = router;