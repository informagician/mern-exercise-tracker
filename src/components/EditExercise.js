import React, { useState, useEffect } from 'react'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const EditExercise = props => {


    const [ exercise, setExercise ] = useState({
        username: '',
        description: '',
        duration: 0,
        date: new Date(),
        users: []
    })

    const { match } = props
    let id = match.params.id

    useEffect(() => {

        axios.get('http://localhost:5000/exercises/' + id)
            .then(res => {
                setExercise({
                    ...exercise,
                    username: res.data.username,
                    description: res.data.description,
                    duration: res.data.duration,
                    date: new Date(res.data.date)
                })
            })
            .catch(err => console.log(err))

        let users = []
        axios.get('http://localhost:5000/users')
            .then(res => {
                res.data.map(user => {
                    users.push(user.username)   
                })
                setExercise({
                    ...exercise,
                    users: users
                })
            })
            .catch(err => console.log(err))  
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

        axios.post('http://localhost:5000/exercises/update/', id)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))

    }

    console.log(exercise)

    return (
        <>
            <h1>Edit Exercises</h1>
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
                    <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
                </div>
            </form>
        </>
    )
}

export default EditExercise