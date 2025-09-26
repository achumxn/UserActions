import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SignUp from './components/SignUp'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import ProfilePage from './components/ProfilePage'
import Home from './components/Home'
import ProductsPage from './components/ProductsPage'
import Wishlist from './components/Wishlist'
import Pagination from './components/Pagination'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route path='/' element={<SignUp/>}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/profile" element={<ProfilePage/>}></Route>
            <Route path="/products" element={<ProductsPage/>}></Route>
            <Route path ="/wishlist" element={<Wishlist/>}></Route>
            <Route path="/allproducts" element={<Pagination/>}></Route>
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
