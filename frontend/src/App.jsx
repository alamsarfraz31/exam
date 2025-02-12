import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './page/Home'
import Register from './page/Register'
import Login from './page/Login'
import Dashboard from './page/Dashboard/Dashboard'

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Home Route */}
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
          {/* Page Error */}
          <Route path='*' element={<h1 className=''>404 Page Not Found</h1>} />
          
        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
