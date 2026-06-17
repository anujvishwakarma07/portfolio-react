import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'

function Testimonials() {
  return (
    <section className="testimonial-section-v1 check-box-style mb-common pt-100 pb-100" id="testi">
      <div className="container">
        <div className="section-title text-center mb-60">
          <span className="section-sub" data-aos="fade-down" data-aos-duration="1000">
            Latest News
          </span>
          <h2 className="stitle fw-500 mt-3" data-aos="fade-down" data-aos-duration="1500">
            Resonance template is trusted
            <span className="text-storkes d-block">
              by 10,00+ customers.
            </span>
          </h2>
        </div>

        <Swiper
          className="testimonial-wrapperv1"
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={24}
          loop={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          navigation={{
            nextEl: '.testi-next',
            prevEl: '.testi-prev',
          }}
          pagination={{
            el: '.swiper-pagination-cus',
            type: 'fraction',
          }}
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 10 },
            575: { slidesPerView: 1, spaceBetween: 10 },
            991: { slidesPerView: 1, spaceBetween: 10 },
            1200: { slidesPerView: 1 },
            1600: { slidesPerView: 3 },
          }}
        >
          <SwiperSlide>
            <div className="testimonial-items-v1 cmn-shadow round8">
              <div className="testi-thumb d-flex align-items-center justify-content-between">
                <div className="thumb">
                  <img src="/assets/img/testimonial/client1.png" alt="img" />
                </div>
                <div className="quote-arrow">
                  <img src="/assets/img/testimonial/quote.png" alt="img" />
                </div>
              </div>
              <span className="testi-title">Design Quality</span>
              <p className="pra-clr fz-16">
                Nam libero cumque nihil impedit quo minus id quod maxime facere omnis voluptas assumenda an
                repellendus temporibus autem
              </p>
              <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                <div className="cont">
                  <span className="fw-500 fz-18 white d-block mb-1">Thomas Leio</span>
                  <span className="pra-clr">UI/UX Designer</span>
                </div>
                <div className="d-flex cmborder ratting-inner round100 align-items-center gap-1">
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="testimonial-items-v1 cmn-shadow round8">
              <div className="testi-thumb d-flex align-items-center justify-content-between">
                <div className="thumb">
                  <img src="/assets/img/testimonial/client2.png" alt="img" />
                </div>
                <div className="quote-arrow">
                  <img src="/assets/img/testimonial/quote.png" alt="img" />
                </div>
              </div>
              <span className="testi-title">Clean Code</span>
              <p className="pra-clr fz-16">
                Nam libero cumque nihil impedit quo minus id quod maxime facere omnis voluptas assumenda an
                repellendus temporibus autem
              </p>
              <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                <div className="cont">
                  <span className="fw-500 fz-18 white d-block mb-1">Nicolas Jon</span>
                  <span className="pra-clr">Web Designer</span>
                </div>
                <div className="d-flex cmborder ratting-inner round100 align-items-center gap-1">
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="testimonial-items-v1 cmn-shadow round8">
              <div className="testi-thumb d-flex align-items-center justify-content-between">
                <div className="thumb">
                  <img src="/assets/img/testimonial/client3.png" alt="img" />
                </div>
                <div className="quote-arrow">
                  <img src="/assets/img/testimonial/quote.png" alt="img" />
                </div>
              </div>
              <span className="testi-title">Instant Support</span>
              <p className="pra-clr fz-16">
                Nam libero cumque nihil impedit quo minus id quod maxime facere omnis voluptas assumenda an
                repellendus temporibus autem
              </p>
              <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                <div className="cont">
                  <span className="fw-500 fz-18 white d-block mb-1">Alica Walker</span>
                  <span className="pra-clr">3D Artiest</span>
                </div>
                <div className="d-flex cmborder ratting-inner round100 align-items-center gap-1">
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="testimonial-items-v1 cmn-shadow round8">
              <div className="testi-thumb d-flex align-items-center justify-content-between">
                <div className="thumb">
                  <img src="/assets/img/testimonial/client4.jpg" alt="img" />
                </div>
                <div className="quote-arrow">
                  <img src="/assets/img/testimonial/quote.png" alt="img" />
                </div>
              </div>
              <span className="testi-title">Design Quality</span>
              <p className="pra-clr fz-16">
                Nam libero cumque nihil impedit quo minus id quod maxime facere omnis voluptas assumenda an
                repellendus temporibus autem
              </p>
              <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                <div className="cont">
                  <span className="fw-500 fz-18 white d-block mb-1">Thomas Leio</span>
                  <span className="pra-clr">UI/UX Designer</span>
                </div>
                <div className="d-flex cmborder ratting-inner round100 align-items-center gap-1">
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>

        {/* Custom Navigation / Pagination controls at bottom center */}
        <div className="d-center">
          <div className="d-inline-flex justify-content-center text-center m-auto align-items-center gap-xxl-4 gap-3 pt-60">
            <div className="testi-prev" style={{ cursor: 'pointer' }}>
              <img src="/assets/img/blog/left-arrow.png" alt="Prev" />
            </div>
            
            {/* The fraction indicator gets rendered here */}
            <div className="swiper-pagination-cus pra-clr"></div>
            
            <div className="testi-next" style={{ cursor: 'pointer' }}>
              <img src="/assets/img/blog/right-arrow.png" alt="Next" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
