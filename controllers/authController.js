const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

// Register new user
const registerUser = async (req, res) => {
    const { username, password } = req.body;


     // checking for existing user
     const existingUser = await User.findOne({ username });
     if (existingUser) {
         return res.status(400).json({ message: 'Username has been already taken !' });
     }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // console.log("Hashed Password:", hashedPassword);  // Debugging

    const newUser = new User({ username, password: hashedPassword });

    try {
        // Log before saving
        console.log("User object before saving:", newUser);

        // Save user
        await newUser.save();

        // Log saved user (hashed password)
        // console.log("Saved User:", newUser);

        res.redirect('/login');
    } catch (err) {
        console.error("Error during registration:", err);
        res.status(500).send(err);
    }
};


// Login user
// const loginUser = async (req, res) => {
//     const { username, password } = req.body;
//     console.log(req.body)

    
//     console.log("Login attempt with username: ", username);  // Log the username to verify

//     // Find user by username
//     const user = await User.findOne({ username });

//     if (!user) {
//         console.log("User not found");
//         return res.status(400).send('Invalid credentials');
//     }

//     console.log("User found, now comparing passwords");

//     // Check if password matches
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//         console.log("Password does not match");
//         // return res.status(400).send('Invalid credentials');
//         // res.redirect({'/login',message:'invalid Credentials'});
//         // res.redirect('/login');
//         return res.render('login', { message: 'Invalid credentials' });


//     }

//     // Generate JWT Token
//     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//     res.cookie('token', token, { httpOnly: true }); // Store token in cookie
//     console.log("Generated Token: ", token); // Log the token for debugging
//     res.redirect('/article/dashboard'); // Redirect to dashboard after login
// };
const loginUser = async (req, res) => {
    const { username, password } = req.body;
    // console.log(req.body);

    console.log("Login attempt with username: ", username);  // Log the username to verify

    // Find user by username
    const user = await User.findOne({ username });

    if (!user) {
        console.log("User not found");
        req.session.message = 'Invalid credentials';  // Store the message in session
        return res.redirect('/login');  // Redirect to login page
    }

    console.log("User found, now comparing passwords");

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        console.log("Password does not match");
        req.session.message = 'Invalid credentials';  // Store the message in session
        return res.redirect('/login');  // Redirect to login page
    }

    // Generate JWT Token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true });  // Store token in cookie
    // console.log("Generated Token: ", token);  // Log the token for debugging
    res.redirect('/article/dashboard');  // Redirect to dashboard after login
};


// Logout user
const logoutUser = (req, res) => {
    res.clearCookie('token'); // Clear the JWT from cookies
    // res.redirect('/login'); // Redirect to login page after logout
    res.redirect('/login'); // Redirect to the homepage

    // res.render('index');
};

module.exports = { registerUser, loginUser, logoutUser };
