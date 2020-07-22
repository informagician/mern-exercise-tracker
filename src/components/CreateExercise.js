import React, { useState } from 'react'


const CreateExercise = () => {

    const [ exercise, setExercise ] = useState({
        username: '',
        description: '',
        duration: 0,
        date: new Date(),
        users: []
    })

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

        </>
    )
}

export default CreateExercise