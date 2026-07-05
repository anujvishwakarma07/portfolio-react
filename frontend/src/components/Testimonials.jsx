import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import { API_BASE } from '../config'

function Testimonials() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // No fake fallback — only show real approved reviews from the database
  const fallbackReviews = [];

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

  // Don't render the section at all if there are no real reviews
  if (!loading && reviewList.length === 0) return null;

  const isSingle = reviewList.length === 1;

  // For multi-slide: show 2 on large screens so each card is wider
  const getSlidesPerView = (count) => {
    if (count === 1) return 1;
    if (count === 2) return 2;
    return 2; // max 2 visible at a time → wider cards
  };

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

        {/* Single review: full width */}
        {isSingle ? (
          <div style={{ width: '100%' }}>
            <ReviewCard item={reviewList[0]} />
          </div>
        ) : (
          <Swiper
            key={reviewList.length}
            className="testimonial-wrapperv1"
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            centeredSlides={false}
            loop={reviewList.length >= 3}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,   // ← pause on hover
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
              320:  { slidesPerView: 1, spaceBetween: 12 },
              575:  { slidesPerView: 1, spaceBetween: 12 },
              768:  { slidesPerView: 1, spaceBetween: 16 },
              1024: { slidesPerView: 1, spaceBetween: 24 },
              1200: { slidesPerView: 1, spaceBetween: 28 },
            }}
          >
            {reviewList.map((item) => (
              <SwiperSlide key={item._id}>
                <ReviewCard item={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        {/* Navigation — only show when more than 1 review */}
        {!isSingle && (
          <div className="d-center">
            <div className="d-inline-flex justify-content-center text-center m-auto align-items-center gap-xxl-4 gap-3 pt-60">
              <div className="testi-prev" style={{ cursor: 'pointer' }}>
                <img src="/assets/img/blog/left-arrow.png" alt="Prev" />
              </div>
              <div className="swiper-pagination-cus pra-clr"></div>
              <div className="testi-next" style={{ cursor: 'pointer' }}>
                <img src="/assets/img/blog/right-arrow.png" alt="Next" />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

function ReviewCard({ item }) {
  return (
    <div
      className="testimonial-items-v1 cmn-shadow round8"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '32px 36px',
      }}
    >
      <div>
        <div className="testi-thumb d-flex align-items-center justify-content-between mb-3">
          <div className="thumb" style={{ width: '56px', height: '56px', borderRadius: '50%', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
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
        <span className="testi-title" style={{ fontSize: '13px' }}>{item.tag || 'Portfolio Review'}</span>
        <p className="pra-clr" style={{
          fontStyle: 'italic',
          marginTop: '12px',
          marginBottom: 0,
          fontSize: '15.5px',
          lineHeight: '1.75',
        }}>
          &ldquo;{item.message}&rdquo;
        </p>
      </div>

      <div
        className="d-flex flex-wrap align-items-center justify-content-between gap-2 mt-4"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '16px' }}
      >
        <div className="cont">
          <span className="fw-500 white d-block mb-1" style={{ fontSize: '16px' }}>{item.name}</span>
          <span className="pra-clr" style={{ fontSize: '13px' }}>{item.role}</span>
        </div>
        <div className="d-flex cmborder ratting-inner round100 align-items-center gap-1" style={{ padding: '5px 12px' }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <i key={i} className={`bi ${i < item.rating ? 'bi-star-fill' : 'bi-star'}`} style={{ color: i < item.rating ? '#f59e0b' : '#3f3f46', fontSize: '12px' }}></i>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Testimonials
