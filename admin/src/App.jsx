import {Toaster} from 'react-hot-toast'
import {Routes, Route} from 'react-router-dom'
import Layout from './pages/Layout'
import Dashboard from './pages/Dashboard'
import Products from './pages/Products'
import Categories from './pages/Categories'
import Orders from './pages/Orders'
import Suppliers from './pages/Suppliers'
import Users from './pages/Users'
import Profile from './pages/Profile'

const App = () => {
  return (
    <div>
      <Toaster />
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path='products' element={<Products />} />
          <Route path='categories' element={<Categories />} />
          <Route path='orders' element={<Orders />} />
          <Route path='suppliers' element={<Suppliers />} />
          <Route path='users' element={<Users />} />
          <Route path='profile' element={<Profile />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
