import { useState, useEffect } from "react"
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
import Preloader from "./components/Preloader";

function App() {
  const [showPreloader, setShowPreloader] = useState(() => {
    // Check if the preloader was already shown in this session
    try {
      return !sessionStorage.getItem("preloader_shown");
    } catch (e) {
      return true; // Fallback to show it if storage is blocked
    }
  });

  // Initialize AOS only when the preloader is dismissed/skipped to sync entrance animations
  useEffect(() => {
    if (!showPreloader) {
      const timer = setTimeout(() => {
        AOS.init({
          once: true,
          easing: 'ease-in-out',
        });
      }, 150); // slight delay to align with the slide-up reveal
      return () => clearTimeout(timer);
    }
  }, [showPreloader]);

  const handlePreloaderComplete = () => {
    try {
      sessionStorage.setItem("preloader_shown", "true");
    } catch (e) {
      // Silent catch if storage is disabled
    }
    setShowPreloader(false);
  };

  return (
    <Router>
      {showPreloader && <Preloader onComplete={handlePreloaderComplete} />}


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
