const Article = require('../models/articleModel');
const upload=require('../config/multer')


// Create a new article
const createArticle = async (req, res) => {
    console.log("User ID from JWT:", req.userId);

    const { title, content } = req.body;

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null; // Store file path

    try {
        const newArticle = new Article({
            title,
            content,
            image: imageUrl,  // Save the image path to the database
            author: req.userId, // Associate article with the authenticated user
        });

        await newArticle.save();
        res.redirect('/article/dashboard'); // Redirect to dashboard after creating article
    } catch (err) {
        res.status(500).send('Error creating article');
    }
};
// const createArticle = async (req, res) => {
//     console.log("Request body:", req.body); // Log form data
//     console.log("Uploaded file:", req.file); // Log file data

//     const { title, content } = req.body;
//     const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

//     try {
//         const newArticle = new Article({
//             title,
//             content,
//             image: imageUrl,
//             author: req.userId,
//         });

//         await newArticle.save();
//         res.redirect('/article/dashboard');
//     } catch (err) {
//         console.error('Error creating article:', err); // Log error details
//         res.status(500).send('Error creating article');
//     }
// };

const editArticle=async(req,res)=>{
    try {
        const article = await Article.findById(req.params.id);

        if (!article) {
            return res.status(404).send('Article not found');
        }

        if (article.author.toString() !== req.userId) {
            return res.status(403).send('You are not authorized to edit this article');
        }

        res.render('editArticle', { article }); // Pass the article object to the view
    } catch (error) {
        res.status(500).send('Error fetching article');
        
    }

}
// Update an article
// const updateArticle = async (req, res) => {
//     const { title, content } = req.body;


//      // Check if a new image file was uploaded
//     //  let imageUrl = null;

//      // If the file exists in the request (Multer stores files in req.file)
//     //  if (req.file) {
//     //      // Get the file path for the uploaded image
//     //      imageUrl = `/uploads/${req.file.filename}`;  // Make sure to match your storage setup
//     //  }
 

//     try {
//         const article = await Article.findById(req.params.id);
//         article.title = title;
//         article.content = content;
//         if (image) article.image = image;
        

//         await article.save();
//         res.redirect('/article/dashboard'); // Redirect to dashboard after updating article
//         // res.redirect(`/article/edit${article._id}`);  // Redirect to the article details page

//     } catch (err) {
//         res.status(500).send('Error updating article');
//     }
// };


const updateArticle = async (req, res) => {
    const { title, content } = req.body;

    try {
        const article = await Article.findById(req.params.id);
        // article.title = title;
        // article.content = content;

        // // Image handling (if a new image was uploaded)
        // const imageUrl = req.file ? `/uploads/${req.file.filename}` : article.image; // Default to old image if no new image is uploaded
        // if (imageUrl) article.image = imageUrl;  // Update image if file exists



        //  changing some logic 


        // Update title if it's provided
        if (title) {
            article.title = title;
        }

        // Update content if it's provided
        if (content) {
            article.content = content;
        }

        // Update image if a new image is uploaded
        if (req.file) {
            const imageUrl = `/uploads/${req.file.filename}`;
            article.image = imageUrl;
        }
        
        await article.save();
        res.redirect('/article/dashboard'); // Redirect to dashboard after updating article
    } catch (err) {
        res.status(500).send('Error updating article');
    }
};


// Delete an article
const deleteArticle = async (req, res) => {
  

    try {
        const article = await Article.findById(req.params.id);
        console.log(article);

        if (article.author.toString() !== req.userId) {
            return res.status(403).send('You are not authorized to delete this article');
        }

        await article.deleteOne();
        res.redirect('/article/dashboard'); // Redirect to dashboard after deleting article
    } catch (err) {
        res.status(500).send('Error deleting article');
    }
};

// View all articles
const viewArticles = async (req, res) => {
    try {
        const articles = await Article.find({}).populate('author');
        res.render('index', { articles });
    } catch (err) {
        res.status(500).send('Error fetching articles');
    }
};



const dashboard = async (req, res) => {
    try {
        // Log userId to confirm it's being passed correctly
        console.log("User ID from JWT:", req.userId);

        // Fetch articles by the current user
        const articles = await Article.find({ author: req.userId });
        
        // Render the dashboard view with articles
        res.render('dashboard', { articles });
    } catch (err) {
        console.error("Error fetching articles:", err);
        res.status(500).send('Error fetching articles');
    }
};




module.exports={createArticle,editArticle,updateArticle,deleteArticle,viewArticles,dashboard}