import { createContext, useReducer } from 'react'

export const WorkoutsContext = createContext()

//Below function is created to handle diff actions & update the state accordingly
export const workoutsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_WORKOUTS':
      return { 
        workouts: action.payload 
      }
    case 'CREATE_WORKOUT':
      return {  
        workouts: [action.payload, ...state.workouts] 
      }
      case 'DELETE_WORKOUT':
      return { 
        workouts: state.workouts.filter(w => w._id !== action.payload._id) 
        //Here, w = individual workout in the 'workouts' array. We want to keep those workouts whose id !=
        //the id of the workout to be deleted (the one sent from WorkoutDetails as payload to dispatch())
      }
    default:
      return state
  }
}

//WorkoutsContextProvider - to wrap the application & make the context available to all children components
export const WorkoutsContextProvider = ({ children }) => {

  //State Management - The useReducer hook returns the current state and a dispatch function to trigger state updates
  const [state, dispatch] = useReducer(workoutsReducer, { 
    workouts: null
  })
  
  return (
    <WorkoutsContext.Provider value={{ ...state, dispatch }}>
      { children }
    </WorkoutsContext.Provider>
  )
}