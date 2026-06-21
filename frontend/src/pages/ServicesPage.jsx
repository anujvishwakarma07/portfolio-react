import React, { useEffect } from 'react'
import Services from '../components/Services'
import Marquee from '../components/Marquee'
import Sponsors from '../components/Sponsors'

function ServicesPage() {
  useEffect(() => {
    document.title = 'Services | Anuj Vishwakarma – Full Stack Developer'
  }, [])

  return (
    <>
      {/* 1. Services Page Header Banner */}
      <section className="breadcrumnd-section" id="bn">
        <div className="container pt-100 pb-100">
          <div className="section-title mb-60">
            <h2 className="stitle fw-500 mt-3" data-aos="fade-down" data-aos-duration="1500">
              WE PROVIDE
              <span className="d-block">SMART SERVICE</span>
            </h2>
          </div>
          <div className="bread-arrow-inner">
            <div className="arrow">
              <img src="/assets/img/blog/half-arrow.png" alt="img" />
            </div>
            <p className="pra-clr">
              Safely collect, process, and share your data with the plan
              that’s right for you. Safely collect, process, and share your
              data with the plan that’s right for you.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Scrolling "Service" text banner */}
      <div className="service-scroll-textwrap">
        <div className="scrolling-wrap">
          <div className="comm">
            <div className="cmn-textslide">Service</div>
            <div className="cmn-textslide text-custom-storke">Service</div>
            <div className="cmn-textslide textitalick">Service</div>
            <div className="cmn-textslide text-custom-storke">Service</div>
            <div className="cmn-textslide">Service /</div>
          </div>
          <div className="comm">
            <div className="cmn-textslide">Service</div>
            <div className="cmn-textslide text-custom-storke">Service</div>
            <div className="cmn-textslide textitalick">Service</div>
            <div className="cmn-textslide text-custom-storke">Service</div>
            <div className="cmn-textslide">Service /</div>
          </div>
        </div>
      </div>

      {/* 3. Reuse the Services carousel */}
      <Services />

      {/* 4. Reuse the scrolling stack marquee */}
      <Marquee />

      {/* 5. Pricing Plan Section (Unique to Services Page) */}
      <section className="pricing-section">
        <div className="container">
          <div className="section-title text-center mb-60">
            <span className="section-sub" data-aos="fade-down" data-aos-duration="1000">
              Pricing Plan
            </span>
            <h2 className="stitle fw-500 mt-3" data-aos="fade-down" data-aos-duration="1500">
              Choose Your Favourite
              <span className="text-storkes d-block">Pricing Package</span>
            </h2>
          </div>
          <div className="row g-4 justify-content-center">
            {/* Basic Plan */}
            <div className="col-lg-4 col-md-6 col-sm-6" data-aos="fade-up" data-aos-duration="1000">
              <div className="price-item cmn-shadow d-flex justify-content-center">
                <div className="box">
                  <h5 className="white text-center">Basic Plan</h5>
                  <h2 className="pri-title">$68<span>/Per Month</span></h2>
                  <ul className="pri-list">
                    <li>Web Development</li>
                    <li>Mobile Development</li>
                    <li>Advertising</li>
                    <li>Graphic design</li>
                    <li>Project management</li>
                  </ul>
                  <a href="#conts" className="hover-circle cmborder wow fadeInUp" data-wow-duration="1.6s">
                    <span className="box">
                      <i className="bi bi-arrow-up-right title"></i>
                      <span className="textmore">View More</span>
                    </span>
                  </a>
                </div>
              </div>
            </div>

            {/* Standard Plan */}
            <div className="col-lg-4 col-md-6 col-sm-6" data-aos="fade-up" data-aos-duration="1000">
              <div className="price-item cmn-shadow d-flex justify-content-center">
                <div className="box">
                  <h5 className="white text-center">Standard Plan</h5>
                  <h2 className="pri-title">$98<span>/Per Month</span></h2>
                  <ul className="pri-list">
                    <li>Web Development</li>
                    <li>Mobile Development</li>
                    <li>Advertising</li>
                    <li>Graphic design</li>
                    <li>Project management</li>
                  </ul>
                  <a href="#conts" className="hover-circle cmborder wow fadeInUp" data-wow-duration="1.6s">
                    <span className="box">
                      <i className="bi bi-arrow-up-right title"></i>
                      <span className="textmore">View More</span>
                    </span>
                  </a>
                </div>
              </div>
            </div>

            {/* Premium Plan */}
            <div className="col-lg-4 col-md-6 col-sm-6" data-aos="fade-up" data-aos-duration="1000">
              <div className="price-item cmn-shadow d-flex justify-content-center">
                <div className="box">
                  <h5 className="white text-center">Premium Plan</h5>
                  <h2 className="pri-title">$118<span>/Per Month</span></h2>
                  <ul className="pri-list">
                    <li>Web Development</li>
                    <li>Mobile Development</li>
                    <li>Advertising</li>
                    <li>Graphic design</li>
                    <li>Project management</li>
                  </ul>
                  <a href="#conts" className="hover-circle cmborder wow fadeInUp" data-wow-duration="1.6s">
                    <span className="box">
                      <i className="bi bi-arrow-up-right title"></i>
                      <span className="textmore">View More</span>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Reuse the Technologies slider */}
      <Sponsors />
    </>
  )
}

export default ServicesPage
