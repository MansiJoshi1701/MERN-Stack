//mongoose is what allows us to create models & schemas for our data in db. MONGO db alone is schema-less
const mongoose = require('mongoose')

//Schema defines the structure of the document inside our db
const Schema = mongoose.Schema

const workoutSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    load: {
        type: Number,
        required: true
    }
} , {timestamps: true})

//A model applies that schema to a particular model which we then use to interact with a collection of that name
module.exports = mongoose.model('Workout' , workoutSchema)

