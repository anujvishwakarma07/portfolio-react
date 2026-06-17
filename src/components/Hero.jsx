import React from 'react'

function Hero() {
  return (
    <>
      <div className="banner-middle cmn-shadow">
        <span className="ab-btn cmn-shadow round100">
          Available for work
        </span>
        <span className="fz-20 fw-500 white dixon">
          Hi, I’m Anuj Vishwakarma,
        </span>
        <h1 className="white">
          Full Stack MERN Developer
          Building Scalable Web Solutions
        </h1>
        <div className="half-content">
          <div className="half-arros">
            <img src="/assets/img/blog/half-arrow.png" alt="img" />
          </div>
          <p className="pra-clr">
            I build scalable, high-performance Full MERN stack applications with a focus on clean code.
          </p>
        </div>
        <div className="banner-counter">
          <div className="counter-bitem">
            <span className="stor-tilecount">1+</span>
            <span className="pra-clr">
              Years of
              <span className="d-block">Experience</span>
            </span>
          </div>
          <div className="counter-bitem">
            <span className="stor-tilecount">10+</span>
            <span className="pra-clr">
              Projects
              <span className="d-block">Completed</span>
            </span>
          </div>
          <div className="counter-bitem">
            <span className="stor-tilecount">10+</span>
            <span className="pra-clr">
              Happy
              <span className="d-block">Clients</span>
            </span>
          </div>
        </div>
      </div>

      <div className="hero-right-wrap cmn-shadow">
        <div className="prof-head d-flex align-items-center justify-content-center">
          <span className="fz-20 fw-500 white">Profile:</span>
        </div>
        <div className="profile-img d-block">
          <img src="/assets/img/banner/anuj-profile.png" alt="img" className="round10" />
        </div>
        <span className="fz-20 d-block text-center fw-500 white">
          Software Developer
          <span className="d-block">Base in India,</span>
        </span>
        <ul className="right-social-com d-flex cmn-social gap-xxl-3 gap-2 justify-content-center">
          <li>
            <a href="https://www.instagram.com/imanuj_07_/" target="_blank" rel="noopener noreferrer">
              <i className="bi bi-instagram"></i>
            </a>
          </li>
          <li>
            <a href="mailto:anujvishwakarma7077@gmail.com">
              <i className="bi bi-envelope"></i>
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/anuj-vishwakarma-84845133b/" target="_blank" rel="noopener noreferrer">
              <i className="bi bi-linkedin"></i>
            </a>
          </li>
        </ul>
        <div className="text-center">
          <a 
            href="https://drive.google.com/file/d/18aJ_fqnEVlQ_NC9GwjwvWG1ngYdW2u70/view?usp=sharing" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="cv-btn"
          >
            Download CV
          </a>
        </div>
      </div>
    </>
  )
}

export default Hero
