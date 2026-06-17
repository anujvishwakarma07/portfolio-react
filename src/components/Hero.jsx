import React from 'react'

function Hero() {
  return (
    <div className="hero-fullscreen-layout container">
      <div className="row align-items-center h-100 py-lg-5">

        {/* Left Side: Typography and main introduction */}
        <div className="col-lg-7 col-md-12 hero-text-side">
          <div className="location-label mb-3" data-aos="fade-down" data-aos-duration="1000">
            <span>Base in India · Open to interesting projects</span>
          </div>

          <h1 className="hero-main-title white mb-4" data-aos="fade-right" data-aos-duration="1200">
            Building <i>scalable, high-performance</i> MERN stack applications that <i>solve real-world</i> problems.
          </h1>

          <p className="hero-intro-desc pra-clr mb-5" data-aos="fade-right" data-aos-duration="1400">
            I’m Anuj Vishwakarma — a Full Stack Developer specializing in crafting robust backend services, dynamic interfaces, and scaling web solutions. Let’s build something impactful.
          </p>

          {/* Quick Metrics at bottom left */}
          <div className="hero-metrics-grid d-flex flex-wrap gap-5 mt-4" data-aos="fade-up" data-aos-duration="1500">
            <div className="metric-item">
              <span className="metric-number">1+</span>
              <span className="metric-label">Years of<br />Experience</span>
            </div>
            <div className="metric-item">
              <span className="metric-number">10+</span>
              <span className="metric-label">Projects<br />Completed</span>
            </div>
            <div className="metric-item">
              <span className="metric-number">10+</span>
              <span className="metric-label">Happy<br />Clients</span>
            </div>
          </div>
        </div>

        {/* Right Side: Profile visual */}
        <div className="col-lg-5 col-md-12 hero-visual-side mt-5 mt-lg-0 d-flex justify-content-center justify-content-lg-end" data-aos="fade-left" data-aos-duration="1200">
          <div className="hero-profile-card-layout d-flex flex-column align-items-center">
            <div className="hero-profile-image-wrap">
              <img src="/assets/img/banner/profile.png" alt="Anuj Vishwakarma Profile" className="hero-profile-img" />
            </div>

            <div className="profile-details mt-3 text-center">
              <h4 className="profile-name white mb-3">Anuj Vishwakarma</h4>
              <ul className="profile-social-links d-flex gap-3 justify-content-center">
                <li>
                  <a href="https://www.instagram.com/imanuj_07_/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <i className="bi bi-instagram"></i>
                  </a>
                </li>
                <li>
                  <a href="mailto:anujvishwakarma7077@gmail.com" aria-label="Email">
                    <i className="bi bi-envelope"></i>
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/anuj-vishwakarma-84845133b/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <i className="bi bi-linkedin"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Hero
