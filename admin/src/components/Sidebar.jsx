import React from 'react'
import { NavLink } from 'react-router-dom';
import { House, Package, Users, Truck, ShoppingBag, ChartColumnStacked, Settings, LogOut } from 'lucide-react';

const navItems = [
  { to: '/' , label: 'Dashboard', Icon: House },
  { to: '/products' , label: 'Products', Icon: ShoppingBag},
  { to: '/categories' , label: 'Categories', Icon: ChartColumnStacked },
  { to: '/orders' , label: 'Orders', Icon: Package },
  { to: '/suppliers' , label: 'Suppliers', Icon: Truck },
  { to: '/users' , label: 'Users', Icon: Users },
  { to: '/profile' , label: 'Profile', Icon: Settings },
]

const Sidebar = ({sidebar, setSidebar}) => {
  return (
    <div className={`w-60 bg-white border-r border-gray-200 flex flex-col justify-between items-center max-sm:absolute top-14 bottom-0 ${sidebar ? 'left-0' : '-left-full'} transition-all duration-300`}>
      <div className='w-full px-3.5 mt-5 text-sm text-gray-600 font-medium'>
        {
          navItems.map(({to, label, Icon}) => (
            <NavLink key={to} to={to} end={to === '/'} onClick={() => setSidebar(false)} className={({isActive})=> `px-3.5 py-2.5 flex items-center gap-3 rounded ${isActive ? 'bg-gradient-to-r from-blue-400 to-gray-800 text-white' : ''}`}>
              {({isActive})=>(
                  <>
                      <Icon className={`w-4 h-4 ${isActive ? 'text-white' : ''}`}/>
                      {label}
                  </>
              )}
            </NavLink>
          ))
        }
      </div>

      <div className="flex justify-center items-center gap-4 py-4 border-t border-gray-300 w-full sm:hidden">
        <div className='flex flex-col items-center'>
          <h3 className='text-gray-700 text-center font-bold'>Admin Panel</h3>
          <p className='text-xs text-gray-500'>admin@admin.com</p>
        </div>
        <LogOut 
          onClick={() => navigate('/signin')}
          className="w-5 h-5 text-gray-600 cursor-pointer"
        />
      </div>
    </div>
  )
}

export default Sidebar