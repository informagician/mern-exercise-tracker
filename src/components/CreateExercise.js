import React, { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'

const CreateExercise = () => {

    const [ exercise, setExercise ] = useState({
        username: '',
        description: '',
        duration: 0,
        date: new Date(),
        users: []
    })

    useEffect(() => {

        let users = []
        axios.get('http://localhost:5000/users')
            .then(res => {
                res.data.map(user => {
                    users.push(user.username)
                    return users   
                })
                setExercise({
                    ...exercise,
                    username: users[0],
                    users: users
                })
            })
            .catch(err => console.log(err))
            
            // eslint-disable-next-line
        }, [])

    console.log(exercise)
    
    const onChange = e => {
        setExercise({
            ...exercise,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault()

        axios.post('http://localhost:5000/exercises/add', exercise)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))

    }
    
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