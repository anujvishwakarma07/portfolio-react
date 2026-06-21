import React from 'react'

function Marquee() {
  return (
    <section className="textslide-solution position-relative">
      {/* Center 'Let's Connect' circle button */}
      <div className="textsslide-hoverbox d-flex justify-content-center">
        <a href="#conts" className="hover-circle cmborder wow fadeInUp" data-wow-duration="1.6s">
          <span className="box">
            <i className="bi bi-arrow-up-right title"></i>
            <span className="textmore">Let`s Connect</span>
          </span>
        </a>
      </div>

      {/* Upper Marquee Track */}
      <div className="version-two-marque">
        <div className="mycustom-marque2">
          <div className="scrolling-wrap">
            <div className="comm">
              <div className="cmn-textslide">Full-Stack Development</div>
              <div><span className="slach">/</span></div>
              <div className="cmn-textslide">AI-Driven Applications</div>
              <div><span class="slach">/</span></div>
              <div className="cmn-textslide textitalick">MERN Stack</div>
              <div><span className="slach">/</span></div>
              <div className="cmn-textslide">Scalable Software /</div>
            </div>
            <div className="comm">
              <div className="cmn-textslide">Backend APIs</div>
              <div><span className="slach">/</span></div>
              <div className="cmn-textslide">Intelligent Systems</div>
              <div><span className="slach">/</span></div>
              <div className="cmn-textslide textitalick">Data & Logic</div>
              <div><span className="slach">/</span></div>
              <div className="cmn-textslide">Performance Optimization</div>
            </div>
          </div>
        </div>
      </div>

      {/* Lower Marquee Track */}
      <div className="version-one-marque">
        <div className="mycustom-marque">
          <div className="scrolling-wrap">
            <div className="comm">
              <div className="cmn-textslide">Full-Stack Development</div>
              <div><span className="slach">/</span></div>
              <div className="cmn-textslide">AI-Driven Applications</div>
              <div><span className="slach">/</span></div>
              <div className="cmn-textslide textitalick">MERN Stack</div>
              <div><span className="slach">/</span></div>
              <div className="cmn-textslide">Scalable Software /</div>
            </div>
            <div className="comm">
              <div className="cmn-textslide">Backend APIs</div>
              <div><span className="slach">/</span></div>
              <div className="cmn-textslide">Intelligent Systems</div>
              <div><span className="slach">/</span></div>
              <div className="cmn-textslide textitalick">Data & Logic</div>
              <div><span className="slach">/</span></div>
              <div className="cmn-textslide">Performance Optimization</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Marquee
