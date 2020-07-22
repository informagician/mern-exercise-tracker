import React, { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

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
            username: 'informagician',
            users:['informagician']
        })
        // eslint-disable-next-line
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

        // window.location = '/'
    }

    // console.log(exercise.username)
    return (
        <>
            <h1>Create A New Exercise</h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Username:</label>
                    <select 
                        // ref="userInput" 
                        required 
                        className="form-control" 
                        value={exercise.username}
                        name="username"
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
                        name="description"
                        className="form-control"
                        value={exercise.description}
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <label>Duration (in minutes)</label>
                    <input
                        type="text"
                        name="duration"
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
                            name="date"
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