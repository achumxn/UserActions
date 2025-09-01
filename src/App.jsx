import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SignUp from './components/SignUp'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import HomePage from './components/HomePage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route path='/' element={<SignUp/>}></Route>
            <Route path="/home" element={<HomePage />}></Route>
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
