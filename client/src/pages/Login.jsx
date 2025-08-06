import React, { useState } from 'react'
import axios from 'axios'
import Headers from '../components/Header'
import Footer from '../components/Footer'
// import SideBar from '../components/SideBar'
import { useNavigate } from 'react-router-dom'
import background from '../assets/background_Login.webp'


const Login = () => {
  const [step, setStep] = useState(1)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [token, setToken] = useState('')
  const [role, setRole] = useState('')
  const navigate = useNavigate()

  const handleNext = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.post('http://localhost:4000/api/auth', {
        username
      })
      if(res.data.success) {
        setStep(2)
        setRole(res.data.role)
        localStorage.setItem('username', res.data.username)
      } 
      else {
        alert(res.data.message)
      }
    } catch (err) {
      alert("Login failed: " + (err.message || "Unknown error"))
    }

  }

  const handleLogin = async (e) => {
    e.preventDefault();
    const storedUsername = username || localStorage.getItem('username')
    const credential = role === 'student' ? token : password

    try {
      const res = await axios.post('http://localhost:4000/api/auth/authenticate', {
        username: storedUsername, 
        password: credential
      })
      if(res.data.success) {
        localStorage.setItem('isAuthenticated', 'true')
        if (role === 'admin') {
          navigate('/admin/Dashboard')
        } else if (role === 'student') {
          navigate('/student/Dashboard')
        } else {
          navigate('/teacher/Dashboard')
        }
      } 
      else {
        alert(res.data.message)
      }
    } catch (err) {
      alert("Login failed: " + (err.message || "Unknown error"))
    }
  };

  return (
    <>
      <Headers />
      <div
        className="min-h-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${background})` }}>
        <div className='absolute inset-0 flex items-center justify-center'>
          <form
            onSubmit={handleLogin}
            className='backdrop-blur-md bg-white/10 border border-white text-white rounded-[8px] shadow-[0_4px_30px_rgba(0,0,0,0.1)] w-[350px] p-6'>
            <h2 className='font-family font-bold text-3xl text-blue-400 text-center mb-6'>Login</h2>

            {step === 1 && (
              <>
                <label className=' text-left md-1 '>Username</label>
                <input type="text" value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className='w-full px-3 py-2 mb-6 mt-2 rounded border border-white text-white focus:outline-none'
                  placeholder='Enter username' />

                <div className='flex justify-end'>
                  <button
                    type='submit'
                    onClick={handleNext}
                    className='px-3 py-2 bg-blue-600 hover:bg-blue-800 text-white rounded items-center '>
                    Continue</button>
                </div>
              </>
            )}

            {step === 2 && role === 'admin' && (
              <>
                <label className=' text-left md-1 '>Password</label>
                <input type="password" value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='w-full px-3 py-2 mb-6 mt-2 rounded border border-white text-white focus:outline-none'
                  placeholder='Enter password' />

                <div className='flex justify-end'>
                  <button
                    type='submit'
                    className='px-3 py-2 bg-blue-600 hover:bg-blue-800 text-white rounded items-center '>
                    Login</button>
                </div>
              </>
            )}

            {step === 2 && role === 'student' && (
              <>
                <label className=' text-left md-1 '>Token</label>
                <input type="text" value={token}
                  onChange={(e) => setToken(e.target.value)}
                  className='w-full px-3 py-2 mb-6 mt-2 rounded border border-white text-white focus:outline-none'
                  placeholder='Enter token' />

                <div className='flex justify-end'>
                  <button
                    type='submit'
                    className='px-3 py-2 bg-blue-600 hover:bg-blue-800 text-white rounded items-center '>
                    Login</button>
                </div>
              </>
            )}

          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
