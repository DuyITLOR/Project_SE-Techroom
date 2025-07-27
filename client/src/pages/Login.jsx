import React, { useState } from 'react'
import axios from 'axios'
import Headers from '../components/Header'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'
import background from '../assets/background_Login.webp'

const Login = () => {
  const [step, setStep] = useState(1)
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [token, setToken] = useState('')
  const [role, setRole] = useState('')
  const navigate = useNavigate()

  const handleNext = async (e) => {
    if (userName === 'admin') {
      setStep(2)
      setRole('admin')
    } else if (userName === 'DuyITLOR') {
      setStep(2)
      setRole('user')
    } else {
      Altert("Invalid username. Please try again.")
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:4000/api/login', {
        username: userName,
        password: password
      })
      navigate('/home')
    } catch (err) {
      alert("Login failed: " + (err.response?.data?.message || "Unknown error"))
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
                <input type="text" value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className='w-full px-3 py-2 mb-6 mt-2 rounded border border-white text-white focus:outline-none'
                  placeholder='Enter username' />

                <div className='flex justify-end'>
                  <button
                    type='button'
                    onClick={handleNext}
                    className='px-3 py-2 bg-blue-600 hover:bg-blue-800 text-white rounded items-center '>
                    Continue</button>
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
