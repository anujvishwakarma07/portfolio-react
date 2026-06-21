import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <div className="header-section-unique horizontal-nav">
      <div className="header-wrapper">
        <a href="/" className="brand-link">
          <div className="logo-status-area">
            <svg className="brand-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10" stroke-dasharray="4 4"/>
              <path d="M12 6a6 6 0 0 1 6 6"/>
            </svg>
            <span className="brand-name">Anuj Vishwakarma</span>
          </div>
        </a>
        
        {/* Simplified horizontal navigation links */}
        <ul className="main-menu horizontal-menu">
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#skill">Stack</a>
          </li>
          <li>
            <a href="#reprot">Resume</a>
          </li>
          <li>
            <a href="#ports">Work</a>
          </li>
          <li>
            <a href="#serv">Services</a>
          </li>
        </ul>

        {/* CTA Buttons */}
        <div className="header-cta d-flex gap-2 align-items-center">
          <Link to="/resume" className="nav-secondary-btn d-inline-flex align-items-center gap-1">
            <i className="bi bi-download" style={{ fontSize: '14px' }}></i>
            <span className="d-none d-lg-inline">Download CV</span>
            <span className="d-inline d-lg-none">CV</span>
          </Link>
          <a href="#conts" className="nav-cta-btn">Get in touch ↗</a>
        </div>
      </div>
    </div>
  )
}

export default Header
