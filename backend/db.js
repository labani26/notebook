const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://admin:admin@learning.zkyd2we.mongodb.net/?retryWrites=true&w=majority&appName=Learning'

 const connectToMongo = async () => {

    try {
        const mongCon = await mongoose.connect(mongoURI);
        if(!mongCon) {
            console.log("Connection failed");
        }
        else {
            console.log("connected");
        }
    }
    catch(error) {
        console.log('not connected');
    }
 }

 module.exports = connectToMongo ;