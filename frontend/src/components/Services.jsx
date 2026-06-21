import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'

function Services() {
  return (
    <section className="quality-section check-box-style mb-common pt-100 pb-100" id="serv">
      <div className="container">
        <div className="cus__mb60 d-md-flex d-grid align-items-end justify-content-between gap-3">
          <div className="section-title">
            <span className="section-sub" data-aos="fade-down" data-aos-duration="1000">
              Quality Services
            </span>
            <h2 className="stitle fw-500 mt-3" data-aos="fade-down" data-aos-duration="1500">
              My Strength Lies
              <span className="text-storkes d-block">
                in Quality Work
              </span>
            </h2>
          </div>
          
          {/* Slider Navigation Buttons */}
          <div className="d-inline-flex align-items-center gap-3">
            <div className="mcustom__next1 cmn-slide-btn cmn-shadow d-center round50">
              <i className="bi bi-chevron-left"></i>
            </div>
            <div className="mcustom__prev1 cmn-slide-btn cmn-shadow d-center round50">
              <i className="bi bi-chevron-right"></i>
            </div>
          </div>
        </div>

        {/* React Swiper Slider */}
        <Swiper
          className="quality-working-wrap"
          modules={[Navigation]}
          spaceBetween={24}
          speed={1000}
          loop={true}
          navigation={{
            nextEl: '.mcustom__next1',
            prevEl: '.mcustom__prev1',
          }}
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 10 },
            767: { slidesPerView: 2, spaceBetween: 14 },
            991: { slidesPerView: 3, spaceBetween: 14 },
            1200: { slidesPerView: 3, spaceBetween: 24 },
          }}
        >
          <SwiperSlide>
            <div className="quality-work-items cmn-shadow round8">
              <h3 className="white">
                <a href="service.html" className="white">
                  <span className="d-block white">Web</span>
                  Development
                </a>
              </h3>
              <ul className="label-exlist justify-content-center d-grid gap-xxl-3 gap-2">
                <li>
                  <a href="service.html" className="d-flex align-items-center pra-clr">+ React & Next.js</a>
                </li>
                <li>
                  <a href="service.html" className="d-flex align-items-center pra-clr">+ Node.js & Express.js</a>
                </li>
                <li>
                  <a href="service.html" className="d-flex align-items-center pra-clr">+ MongoDB & Database design</a>
                </li>
              </ul>
              <div className="pri-btn">
                <a href="service.html" className="d-flex align-items-center gap-2 pra-clr fw-500">
                  See Pricing
                  <span className="arrows">
                    <img src="/assets/img/blog/right-arrow.png" alt="img" />
                  </span>
                </a>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="quality-work-items cmn-shadow round8">
              <h3 className="white">
                <a href="service.html" className="white">
                  Full-Stack
                  <span className="d-block white">Applications</span>
                </a>
              </h3>
              <ul className="label-exlist justify-content-center d-grid gap-xxl-3 gap-2">
                <li>
                  <a href="service.html" className="d-flex align-items-center pra-clr">+ MERN Stack Development</a>
                </li>
                <li>
                  <a href="service.html" className="d-flex align-items-center pra-clr">+ Authentication & APIs</a>
                </li>
                <li>
                  <a href="service.html" className="d-flex align-items-center pra-clr">+ Scalable App Architecture</a>
                </li>
              </ul>
              <div className="pri-btn">
                <a href="service.html" className="d-flex align-items-center gap-2 pra-clr fw-500">
                  See Pricing
                  <span className="arrows">
                    <img src="/assets/img/blog/right-arrow.png" alt="img" />
                  </span>
                </a>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="quality-work-items cmn-shadow round8">
              <h3 className="white">
                <a href="service.html" className="white">
                  Performance &
                  <span className="d-block white">Optimization</span>
                </a>
              </h3>
              <ul className="label-exlist justify-content-center d-grid gap-xxl-3 gap-2">
                <li>
                  <a href="service.html" className="d-flex align-items-center pra-clr">+ Next.js Optimization</a>
                </li>
                <li>
                  <a href="service.html" className="d-flex align-items-center pra-clr">+ API Performance Tuning</a>
                </li>
                <li>
                  <a href="service.html" className="d-flex align-items-center pra-clr">+ Clean & Maintainable Code</a>
                </li>
              </ul>
              <div className="pri-btn">
                <a href="service.html" className="d-flex align-items-center gap-2 pra-clr fw-500">
                  See Pricing
                  <span className="arrows">
                    <img src="/assets/img/blog/right-arrow.png" alt="img" />
                  </span>
                </a>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="quality-work-items cmn-shadow round8">
              <h3 className="white">
                <a href="service.html" className="white">
                  <span className="d-block white">Web</span>
                  Development
                </a>
              </h3>
              <ul className="label-exlist justify-content-center d-grid gap-xxl-3 gap-2">
                <li>
                  <a href="service.html" className="d-flex align-items-center pra-clr">+ Wordpress</a>
                </li>
                <li>
                  <a href="service.html" className="d-flex align-items-center pra-clr">+ Brand</a>
                </li>
                <li>
                  <a href="service.html" className="d-flex align-items-center pra-clr">+ Laravel</a>
                </li>
              </ul>
              <div className="pri-btn">
                <a href="service.html" className="d-flex align-items-center gap-2 pra-clr fw-500">
                  See Pricing
                  <span className="arrows">
                    <img src="/assets/img/blog/right-arrow.png" alt="img" />
                  </span>
                </a>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>

        <div className="service-hoverbox d-flex justify-content-center">
          <a href="service.html" className="hover-circle cmborder wow fadeInUp" data-wow-duration="1.6s">
            <span className="box">
              <i className="bi bi-arrow-up-right"></i>
              <span className="textmore">Services All</span>
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}

export default Services
