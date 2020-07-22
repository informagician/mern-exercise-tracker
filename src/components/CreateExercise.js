import React, { useState, useEffect } from 'react'


const CreateExercise = () => {

    const [ exercise, setExercise ] = useState({
        username: '',
        description: '',
        duration: 0,
        date: new Date(),
        users: []
    })

    useEffect(() => {
        setExercise({
            ...exercise,
            username: 'informagician'
        })
    }, [])

    const onChange = e => {
        setExercise({
            ...exercise,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault()

        console.log(exercise)

        window.location = '/'
    }
    return (
        <>
            <h1>Create A New Exercise</h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Username:</label>
                    <select 
                        ref="userInput" 
                        required 
                        className="form-control" 
                        value={exercise.username} 
                        onChange={onChange}
                    >
                        {exercise.users.map(user => (
                            <option
                                key={user}
                                value={user}
                            >
                                {user}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Description:</label>
                    <input type="text"
                        required
                        className="form-control"
                        value={exercise.description}
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <label>Duration (in minutes)</label>
                    <input
                        type="text"
                        className="form-control"
                        value={exercise.duration}
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <label>Date:</label>
                    <div>
                        <DatePicker
                            selected={exercise.date}
                            onChange={onChange}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
                </div>
            </form>
        </>
    )
}

export default CreateExercise