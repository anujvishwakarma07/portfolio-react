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
              I’m a <i>Full-Stack Developer</i> working with MERN and <i>Next.js</i>, building <i>scalable</i> web applications and solving <i>real-world</i> development problems.
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
                  To Build <i>Scalable</i> And
                  <span className="text-storkes d-block">
                    <i>Modern Web Solutions</i>
                  </span>
                </h2>
              </div>
              <div className="about-content-inner d-flex justify-content-end">
                <div className="boxes">
                  <a href="#" className="arrow">
                    <img src="/assets/img/blog/arrow-down.png" alt="img" />
                  </a>
                  <div className="right-comp">
                    <p className="pra-clr">
                      I enjoy turning ideas into working products by building fast, reliable web applications
                      with MERN and Next.js. I focus on writing clean code, improving performance, and creating
                      smooth user experiences that solve real problems.
                    </p>
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
