const express = require('express')
const Workout = require('../models/workoutModel') //this is a model of my schema

const router = express.Router(); //creates an instance of the router for us

//GET all workouts
router.get('/' , (req , res) => {
    res.json({mssg: 'GET all workouts'});
})

//GET a single workout
router.get('/:id' , (req , res) => {
    res.json({mssg: 'GET a single workout'});
})

//POST a new workout
router.post('/' , async (req , res) => {
    const {title , reps , load} = req.body

    try{
        //Here, we're creating a new 'Workout' model (imported above) k/a workout
        const workout = await Workout.create({title,reps,load}) //async function
        res.status(200).json(workout)
    } 
    catch (error){
        res.status(400).json({error: error.message})
    }
})

//DELETE a workout
router.delete('/:id' , (req , res) => {
    res.json({mssg: 'DELETE a new workout'});
})

//UPDATE a workout
router.patch('/:id' , (req , res) => {
    res.json({mssg: 'UPDATE a workout'});
})


module.exports = router;