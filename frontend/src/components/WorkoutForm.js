import { useState } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"

const WorkoutForm = () => {
    const { dispatch } = useWorkoutsContext()

    const [title , setTitle] = useState('')
    const [load , setLoad] = useState('')
    const [reps , setReps] = useState('')
    const [error , setError] = useState(null)

    const handleSubmit = async (e) => { //we're making this async coz we want to access db which'll take time
        e.preventDefault()

        const workout = {title , load , reps}

        const response = await fetch('/api/workouts', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()

        if(!response.ok){
            setError(json.error)
        }

        if(response.ok){
            setTitle('')
            setLoad('')
            setReps('')
            setError(null)
            dispatch({type: 'CREATE_WORKOUT' , payload: json})
            console.log('new workout added' , json)
        }
    }

    return(
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a new workout</h3>

            <label>Excersize Title:</label>
            <input 
                type="text" 
                onChange={(e) => setTitle(e.target.value)}
                value={title} //2-way binding
            />

            <label>Load (in kg):</label>
            <input 
                type="number" 
                onChange={(e) => setLoad(e.target.value)}
                value={load} //2-way binding
            />

            <label>Reps:</label>
            <input 
                type="number" 
                onChange={(e) => setReps(e.target.value)}
                value={reps} //2-way binding
            />

            <button>Add workout</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default WorkoutForm