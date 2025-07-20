const express = require('express');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const mongoose = require('mongoose');
const connection=require('./config/db');
const dotenv = require('dotenv');
const multer = require('multer');
const path = require('path');

const userRoutes = require('./routes/userRoutes');
const articleRoutes = require('./routes/articleRoutes');


dotenv.config();


// Ensure uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}


const app = express();

// Middleware
app.use(express.urlencoded({ extended: true })); 

app.use(cookieParser()); // To parse cookies
const session = require('express-session');
app.use(session({
    secret: 'your-secret-key',  // Change this to something secret
    resave: false,
    saveUninitialized: true
}));

// Set EJS as the template engine
app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));

// Serve static files (CSS, JS, images)
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



// PORT setup
const PORT=process.env.PORT || 3000;



app.use('/',userRoutes);
app.use('/article',articleRoutes);



// app.get('/', (req,res)=>{   
//     res.render('index')
// });

// Start server
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});