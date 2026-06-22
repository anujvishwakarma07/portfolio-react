import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import { API_BASE } from '../config'

function Testimonials() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fallbackReviews = [
    {
      _id: 'fallback_1',
      name: 'Thomas Leio',
      role: 'UI/UX Designer',
      message: 'Nam libero cumque nihil impedit quo minus id quod maxime facere omnis voluptas assumenda an repellendus temporibus autem',
      rating: 5,
      tag: 'Design Quality',
      image: '/assets/img/testimonial/client1.png'
    },
    {
      _id: 'fallback_2',
      name: 'Nicolas Jon',
      role: 'Web Designer',
      message: 'Nam libero cumque nihil impedit quo minus id quod maxime facere omnis voluptas assumenda an repellendus temporibus autem',
      rating: 5,
      tag: 'Clean Code',
      image: '/assets/img/testimonial/client2.png'
    },
    {
      _id: 'fallback_3',
      name: 'Alica Walker',
      role: '3D Artist',
      message: 'Nam libero cumque nihil impedit quo minus id quod maxime facere omnis voluptas assumenda an repellendus temporibus autem',
      rating: 5,
      tag: 'Instant Support',
      image: '/assets/img/testimonial/client3.png'
    }
  ];

  useEffect(() => {
    const fetchApprovedReviews = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/feedback/approved`);
        if (response.ok) {
          const data = await response.json();
          setReviews(data);
        }
      } catch (err) {
        console.warn('Failed to load approved reviews:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchApprovedReviews();
  }, []);

  const reviewList = reviews.length > 0 ? reviews : fallbackReviews;

  return (
    <section className="testimonial-section-v1 check-box-style mb-common pt-100 pb-100" id="testi">
      <div className="container">
        <div className="section-title text-center mb-60">
          <span className="section-sub" data-aos="fade-down" data-aos-duration="1000">
            Reviews
          </span>
          <h2 className="stitle fw-500 mt-3" data-aos="fade-down" data-aos-duration="1500">
            What Visitors Say
            <span className="text-storkes d-block">
              About My Portfolio.
            </span>
          </h2>
        </div>

        <Swiper
          key={reviewList.length}
          className="testimonial-wrapperv1"
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={24}
          loop={reviewList.length >= 3} // Disable loop if we don't have enough slides
          autoplay={{
            delay: 3500,
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
            1600: { slidesPerView: Math.min(3, reviewList.length) },
          }}
        >
          {reviewList.map((item) => (
            <SwiperSlide key={item._id}>
              <div className="testimonial-items-v1 cmn-shadow round8" style={{ minHeight: '340px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div className="testi-thumb d-flex align-items-center justify-content-between mb-3">
                    <div className="thumb" style={{ width: '60px', height: '60px', borderRadius: '50%', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
                      <img 
                        src={item.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(item.name)}&background=27272a&color=fff&bold=true`} 
                        alt={item.name} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                    <div className="quote-arrow">
                      <img src="/assets/img/testimonial/quote.png" alt="quote" />
                    </div>
                  </div>
                  <span className="testi-title">{item.tag || 'Portfolio Review'}</span>
                  <p className="pra-clr fz-16" style={{ fontStyle: 'italic', marginTop: '10px', display: '-webkit-box', WebkitLineClamp: '4', WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    "{item.message}"
                  </p>
                </div>
                
                <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '15px' }}>
                  <div className="cont">
                    <span className="fw-500 fz-18 white d-block mb-1">{item.name}</span>
                    <span className="pra-clr" style={{ fontSize: '13px' }}>{item.role}</span>
                  </div>
                  <div className="d-flex cmborder ratting-inner round100 align-items-center gap-1" style={{ padding: '6px 12px' }}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <i key={i} className={`bi ${i < item.rating ? 'bi-star-fill' : 'bi-star'}`} style={{ color: i < item.rating ? '#f59e0b' : '#3f3f46', fontSize: '12px' }}></i>
                    ))}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
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
