import axios from 'axios';
import React, { useState } from 'react'
import '../App.css'

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");


    const handleLogin = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            alert("Please fill all fields")
            return;
        }
        const url = `https://aws-server-uk80.onrender.com/api/v1/login`;

        await axios.post(url, {
            email,
            password
        }).then((response) => {
            console.log(response.data)
            localStorage.setItem("user", JSON.stringify(response.data.user))
            window.location.href = "/"
        }).catch((err) => {
            console.log(err)
            alert(err.response.data.msg)
        })

    }

    return (
        <div className='login-container'>
            <div className='login-background'>
                <div>
                    <h1 className='header-text'>ARS SIGN IN</h1>
                </div>
                <div>
                    <form onSubmit={(e) => handleLogin(e)} className='flex flex-col'>
                        <div className='fields'>
                            <label htmlFor='email'>Email</label>
                            <input onChange={(e) => setEmail(e.target.value)} value={email} autoComplete='off' type='email' name='email' id='email' />
                        </div>
                        <div className='fields'>
                            <label htmlFor='password'>Password</label>
                            <input value={password} onChange={(e) => setPassword(e.target.value)} autoComplete='off' type='password' name='password' id='password' />
                        </div>
                        <div>
                            <button type='submit' className='btn btn-primary'>Sign In</button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default Login