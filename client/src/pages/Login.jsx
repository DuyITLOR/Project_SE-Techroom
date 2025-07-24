import React, { useState } from 'react'
import axios from 'axios'
import Headers from '../components/Header'
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
    <>
        <Headers/> 
    </>
  )
}

export default Login