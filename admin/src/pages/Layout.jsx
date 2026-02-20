import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { X, Menu, LogOut } from 'lucide-react'
import SignIn from '../pages/SignIn'
import Logo from '../components/Logo'
import Sidebar from '../components/Sidebar'
import { useNavigate } from 'react-router-dom'

const Layout = () => {

  const [sidebar, setSidebar] = useState(false)
  const navigate = useNavigate()

  const user = true

  return user ? (
    <div className='flex flex-col items-start justify-start h-screen'>
      <nav className='w-full px-4 sm:px-8 min-h-14 flex justify-between items-center sm:justify-between border-b border-gray-200'>
        {/* left section */}
        <div className='flex items-center gap-2 sm:gap-4'>
          <div className="pr-5 md:w-52 h-14 flex items-center justify-center border-r border-gray-300"> <Logo /> </div>
          <h1 className='hidden sm:block text-xl font-bold text-gray-700'>Default Organization</h1>
          <span className='text-gray-500'>Administrator</span>
        </div>
        <div className='hidden sm:flex justify-center items-center gap-2 pl-4 border-l border-gray-300'>
          <div className='flex flex-col items-center'>
            <h3 className='text-gray-700 text-center font-bold'>Admin Panel</h3>
            <p className='text-xs text-gray-500'>admin@admin.com</p>
          </div>
          <LogOut onClick={() => navigate('/signin')} className='w-5 h-5 text-gray-600 cursor-pointer' />
        </div>
        {
          sidebar ? <X onClick={() => setSidebar(false)} className='w-6 h-6 text-gray-600 sm:hidden' /> : <Menu onClick={() => setSidebar(true)} className='w-6 h-6 text-gray-600 sm:hidden' />
        }
      </nav>
      <div className='flex-1 w-full flex h-[calc(100vh-64px)]'>
        <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
        <div className='flex-1 bg-[#F4F7FB]'>
          <Outlet />
        </div>
      </div>
    </div>
  ) :(
    <SignIn />
  )
}

export default Layout