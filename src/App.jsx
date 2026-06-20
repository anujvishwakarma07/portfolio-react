import { useEffect } from "react"
import Header from "./components/Header"
import Hero from "./components/Hero"
import AOS from 'aos' // 1. Import AOS JS library
import Footer from "./components/Footer"
import {BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import ServicesPage from "./pages/ServicesPage"
import PortfolioPage from "./pages/PortfolioPage"
import BlogPage from "./pages/BlogPage"
import BlogDetailsPage from "./pages/BlogDetailsPage"
import PortfolioDetailsPage from "./pages/PortfolioDetailsPage"
import NotFoundPage from "./pages/NotFoundPage"
import { Agentation } from "agentation";

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
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogDetailsPage />} />
        <Route path="/Portfolio/:id" element={<PortfolioDetailsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>


      {/* Rendering Footer */}
      <Footer />
      
      {/* Agentation Toolbar */}
      {import.meta.env.DEV && <Agentation />}
    </Router>
  )
}

export default App
