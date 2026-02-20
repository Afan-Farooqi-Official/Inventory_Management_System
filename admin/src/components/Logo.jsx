import React from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'

const Logo = ({className}) => {
  const navigate = useNavigate()
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <img src={assets.logo} alt="logo" className="w-32 sm:w-44 py-2 sm:py-3 cursor-pointer" onClick={() => navigate('/')} 
      />
    </div>
  )
}

export default Logo