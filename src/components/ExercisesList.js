import React, { useState, useEffect } from 'react'
import axios from 'axios'


const ExercisesList = () => {

    const [ exercises, setExercises ] = useState([])

    useEffect(() => {

        axios.get('http://localhost:5000/exercises')
            .then(res => {
                setExercises(res.data)
                console.log(res.data)
            })
            .catch(err => console.log(err))
    },[])

    const onDelete = id => {

        axios.delete(`http://localhost:5000/exercises/` + id)
            .then(res => console.log(res))
            .catch(err => console.log(err))

        setExercises({
            ...exercises,
            ...exercises.filter(exercise => exercise._id !== id)
        })
    }

    return (
        <>
        <h1>List of Exercises</h1>
        <table className="table">
            <thead className="thead-light">
                <tr>
                    <th>Username</th>
                    <th>Description</th>
                    <th>Duration</th>
                    <th>Date</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
            {exercises.length > 0 ? (
                exercises.map(exercise => (
                    <tr key={exercise._id}>
                        <td>{exercise.username}</td>
                        <td>{exercise.description}</td>
                        <td>{exercise.duration}</td>
                        <td>{exercise.date}</td>
                        <td>
                            <a href="#" onClick={() => onDelete(exercise._id)}>Delete</a>
                            <a href={'edit/' + exercise._id}>Edit</a>
                        </td>
                    </tr>
                ))
            ) : null}
            </tbody>
        </table>   
        </>
    )
}

export default ExercisesList