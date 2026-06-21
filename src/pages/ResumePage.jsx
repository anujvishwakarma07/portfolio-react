import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

function ResumePage() {
  useEffect(() => {
    document.title = 'Resume | Anuj Vishwakarma – Full Stack Developer'
  }, [])

  return (
    <>
      {/* Resume Page Header Banner */}
      <section className="breadcrumnd-section" id="bn">
        <div className="container pt-100 pb-100">
          <div className="section-title text-center">
            <span className="section-sub" data-aos="fade-down" data-aos-duration="1000">
              Curriculum Vitae
            </span>
            <h2 className="stitle fw-500 mt-3" data-aos="fade-down" data-aos-duration="1500">
              Professional <i>Resume</i>
            </h2>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="resume-page-section">
        <div className="container">
          
          {/* Header navigation bar */}
          <div className="resume-header-nav" data-aos="fade-up" data-aos-duration="1200">
            <Link to="/" className="resume-back-btn">
              <i className="bi bi-arrow-left"></i> Back to Home
            </Link>
            <a 
              href="/Resume/ANUJ_VISHWAKARMA_CV.pdf" 
              download="ANUJ_VISHWAKARMA_CV.pdf" 
              className="resume-download-btn"
            >
              <i className="bi bi-download"></i> Download PDF CV
            </a>
          </div>

          <div className="row g-4 justify-content-between">
            {/* Sidebar info (4 cols) */}
            <div className="col-lg-4" data-aos="fade-right" data-aos-duration="1400">
              <div className="resume-card">
                <h3 className="resume-sidebar-title">Candidate Details</h3>
                <ul className="resume-info-list">
                  <li>
                    <span className="label">Name</span>
                    <span className="val">Anuj Vishwakarma</span>
                  </li>
                  <li>
                    <span className="label">Role</span>
                    <span className="val">Full Stack Developer</span>
                  </li>
                  <li>
                    <span className="label">Email</span>
                    <span className="val">
                      <a href="mailto:anujvishwakarma7077@gmail.com">anujvishwakarma7077@gmail.com</a>
                    </span>
                  </li>
                  <li>
                    <span className="label">Location</span>
                    <span className="val">Uttar Pradesh, India</span>
                  </li>
                  <li>
                    <span className="label">GitHub</span>
                    <span className="val">
                      <a href="https://github.com/anujvishwakarma07" target="_blank" rel="noopener noreferrer">
                        github.com/anujvishwakarma07
                      </a>
                    </span>
                  </li>
                  <li>
                    <span className="label">LinkedIn</span>
                    <span className="val">
                      <a href="https://www.linkedin.com/in/anuj-vishwakarma-84845133b/" target="_blank" rel="noopener noreferrer">
                        linkedin.com/in/anuj-vishwakarma-84845133b
                      </a>
                    </span>
                  </li>
                  <li>
                    <span className="label">LeetCode</span>
                    <span className="val">
                      <a href="https://leetcode.com/u/anujvishwakarma07/" target="_blank" rel="noopener noreferrer">
                        leetcode.com/u/anujvishwakarma07
                      </a>
                    </span>
                  </li>
                </ul>

                <h3 className="resume-sidebar-title">Core Skills</h3>
                <div className="resume-skills-tags">
                  <span className="resume-skill-tag">React.js</span>
                  <span className="resume-skill-tag">Next.js</span>
                  <span className="resume-skill-tag">Node.js</span>
                  <span className="resume-skill-tag">Express.js</span>
                  <span className="resume-skill-tag">MongoDB</span>
                  <span className="resume-skill-tag">JavaScript (ES6+)</span>
                  <span className="resume-skill-tag">Python / ML</span>
                  <span className="resume-skill-tag">PHP / Laravel</span>
                  <span className="resume-skill-tag">Tailwind CSS</span>
                  <span className="resume-skill-tag">REST APIs</span>
                </div>
              </div>
            </div>

            {/* Resume PDF Viewer (8 cols) */}
            <div className="col-lg-8" data-aos="fade-left" data-aos-duration="1400">
              <div className="pdf-viewer-container">
                <iframe
                  src="/Resume/ANUJ_VISHWAKARMA_CV.pdf"
                  width="100%"
                  height="750px"
                  style={{ border: 'none', background: '#111' }}
                  title="Anuj Vishwakarma CV"
                >
                  <div className="pdf-fallback-card">
                    <i className="bi bi-file-pdf" style={{ fontSize: '48px', color: '#ff4d4d' }}></i>
                    <h4 className="white mt-3">Unable to preview PDF</h4>
                    <p className="pra-clr mt-2 mb-4">Your browser doesn't support PDF embedding in iframes.</p>
                    <a 
                      href="/Resume/ANUJ_VISHWAKARMA_CV.pdf" 
                      download="ANUJ_VISHWAKARMA_CV.pdf" 
                      className="resume-download-btn"
                    >
                      <i className="bi bi-download"></i> Download to View
                    </a>
                  </div>
                </iframe>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  )
}

export default ResumePage
