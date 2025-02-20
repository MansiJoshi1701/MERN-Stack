import { useState } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"

const WorkoutForm = () => {
    
    const { dispatch } = useWorkoutsContext()

    const [title , setTitle] = useState('')
    const [load , setLoad] = useState('')
    const [reps , setReps] = useState('')
    const [error , setError] = useState(null)
    const [emptyFields , setEmptyFields] = useState([])

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
            setEmptyFields(json.emptyFields)
        }

        if(response.ok){
            setTitle('')
            setLoad('')
            setReps('')
            setError(null)
            setEmptyFields([])
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
                className={emptyFields.includes('title') ? 'error' : ''} 
                //if(emptyFields[] contains 'title' then give it 'error' className else no className)
                //we're giving it a className so that we can later style it in index.css file
            />

            <label>Load (in kg):</label>
            <input 
                type="number" 
                onChange={(e) => setLoad(e.target.value)}
                value={load} //2-way binding
                className={emptyFields.includes('load') ? 'error' : ''}
            />

            <label>Reps:</label>
            <input 
                type="number" 
                onChange={(e) => setReps(e.target.value)}
                value={reps} //2-way binding
                className={emptyFields.includes('reps') ? 'error' : ''}
            />

            <button>Add workout</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default WorkoutForm