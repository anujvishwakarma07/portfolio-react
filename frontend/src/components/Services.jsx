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
              Technical Expertise
            </span>
            <h2 className="stitle fw-500 mt-3" data-aos="fade-down" data-aos-duration="1500">
              My,
              <span className="text-storkes d-block">
                Core Expertise
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
          {/* Card 1 */}
          <SwiperSlide>
            <div className="quality-work-items cmn-shadow round8">
              <h3 className="white">
                <a href="#conts" className="white">
                  MERN Stack
                  <span className="d-block white">Development</span>
                </a>
              </h3>
              <ul className="label-exlist d-flex flex-column gap-3 text-start align-items-start">
                <li className="w-100">
                  <a href="#conts" className="d-flex align-items-start gap-2 pra-clr">
                    <span className="card-bullet-dot">•</span>
                    <span>React.js & Next.js for modern interfaces</span>
                  </a>
                </li>
                <li className="w-100">
                  <a href="#conts" className="d-flex align-items-start gap-2 pra-clr">
                    <span className="card-bullet-dot">•</span>
                    <span>Node.js, Express.js & REST APIs</span>
                  </a>
                </li>
                <li className="w-100">
                  <a href="#conts" className="d-flex align-items-start gap-2 pra-clr">
                    <span className="card-bullet-dot">•</span>
                    <span>MongoDB & Mongoose for database management</span>
                  </a>
                </li>
                <li className="w-100">
                  <a href="#conts" className="d-flex align-items-start gap-2 pra-clr">
                    <span className="card-bullet-dot">•</span>
                    <span>End-to-end full-stack application development</span>
                  </a>
                </li>
              </ul>
              <div className="pri-btn">
                <a href="#conts" className="d-flex align-items-center gap-2 pra-clr fw-500">
                  Get In Touch
                  <span className="arrows">
                    <img src="/assets/img/blog/right-arrow.png" alt="img" />
                  </span>
                </a>
              </div>
            </div>
          </SwiperSlide>

          {/* Card 2 */}
          <SwiperSlide>
            <div className="quality-work-items cmn-shadow round8">
              <h3 className="white">
                <a href="#conts" className="white">
                  LLM & AI
                  <span className="d-block white">Integration</span>
                </a>
              </h3>
              <ul className="label-exlist d-flex flex-column gap-3 text-start align-items-start">
                <li className="w-100">
                  <a href="#conts" className="d-flex align-items-start gap-2 pra-clr">
                    <span className="card-bullet-dot">•</span>
                    <span>Google Gemini (LLM) integration for intelligent features</span>
                  </a>
                </li>
                <li className="w-100">
                  <a href="#conts" className="d-flex align-items-start gap-2 pra-clr">
                    <span className="card-bullet-dot">•</span>
                    <span>PDF parsing and structured data extraction</span>
                  </a>
                </li>
                <li className="w-100">
                  <a href="#conts" className="d-flex align-items-start gap-2 pra-clr">
                    <span className="card-bullet-dot">•</span>
                    <span>AI-powered automation and insights</span>
                  </a>
                </li>
                <li className="w-100">
                  <a href="#conts" className="d-flex align-items-start gap-2 pra-clr">
                    <span className="card-bullet-dot">•</span>
                    <span>Smart feature implementation with fallback systems</span>
                  </a>
                </li>
              </ul>
              <div className="pri-btn">
                <a href="#conts" className="d-flex align-items-center gap-2 pra-clr fw-500">
                  Get In Touch
                  <span className="arrows">
                    <img src="/assets/img/blog/right-arrow.png" alt="img" />
                  </span>
                </a>
              </div>
            </div>
          </SwiperSlide>

          {/* Card 3 */}
          <SwiperSlide>
            <div className="quality-work-items cmn-shadow round8">
              <h3 className="white">
                <a href="#conts" className="white">
                  Production-Grade
                  <span className="d-block white">Development</span>
                </a>
              </h3>
              <ul className="label-exlist d-flex flex-column gap-3 text-start align-items-start">
                <li className="w-100">
                  <a href="#conts" className="d-flex align-items-start gap-2 pra-clr">
                    <span className="card-bullet-dot">•</span>
                    <span>Secure authentication using JWT & OAuth</span>
                  </a>
                </li>
                <li className="w-100">
                  <a href="#conts" className="d-flex align-items-start gap-2 pra-clr">
                    <span className="card-bullet-dot">•</span>
                    <span>Payment integration (Razorpay)</span>
                  </a>
                </li>
                <li className="w-100">
                  <a href="#conts" className="d-flex align-items-start gap-2 pra-clr">
                    <span className="card-bullet-dot">•</span>
                    <span>Scalable architecture & performance optimization</span>
                  </a>
                </li>
                <li className="w-100">
                  <a href="#conts" className="d-flex align-items-start gap-2 pra-clr">
                    <span className="card-bullet-dot">•</span>
                    <span>Deployment and maintenance of live applications</span>
                  </a>
                </li>
              </ul>
              <div className="pri-btn">
                <a href="#conts" className="d-flex align-items-center gap-2 pra-clr fw-500">
                  Get In Touch
                  <span className="arrows">
                    <img src="/assets/img/blog/right-arrow.png" alt="img" />
                  </span>
                </a>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>

        <div className="service-hoverbox d-flex justify-content-center">
          <a href="#ports" className="hover-circle cmborder wow fadeInUp" data-wow-duration="1.6s">
            <span className="box">
              <i className="bi bi-arrow-up-right"></i>
              <span className="textmore">My Works</span>
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}

export default Services
