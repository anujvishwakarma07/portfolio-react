import React from 'react'

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
            <a href="#reprot">Resume</a>
          </li>
          <li>
            <a href="#skill">Stack</a>
          </li>
          <li>
            <a href="#ports">Work</a>
          </li>
        </ul>

        {/* CTA Button - Visible on all screens */}
        <div className="header-cta">
          <a href="#conts" className="nav-cta-btn">Get in touch ↗</a>
        </div>
      </div>
    </div>
  )
}

export default Header
