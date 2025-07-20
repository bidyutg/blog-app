
// JWT authentication middleware
// const authenticate = (req, res, next) => {
//     const token = req.cookies.token; // Token stored in cookies

//     if (!token) {
//         return res.redirect('/login'); // Redirect to login if token not present
//     }

//     jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//         if (err) {
//             return res.redirect('/login'); // Redirect if token verification fails
//         }

//         req.userId = decoded.userId; // Attach user ID to the request object
//         next();
//     });
// };



const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); // Adjust based on your actual user model

const authenticate = async (req, res, next) => {
    // const token = req.cookies.token || req.header('Authorization').replace('Bearer ', '');
     const token = req.cookies.token ;
        //   const token = req.query.token ;
        // const token =  req.header('Authorization').replace('Bearer ', '');
        console.log(token);




    if (!token) {
        return res.status(401).send('Access denied. No token provided.');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;  // Set the userId from the decoded JWT payload
        next();
    } catch (err) {
        return res.status(400).send('Invalid token.');
    }
};

module.exports = authenticate;


