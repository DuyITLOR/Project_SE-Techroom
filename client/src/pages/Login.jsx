import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
 
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()


  const handleLogin = async (e) => {
    e.preventDefault()

    try {
        const res = await axios.post('http://localhost:4000/api/login', {
            username: userName,
            password: password
        })
        navigate('/home')
    } catch(err){
        alert("Login failed: " + (err.response?.data?.message || "Unknown error"))
    }
  }


  return (
      <div className='min-h-screen mx-auto  mt-1 flex items-center justify-center'>
          <form onSubmit={handleLogin} className='space-y-4'>
              <h1 className='text-neutral-800 text-4xl'>Login</h1>
              <input
                  type="text"
                  placeholder='Enter your username'
                  value={userName}
                  onChange={e => setUserName(e.target.value)}
                  className='px-32 py-2 border border-gray  rounded-md'
              />
              <h1 className='text-neutral-800 text-4xl'>Password</h1>
              <input
                  type="password"
                  placeholder='Enter your password'
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className='px-32 py-2 border border-gray rounded-md'
              />

              <button type="submit" className='mx-auto block mt-2 px-4 py-2 text-3xl bg-amber-200 rounded-md hover:bg-blue-600'>
                  Login
              </button>
          </form>
      </div>
  )
}

export default Login