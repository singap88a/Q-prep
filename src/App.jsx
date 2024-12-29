  
import './App.css'
import { BrowserRouter as Router, Routes,  Route   } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Newsletter from './components/Newsletter';
import Login from './pages/Login/Login';
import Sign_up from './pages/Sign_up/Sign_up';
import Home from './pages/Home/Home';
import About from './pages/About/About';

function App() {
 

  return (
    <Router>
      <Navbar/>
      {/* ////////////////// */}
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About/>} />

        <Route path="/login" element={<Login/>} />
        <Route path="/sign-up" element={<Sign_up/>} />
       </Routes>
       {/* ////////////////// */}
       <Newsletter/>
       <Footer/>
    </Router>
  )
}

export default App
