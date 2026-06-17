import React, { useState } from 'react'

function Header() {
  const [menuActive, setMenuActive] = useState(false)

  const toggleMenu = () => {
    setMenuActive(!menuActive)
  }

  return (
    <div className="header-section-unique mobile-menu">
      <div className="header-wrapper">
        <div className="main__logo">
          <a href="/" className="logo">
            <img src="/assets/img/logo/av-logo.png" alt="logo" />
          </a>
        </div>
        
        {/* Toggle 'active' class on menu when mobile toggle is clicked */}
        <ul className={`main-menu d-grid ${menuActive ? 'active' : ''}`}>
          <li className="menu-border"></li>
          <li>
            <a href="/">Home</a>
          </li>
          <li className="menu-border"></li>
          <li>
            <a href="#about">About me</a>
          </li>
          <li className="menu-border"></li>
          <li>
            <a href="#reprot">Resume</a>
          </li>
          <li className="menu-border"></li>
          <li>
            <a href="#skill">Stack</a>
          </li>
          <li className="menu-border"></li>
          <li>
            <a href="#serv">Services</a>
          </li>
          <li className="menu-border"></li>
          <li>
            <a href="#ports">Portfolio</a>
          </li>
          <li className="menu-border"></li>
          <li>
            <a href="#testi">Client</a>
          </li>
          <li className="menu-border"></li>
          <li>
            <a href="#blogs">Insight</a>
          </li>
          <li className="menu-border"></li>
          <li>
            <a href="#conts">Contact Us</a>
          </li>
          <li className="menu-border"></li>
        </ul>

        <div className="custom-toggle-bar" onClick={toggleMenu}>
          <div className={`header-bar d-lg-none ${menuActive ? 'active' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
