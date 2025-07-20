const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const upload=require('../config/multer');
const {
    createArticle,
    updateArticle,
    deleteArticle,
    viewArticles,
    editArticle
} = require('../controllers/articleController');
const { dashboard } = require('../controllers/articleController');
const Article=require('../models/articleModel')




// Protected routes with authentication middleware
router.use(authenticate); // Apply JWT authentication middleware

// User dashboard to view their own articles
router.get('/dashboard',dashboard);


// router.get('/dashboard', authenticate,(req, res, next) => {
//     console.log("Authenticated User ID:", req.userId);
//     next();
// }, dashboard);



// Route to create a new article
router.get('/create', (req, res) => res.render('createArticle'));
router.post('/create',upload.single('image'), createArticle);

// Edit and delete articles
// router.get('/edit/:id', (req, res) => res.render('editArticle')); 
router.get('/edit/:id',editArticle ); 
router.post('/edit/:id',upload.single('image'), updateArticle);
router.post('/delete/:id', deleteArticle);
// router.delete('/delete/:id', deleteArticle);


module.exports = router;