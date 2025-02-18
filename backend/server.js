require('dotenv').config() //this basically loads all env variables to process.env object

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')


//Below line creates an express app for us
const app = express();

//Middleware
//Below will check if the request has some data attached then it'll attach that data with 'req' object
app.use(express.json())


//Global middleware. 'next' will basically tell control to move to next middleware,
//so we have to invoke it at the end of this middleware
app.use((req , res , next) => {
    console.log(req.path , req.method);
    next();
})

//Routes - This is going to call workoutRoutes whenever you go to a URL starting with-  /api/workouts...
app.use('/api/workouts' , workoutRoutes)


//connect to DB
mongoose.connect(process.env.MONGO_URI) //async
    .then(() => {
        //listen for requests
        app.listen(process.env.PORT , () => { 
            console.log('connected to db and listening on port' , process.env.PORT)
        })
    })
    .catch((err) => {
        console.log(err);
    })


