//this will contain functions for all routes

const Workout = require('../models/workoutModel') //this is a model of my schema
const mongoose = require('mongoose')


//GET all workouts
const getAllWorkouts = async (req , res) => {

    const allWorkouts = await Workout.find({}).sort({createdAt: -1})

    res.status(200).json(allWorkouts)
}


//GET a single workout
const getSingleWorkout = async (req , res) => {

    const { id } = req.params //all the route parameters are stored on the 'params' property

    //check to ensure that the 'id' is of correct data type i.e.mongoDB type of object ID
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'})
    }

    const singleWorkout = await Workout.findById(id) //NOTE - findByID is an async function thf use await or .then() function
    

    if(!singleWorkout){
        return res.status(404).json({error: 'No such workout'})
    }

    res.status(200).json(singleWorkout)
}


//CREATE a new workout
const createWorkout = async (req , res) => {
    const {title , reps , load} = req.body

    //add the doc(data) to the DB
    try{
        //Here, we're creating a new 'Workout' model (imported above) k/a workout
        const newWorkout = await Workout.create({title,reps,load}) //async function
        res.status(200).json(newWorkout)
    } 
    catch (error){
        res.status(400).json({error: error.message})
    }
}


//DELETE a workout
const deleteWorkout = async (req , res) => {

    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'})
    }

    const workoutToBeDeleted = await Workout.findOneAndDelete({_id: id})

    if(!workoutToBeDeleted){

        res.status(400).json({error: 'No such workout'})
    }

    res.status(200).json(workoutToBeDeleted)
}



//UPDATE a workout
const updateWorkout = async (req , res) => {

    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'No such workout'})
    }

    const workoutToBeUpdated = await Workout.findOneAndUpdate({_id: id} , {
        ...req.body //req.body is an object so we use ... to spread it into diff parameteres like title, reps & load
    })

    if(!workoutToBeUpdated){
        return res.status(400).json({error: 'No such workout'})
    }

    res.status(200).json(workoutToBeUpdated)

}


module.exports = {getAllWorkouts, getSingleWorkout, createWorkout, deleteWorkout, updateWorkout}