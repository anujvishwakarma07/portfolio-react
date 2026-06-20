import React from 'react'
import { Link } from 'react-router-dom'

function Works() {
  return (
    <section className="working-section check-box-style mb-common pt-100 pb-100" id="ports">
      <div className="container">
        <div className="cus__mb60 d-md-flex d-grid align-items-center justify-content-between gap-3">
          <div className="section-title">
            <span className="section-sub" data-aos="fade-down" data-aos-duration="1000">
              My Works
            </span>
            <h2 className="stitle fw-500 mt-3" data-aos="fade-down" data-aos-duration="1500">
              Look at My Portfolio & Give Me
              <span className="text-storkes d-block">
                Your Feedback
              </span>
            </h2>
            <div className="select-work d-flex align-items-start">
              <div className="d-flex flex-wrap align-items-center gap-md-4 gap-2 white">
                <span className="pra-clr">Selected work *</span>
                (2025-2026)
              </div>
              <img src="/assets/img/blog/half-arrow.png" alt="img" className="half-arrow" />
            </div>
          </div>
          
          {/* View All Projects Circle Button */}
          <div className="blog-hoverbox">
            <Link to="/portfolio" className="hover-circle cmborder wow fadeInUp" data-wow-duration="1.6s">
              <span className="box">
                <i className="bi bi-arrow-up-right"></i>
                <span className="textmore">Projects All</span>
              </span>
            </Link>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="row g-4">
          {/* HavynLife */}
          <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-duration="1000">
            <div className="working-work-items cmn-shadow round8">
              <div className="thumb round8 position-relative mb-30">
                <img src="/assets/img/blog/havynlife.png" alt="HavynLife - Airbnb Inspired Platform" className="round8" />
                <span className="bade-kit round100 d-inline-flex justify-content-center align-items-center">
                  Full Stack
                </span>
              </div>
              <div className="working-content">
                <h4 className="mb-xxl-2 mb-2">
                  <Link to="/Portfolio/havynlife" className="white">HAVYNLIFE</Link>
                </h4>
                <span className="pra-clr d-block mb-2">Node.js · Express · MongoDB · EJS</span>
                <div className="d-flex gap-2 flex-wrap">
                  <a href="https://github.com/anujvishwakarma07/HavynLife" target="_blank" rel="noopener noreferrer" className="project-link-btn">
                    <i className="bi bi-github"></i> GitHub
                  </a>
                  <a href="https://havynlife.onrender.com/" target="_blank" rel="noopener noreferrer" className="project-link-btn project-link-live">
                    <i className="bi bi-box-arrow-up-right"></i> Live
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* TanviqGPT */}
          <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-duration="1200">
            <div className="working-work-items cmn-shadow round8">
              <div className="thumb round8 position-relative mb-30">
                <img src="/assets/img/blog/tanviqgpt.png" alt="TanviqGPT - AI Chat Application" className="round8" />
                <span className="bade-kit round100 d-inline-flex justify-content-center align-items-center">
                  AI / LLM
                </span>
              </div>
              <div className="working-content">
                <h4 className="mb-xxl-2 mb-2">
                  <Link to="/Portfolio/tanviqgpt" className="white">TANVIQGPT</Link>
                </h4>
                <span className="pra-clr d-block mb-2">React.js · Node.js · Express.js · MongoDB Atlas · OpenRouter API</span>
                <div className="d-flex gap-2 flex-wrap">
                  <a href="https://github.com/anujvishwakarma07/TanviqGpt" target="_blank" rel="noopener noreferrer" className="project-link-btn">
                    <i className="bi bi-github"></i> GitHub
                  </a>
                  <a href="https://tanviq-gpt.vercel.app/" target="_blank" rel="noopener noreferrer" className="project-link-btn project-link-live">
                    <i className="bi bi-box-arrow-up-right"></i> Live
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* UpNexa */}
          <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-duration="1400">
            <div className="working-work-items cmn-shadow round8">
              <div className="thumb round8 position-relative mb-30">
                <img src="/assets/img/blog/upnexa.png" alt="UpNexa - Startup Listing Platform" className="round8" />
                <span className="bade-kit round100 d-inline-flex justify-content-center align-items-center">
                  Next.js
                </span>
              </div>
              <div className="working-content">
                <h4 className="mb-xxl-2 mb-2">
                  <Link to="/Portfolio/upnexa" className="white">UPNEXA</Link>
                </h4>
                <span className="pra-clr d-block mb-2">Next.js 15 · React 19 · Sanity CMS · Tailwind CSS</span>
                <div className="d-flex gap-2 flex-wrap">
                  <a href="https://github.com/anujvishwakarma07/UpNexa" target="_blank" rel="noopener noreferrer" className="project-link-btn">
                    <i className="bi bi-github"></i> GitHub
                  </a>
                  <a href="https://upnexa.vercel.app/" target="_blank" rel="noopener noreferrer" className="project-link-btn project-link-live">
                    <i className="bi bi-box-arrow-up-right"></i> Live
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Works
