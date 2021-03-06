import React, { useState } from 'react'
import axios from 'axios'

const CreateUser = () => {

    const [ user, setUser ] = useState({
        username:'',
    })

    const onChange = e => {
        setUser({
            ...user,
            [e.target.name]:e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault()
        console.log(user)

        axios.post('http://localhost:5000/users/add', user)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))

        setUser({username:''})
    }

    return (
        <>
        <h1>Create New User</h1>
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label>Username:</label>
                <input type="text"
                    required
                    className="form-control"
                    name="username"
                    value={user.username}
                    onChange={onChange}
                    />
            </div>
            <div className="form-group">
                <input type="submit" value="Create User" className="btn btn-primary" />
            </div>
        </form>
        </>
    )
}

export default CreateUser