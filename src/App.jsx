import { useEffect } from "react"
import Header from "./components/Header"
import Hero from "./components/Hero"
import AOS from 'aos' // 1. Import AOS JS library
import Footer from "./components/Footer"
import {BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import ServicesPage from "./pages/ServicesPage"
import PortfolioPage from "./pages/PortfolioPage"

function App() {
  //Initializing AOS when the app loads
  useEffect(() => {
    AOS.init({
      once: true,
      easing: 'ease-in-out',
    })
  }, []);

  return (
    <Router>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
      </Routes>


      {/* Rendering Footer */}
      <Footer />
    </Router>
  )
}

export default App
