import React,{useState} from 'react';
import { Link, useNavigate } from 'react-router'
import "../Styles/form.scss"
import { useAuth } from '../hooks/useAuth';


const Login = () => {

  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const {handleLogin}=useAuth();
  const navigate=useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    handleLogin(username,password)
    .then(res=>{
      console.log(res);
      navigate("/")
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
                type="password" name='password' placeholder='Enter the password' />
                <button type='submit'>submit</button>
            </form>
            <p>Do not have account ?? <Link to="/register" className='toggleAuth'>Register</Link></p>
        </div>
    </main>
  )
}

export default Login
