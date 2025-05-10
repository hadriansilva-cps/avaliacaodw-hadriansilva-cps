import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import { useAuthValue } from './context/AuthContext';
import Dashboard from './pages/Dashboard/Dashboard';
import About  from './pages/About/About';
import CreatePost from './pages/CreatePost/CreatePost';
import './App.css'
  

function App() {
  const { user } = useAuthValue();
 
  return (
    <>
       
      <div>
        
        <BrowserRouter>
        
        <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={!user ? <Login /> : <Navigate to="/"/>} />
              <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
              <Route path="/register" element={<Register />} />
              <Route path="/about" element={<About />} />
              <Route path="/Create-post" element={<CreatePost />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </div>
    </>
  )
}

export default App



