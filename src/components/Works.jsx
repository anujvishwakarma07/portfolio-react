import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'

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
                (2020-2024)
              </div>
              <img src="/assets/img/blog/half-arrow.png" alt="img" className="half-arrow" />
            </div>
          </div>
          
          {/* View All Projects Circle Button */}
          <div className="blog-hoverbox">
            <a href="protfolio.html" className="hover-circle cmborder wow fadeInUp" data-wow-duration="1.6s">
              <span className="box">
                <i className="bi bi-arrow-up-right"></i>
                <span className="textmore">Projects All</span>
              </span>
            </a>
          </div>
        </div>

        {/* Works Slider Wrapper */}
        <div className="working-project-wrap d-flex align-items-center justify-content-between">
          {/* Left navigation arrow */}
          <div className="portfolio-prev d-none d-sm-block" style={{ cursor: 'pointer' }}>
            <img src="/assets/img/blog/left-arrow.png" alt="Previous" />
          </div>

          <Swiper
            className="working-wrap"
            modules={[Navigation, Autoplay]}
            spaceBetween={10}
            speed={2000}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            navigation={{
              nextEl: '.portfolio-next',
              prevEl: '.portfolio-prev',
            }}
            slidesPerView={1}
          >
            <SwiperSlide>
              <div className="working-work-items cmn-shadow round8">
                <div className="thumb round8 position-relative mb-30">
                  <img src="/assets/img/blog/work01.png" alt="img" className="round8" />
                  <span className="bade-kit round100 d-inline-flex justify-content-center align-items-center">
                    Design Kit
                  </span>
                </div>
                <div className="working-content">
                  <h4 className="mb-xxl-2 mb-2">
                    <a href="protfolio-details.html" className="white">Digital Brand Design</a>
                  </h4>
                  <span className="pra-clr d-block">March, 2024</span>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="working-work-items cmn-shadow round8">
                <div className="thumb round8 position-relative mb-30">
                  <img src="/assets/img/blog/work2.png" alt="img" className="round8" />
                  <span className="bade-kit round100 d-inline-flex justify-content-center align-items-center">
                    Design Kit
                  </span>
                </div>
                <div className="working-content">
                  <h4 className="mb-xxl-2 mb-2">
                    <a href="protfolio-details.html" className="white">Digital Brand Design</a>
                  </h4>
                  <span className="pra-clr d-block">March, 2024</span>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="working-work-items cmn-shadow round8">
                <div className="thumb round8 position-relative mb-30">
                  <img src="/assets/img/blog/work3.png" alt="img" className="round8" />
                  <span className="bade-kit round100 d-inline-flex justify-content-center align-items-center">
                    Design Kit
                  </span>
                </div>
                <div className="working-content">
                  <h4 className="mb-xxl-2 mb-2">
                    <a href="protfolio-details.html" className="white">Digital Brand Design</a>
                  </h4>
                  <span className="pra-clr d-block">March, 2024</span>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="working-work-items cmn-shadow round8">
                <div className="thumb round8 position-relative mb-30">
                  <img src="/assets/img/blog/work1.png" alt="img" className="round8" />
                  <span className="bade-kit round100 d-inline-flex justify-content-center align-items-center">
                    Design Kit
                  </span>
                </div>
                <div className="working-content">
                  <h4 className="mb-xxl-2 mb-2">
                    <a href="protfolio-details.html" className="white">Digital Brand Design</a>
                  </h4>
                  <span className="pra-clr d-block">March, 2024</span>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>

          {/* Right navigation arrow */}
          <div className="portfolio-next d-none d-sm-block" style={{ cursor: 'pointer' }}>
            <img src="/assets/img/blog/right-arrow.png" alt="Next" />
          </div>
        </div>

        {/* Mobile arrows */}
        <div className="text-center mt-4 d-sm-none d-block">
          <div className="d-inline-flex justify-content-center gap-4">
            <div className="portfolio-prev" style={{ cursor: 'pointer' }}>
              <img src="/assets/img/blog/left-arrow.png" alt="Previous" />
            </div>
            <div className="portfolio-next" style={{ cursor: 'pointer' }}>
              <img src="/assets/img/blog/right-arrow.png" alt="Next" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Works
