require('dotenv').config() //this basically loads all env variables to process.env object

const express = require('express')

//Below line creates an express app for us
const app = express();

//Global middleware. next will basically tell which middleware to go on to next
app.use((req , res , next) => {
    console.log(req.path , req.method);
    next();
})

//This is going to respond to a GET request coming in
app.get('/' , (req , res) => {
    res.json({mssg: 'Welcome to the app'});
})

//listen for requests
app.listen(process.env.PORT , () => {
    console.log('listening on port');
})