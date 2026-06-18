import React from 'react'

function Timeline() {
  return (
    <section className="exprience-section-v01 check-box-style mb-common pt-100 pb-100" id="reprot">
      <div className="container">
        <div className="section-title mb-60">
          <span className="section-sub" data-aos="fade-down" data-aos-duration="1000">
            Timeline Period
          </span>
          <h2 className="stitle mt-3" data-aos="fade-down" data-aos-duration="1500">
            My <i>Work Experience</i> And
            <span className="text-storkes d-block">
              <i>My Education</i>
            </span>
          </h2>
        </div>
        <div className="row g-xxl-4 g-4 justify-content-between">
          {/* Left Side: Work Experience */}
          <div className="col-lg-6 col-md-12">
            <div className="education-inner-column">
              {/* Experience Item 1 */}
              <div className="education-item-row">
                <div className="edu-dot-wrap">
                  <div className="edu-l1"><i className="bi bi-dot"></i></div>
                </div>
                <div className="education-item cmn-shadow round8 w-100">
                  <div className="educa-head">
                    <h4>
                      <a href="#" className="white">
                        AI/ML Intern - Infosys Springboard 6.0
                      </a>
                    </h4>
                    <span className="pra-clr">
                      ( December 2025 - Present )
                    </span>
                  </div>
                  <p className="pra-clr">
                    Actively learning AI/ML through hands-on project work. Developing skills in Python, machine
                    learning models, data analysis, and deployment on real-world applications.
                  </p>
                </div>
              </div>
              {/* Experience Item 2 */}
              <div className="education-item-row">
                <div className="edu-dot-wrap">
                  <div className="edu-l1"><i className="bi bi-dot"></i></div>
                </div>
                <div className="education-item cmn-shadow round8 w-100">
                  <div className="educa-head">
                    <h4>
                      <a href="#" className="white">
                        frontend Developer Intern - Karyanexus
                      </a>
                    </h4>
                    <span className="pra-clr">
                      ( July 2025 - December 2025 )
                    </span>
                  </div>
                  <p className="pra-clr">
                    Immersed in real-world development at KaryaNexus, leveraging React, Next.js, Tailwind CSS,
                    and evolving with new tools to deliver impactful web solutions while sharpening my technical craft.
                  </p>
                </div>
              </div>
              {/* Experience Item 3 */}
              <div className="education-item-row">
                <div className="edu-dot-wrap">
                  <div className="edu-l1"><i className="bi bi-dot"></i></div>
                </div>
                <div className="education-item cmn-shadow round8 w-100">
                  <div className="educa-head">
                    <h4>
                      <a href="#" className="white">
                        Associate L1 Intern – Infotact Solutions (Web Development)
                      </a>
                    </h4>
                    <span className="pra-clr">
                      ( july 2025 - September 2025 )
                    </span>
                  </div>
                  <p className="pra-clr">
                    Entry-level web development internship focused on frontline support, basic troubleshooting, UI
                    fixes, and real-world project contributions within a dynamic team environment.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Education */}
          <div className="col-lg-6 col-md-12">
            <div className="education-inner-column">
              {/* Education Item 1 */}
              <div className="education-item-row">
                <div className="edu-dot-wrap">
                  <div className="edu-l1"><i className="bi bi-dot"></i></div>
                </div>
                <div className="education-item cmn-shadow round8 w-100">
                  <div className="educa-head">
                    <h4>
                      <a href="#" className="white">
                        Sigma 7.0 - APNA COLLAGE
                      </a>
                    </h4>
                    <span className="pra-clr">
                      ( March 2025 - November 2025 )
                    </span>
                  </div>
                  <p className="pra-clr">
                    Built strong foundations in DSA and full-stack development through Sigma 7.0’s practical,
                    project-based learning.
                  </p>
                </div>
              </div>
              {/* Education Item 2 */}
              <div className="education-item-row">
                <div className="edu-dot-wrap">
                  <div className="edu-l1"><i className="bi bi-dot"></i></div>
                </div>
                <div className="education-item cmn-shadow round8 w-100">
                  <div className="educa-head">
                    <h4>
                      <a href="#" className="white">
                        B.Tech (AI/ML) - KIT Kanpur
                      </a>
                    </h4>
                    <span className="pra-clr">
                      ( 2022 - 2026 ) Ongoing
                    </span>
                  </div>
                  <p className="pra-clr">
                    Aspiring software developer with strong foundation in full-stack apps, enhanced by practical
                    AI/ML skills in machine learning models and data analytics.
                  </p>
                </div>
              </div>
              {/* Education Item 3 */}
              <div className="education-item-row">
                <div className="edu-dot-wrap">
                  <div className="edu-l1"><i className="bi bi-dot"></i></div>
                </div>
                <div className="education-item cmn-shadow round8 w-100">
                  <div className="educa-head">
                    <h4>
                      <a href="#" className="white">
                        Schooling - PMIC Kanpur
                      </a>
                    </h4>
                    <span className="pra-clr">
                      ( 2016 - 2022 )
                    </span>
                  </div>
                  <p className="pra-clr">
                    Completed higher secondary education focused on Mathematics, Physics, Chemistry, and self-driven
                    computer tinkering—building a strong foundation for technical pursuits.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Timeline
