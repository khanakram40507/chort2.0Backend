import React, { useState } from 'react'

import { Link } from 'react-router'
import { useNavigate } from 'react-router'
import "../Styles/form.scss"
import { useAuth } from '../hooks/useAuth';


const Register = () => {
    const [username, setusername] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");

    const { handleRegister,loading } = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
       
        await handleRegister(username, email, password)
            .then(res => {
            console.log(res);       
            navigate("/")
            }
        )
       
    }

    if(loading) {
        return <div>Loading...</div>
    }
    return (
        <main>
            <div className="form-container">
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        onInput={(e) => { setemail(e.target.value) }}
                        type='text' name='email' placeholder='Enter the email' />
                    <input
                        onInput={(e) => { setusername(e.target.value) }}
                        type="text" name="username" placeholder='Enter your name' />

                    <input
                        onInput={(e) => { setpassword(e.target.value) }}
                        type="text" name='password' placeholder='Enter the password' />
                    <button type='submit'>submit</button>
                </form>
                <p>Already have an Account?? <Link to="/login" className='toggleAuth'>Login</Link></p>
            </div>
        </main>
    )
}

export default Register