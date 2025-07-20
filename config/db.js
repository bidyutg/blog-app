const mongoose=require('mongoose');
const dotenv = require('dotenv');
dotenv.config();


const mongoURL = process.env.MONGODB_URI;

// creating function for connection and Using async/await for cleaner code:
async function connectDB() {
    try {
      await mongoose.connect(mongoURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('mongoDB connected with the server');
    } catch (error) {
      console.log('Error connecting to MongoDB:', error);
    }
  }
  
  // Connection event handlers
  mongoose.connection.on('connected', () => {
    console.log('mongoDB connected with the server');
  });
  
  mongoose.connection.on('error', (error) => {
    console.log('mongoDB connection error:', error);
  });
  
  mongoose.connection.on('disconnected', () => {
    console.log('mongoDB disconnected with the server');
  });
  
  // Calling the connect function
  connectDB();

  module.exports=mongoose.connection;
