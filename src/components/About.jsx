import React from 'react'


function About() {
  return (
    <section className="about-section-v01 check-box-style mb-common pt-100 pb-100" id="about">
      <div className="container">
        <div className="edu-expri-head">
          <div className="section-title mb-60">
            <span className="section-sub" data-aos="fade-down" data-aos-duration="1000">
              About Me
            </span>
            <h3 className="mt-3" data-aos="fade-down" data-aos-duration="1500">
              CSE Graduate and <i>Full Stack Developer</i>. I design, build, and deploy <i>MERN & Next.js</i> applications with secure auth, real-time data, and <i>AI-powered</i> features.
            </h3>
          </div>
        </div>
        <div className="row g-lg-4 g-4 justify-content-between">
          <div className="col-lg-5">
            <div className="about-thumbv1">
              <img 
                src="/assets/img/about/anuj_main.png" 
                alt="Anuj Vishwakarma" 
                className="round10 img-full-view" 
              />
            </div>
          </div>
          <div className="col-lg-7">
            <div className="about-content-v1">
              <div className="section-title mb-xxl-5 mb-sm-4 mb-3">
                <h2 className="stitle mt-3" data-aos="fade-down" data-aos-duration="1500">
                  How do I <span className="text-storkes"><i>build?</i></span>
                </h2>
              </div>
              <div className="about-content-inner d-flex justify-content-end">
                <div className="boxes">
                  <a href="#" className="arrow">
                    <img src="/assets/img/blog/arrow-down.png" alt="img" />
                  </a>
                  <div className="right-comp">
                    <p className="pra-clr mb-3">
                      I'm Anuj from UP, India, focused on building solid, backend-heavy full stack applications using Node.js, React, MongoDB, and Laravel. Over the last 2 years, I've shipped Havynlife and TanviqGPT, implementing secure auth, live Mapbox mapping, and OpenAI integrations.
                    </p>
                    <p className="pra-clr mb-4">
                      My approach: DB-first design, clean code, and optimization. If it breaks in production or runs slow, it's not done. Currently leveling up in DSA and system design.
                    </p>
                    <ul className="profile-social-links d-flex gap-3 mt-4 mb-4 justify-content-start flex-wrap">
                      <li>
                        <a href="https://github.com/anujvishwakarma07" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                          <i className="bi bi-github" style={{ fontSize: '18px' }}></i>
                        </a>
                      </li>
                      <li>
                        <a href="https://www.linkedin.com/in/anuj-vishwakarma-84845133b/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                          <i className="bi bi-linkedin" style={{ fontSize: '18px' }}></i>
                        </a>
                      </li>
                      <li>
                        <a href="mailto:anujvishwakarma7077@gmail.com" aria-label="Email">
                          <i className="bi bi-envelope" style={{ fontSize: '18px' }}></i>
                        </a>
                      </li>
                      <li>
                        <a href="https://leetcode.com/u/anujvishwakarma07/" target="_blank" rel="noopener noreferrer" aria-label="LeetCode">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor" style={{ verticalAlign: 'middle' }}>
                            <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
                          </svg>
                        </a>
                      </li>
                    </ul>
                    <a href="#" className="hover-circle cmborder wow fadeInUp" data-wow-duration="1.6s">
                      <span className="box">
                        <i className="bi bi-arrow-up-right"></i>
                        <span className="textmore">About Me</span>
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
