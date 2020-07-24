import React, { useState, useEffect } from 'react'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const EditExercise = props => {


    const [exercise, setExercise] = useState({
        username: '',
        description: '',
        duration: 0,
        date: new Date(),
        users: []
    })

    const { match } = props
    let id = match.params.id

    useEffect(() => {
        
        initialFetch()
    }, [])

    const initialFetch = async () => {
        try {

            const exercises = await axios.get("http://localhost:5000/exercises/" + id);
            const users = await axios.get("http://localhost:5000/users");
            let modifiedUsers = users.data.map((user) => user.username);
            setExercise({
                ...exercise,
                username: exercises.data.username,
                description: exercises.data.description,
                duration: exercises.data.duration,
                date: new Date(exercises.data.date),
                users: modifiedUsers,
            });
        } catch(error){
            console.log(error)
        }
    };
    


    const onChange = e => {
        setExercise({
            ...exercise,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault()

        axios.post('http://localhost:5000/exercises/update/'+ id, exercise)
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
                        required
                        className="form-control"
                        name="username"
                        onChange={onChange}
                        value={exercise.username}
                    >
                        {/* {exercise.users.map(user => (
                            <option
                                key={user}
                                value={user}
                            >
                                {user}
                            </option>
                        ))} */}
                        {exercise.users.map(user => (
                            user === exercise.username ? (
                            <option
                                key={user}
                                value={exercise.username}
                                selected
                            >
                                {user}
                            </option>
                            ) : (
                            <option
                                key={user}
                                value={user}
                            >
                                {user}
                            </option>
                            )
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