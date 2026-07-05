import { useState, useEffect } from "react"
import Header from "./components/Header"
import AOS from 'aos'
import Footer from "./components/Footer"
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom"
import Home from "./pages/Home"
import PortfolioPage from "./pages/PortfolioPage"
import PortfolioDetailsPage from "./pages/PortfolioDetailsPage"
import NotFoundPage from "./pages/NotFoundPage"
import ResumePage from "./pages/ResumePage"
import { Agentation } from "agentation"
import Preloader from "./components/Preloader"
import ScrollToTop from "./components/ScrollToTop"

// Admin Section Imports
import AdminLayout from "./components/AdminLayout"
import AdminLogin from "./pages/admin/AdminLogin"
import AdminDashboard from "./pages/admin/AdminDashboard"
import AdminProjects from "./pages/admin/AdminProjects"
import AdminContent from "./pages/admin/AdminContent"
import AdminMessages from "./pages/admin/AdminMessages"
import AdminFeedbacks from "./pages/admin/AdminFeedbacks"
import AnalyticsTracker from "./components/AnalyticsTracker"
import FeedbackWidget from "./components/FeedbackWidget"

// Global header wrapper — hidden on /admin routes
function GlobalHeader() {
  const location = useLocation()
  if (location.pathname.startsWith('/admin')) return null
  return <Header />
}

function App() {
  const [showPreloader, setShowPreloader] = useState(() => {
    try {
      return !sessionStorage.getItem("preloader_shown")
    } catch (e) {
      return true
    }
  })

  // Initialize AOS only after the preloader is dismissed
  useEffect(() => {
    if (!showPreloader) {
      const timer = setTimeout(() => {
        AOS.init({
          once: true,
          easing: 'ease-in-out',
        })
      }, 150)
      return () => clearTimeout(timer)
    }
  }, [showPreloader])

  const handlePreloaderComplete = () => {
    try {
      sessionStorage.setItem("preloader_shown", "true")
    } catch (e) {
      // Silent catch if storage is disabled
    }
    setShowPreloader(false)
  }

  return (
    <Router>
      {/* Scroll window to top on every route change */}
      <ScrollToTop />

      {showPreloader && <Preloader onComplete={handlePreloaderComplete} />}

      {/* Global Audience Telemetry Tracker */}
      <AnalyticsTracker />

      {/* Floating Visitor Feedback Widget */}
      <FeedbackWidget />

      {/* Global Navbar — shown on all routes except /admin */}
      <GlobalHeader />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/Portfolio/:id" element={<PortfolioDetailsPage />} />
        <Route path="/resume" element={<ResumePage />} />
        <Route path="/Resume" element={<ResumePage />} />

        {/* Admin Control Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="content" element={<AdminContent />} />
          <Route path="messages" element={<AdminMessages />} />
          <Route path="feedbacks" element={<AdminFeedbacks />} />
        </Route>

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
