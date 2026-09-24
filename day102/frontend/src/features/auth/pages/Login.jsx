import React,{useState} from 'react';
import { Link } from 'react-router'
import axios from 'axios'
import "../Styles/form.scss"
const Login = () => {

  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    axios.post("http://localhost:3000/api/auth/login",{
      username,
      password
    },{
      withCredentials:true
    })
    .then(res=>{
      console.log(res.data);
    })
  }

  return (
    <main>
        <div className="form-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input
                onInput={(e)=>{setusername(e.target.value)}}
                type="text" name="username" placeholder='Enter your name' />
                <input
                onInput={(e)=>{setPassword(e.target.value)}}
                type="text" name='password' placeholder='Enter the password' />
                <button type='submit'>submit</button>
            </form>
            <p>Do not have account ?? <Link to="/register" className='toggleAuth'>Register</Link></p>
        </div>
    </main>
  )
}

export default Login
