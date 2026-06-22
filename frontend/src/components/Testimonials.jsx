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
      message: 'The portfolio design is clean, modern, and highly responsive. Every interaction feels intentional and the overall experience is top-notch.',
      rating: 5,
      tag: 'Design Quality',
      image: '/assets/img/testimonial/client1.png'
    },
    {
      _id: 'fallback_2',
      name: 'Nicolas Jon',
      role: 'Web Designer',
      message: 'Impressive code quality and architecture. The real-time analytics and admin panel show a level of depth rarely seen in personal portfolios.',
      rating: 5,
      tag: 'Clean Code',
      image: '/assets/img/testimonial/client2.png'
    },
    {
      _id: 'fallback_3',
      name: 'Alica Walker',
      role: '3D Artist',
      message: 'Fast, fluid, and beautifully crafted. The attention to micro-animations and performance optimization sets this portfolio apart from the rest.',
      rating: 5,
      tag: 'Performance',
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

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const tagColors = {
    'Design Quality':   { bg: 'rgba(139, 92, 246, 0.12)', color: '#a78bfa', border: 'rgba(139, 92, 246, 0.25)' },
    'Clean Code':       { bg: 'rgba(16, 185, 129, 0.12)', color: '#34d399', border: 'rgba(16, 185, 129, 0.25)' },
    'Performance':      { bg: 'rgba(59, 130, 246, 0.12)',  color: '#60a5fa', border: 'rgba(59, 130, 246, 0.25)' },
    'Portfolio Review': { bg: 'rgba(245, 158, 11, 0.12)', color: '#fbbf24', border: 'rgba(245, 158, 11, 0.25)' },
  };

  const getTagStyle = (tag) =>
    tagColors[tag] || { bg: 'rgba(255,255,255,0.06)', color: '#a1a1aa', border: 'rgba(255,255,255,0.1)' };

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
          loop={reviewList.length >= 3}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          navigation={{ nextEl: '.testi-next', prevEl: '.testi-prev' }}
          pagination={{ el: '.swiper-pagination-cus', type: 'fraction' }}
          breakpoints={{
            320:  { slidesPerView: 1, spaceBetween: 16 },
            768:  { slidesPerView: 1, spaceBetween: 20 },
            1200: { slidesPerView: 2, spaceBetween: 24 },
            1600: { slidesPerView: Math.min(3, reviewList.length), spaceBetween: 24 },
          }}
        >
          {reviewList.map((item) => {
            const tagStyle = getTagStyle(item.tag);
            return (
              <SwiperSlide key={item._id}>
                <div className="testi-card-new">

                  {/* Top: big quote + colored tag */}
                  <div className="testi-card-top">
                    <div className="testi-big-quote">"</div>
                    <span className="testi-tag-badge" style={{
                      background: tagStyle.bg,
                      color: tagStyle.color,
                      border: `1px solid ${tagStyle.border}`
                    }}>
                      {item.tag || 'Portfolio Review'}
                    </span>
                  </div>

                  {/* Review text */}
                  <p className="testi-message">
                    {item.message}
                  </p>

                  {/* Footer: avatar + name + stars */}
                  <div className="testi-card-footer">
                    <div className="testi-author-row">
                      <div className="testi-avatar">
                        {item.image && !item.image.includes('ui-avatars') ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            onError={(e) => { e.target.style.display = 'none'; }}
                          />
                        ) : null}
                        <span className="testi-initials">{getInitials(item.name)}</span>
                      </div>
                      <div className="testi-author-info">
                        <span className="testi-name">{item.name}</span>
                        <span className="testi-role">{item.role}</span>
                      </div>
                    </div>
                    <div className="testi-stars">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <i
                          key={i}
                          className={`bi ${i < item.rating ? 'bi-star-fill' : 'bi-star'}`}
                          style={{ color: i < item.rating ? '#f59e0b' : '#3f3f46', fontSize: '13px' }}
                        ></i>
                      ))}
                    </div>
                  </div>

                  {/* Left accent bar — colored per tag */}
                  <div className="testi-accent-bar" style={{ background: tagStyle.color }}></div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>

        {/* Navigation */}
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
      </div>

      <style>{`
        .testi-card-new {
          position: relative;
          background: rgba(15, 15, 18, 0.9);
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 16px;
          padding: 28px 28px 24px 40px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          min-height: 240px;
          overflow: hidden;
          transition: border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
        }
        .testi-card-new:hover {
          border-color: rgba(255, 255, 255, 0.13);
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }
        .testi-accent-bar {
          position: absolute;
          left: 0;
          top: 18%;
          bottom: 18%;
          width: 3px;
          border-radius: 0 4px 4px 0;
          opacity: 0.75;
        }
        .testi-card-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
        }
        .testi-big-quote {
          font-size: 80px;
          line-height: 0.5;
          font-family: Georgia, serif;
          color: rgba(255, 255, 255, 0.05);
          font-weight: 900;
          margin-top: 16px;
          user-select: none;
          flex-shrink: 0;
        }
        .testi-tag-badge {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          padding: 5px 12px;
          border-radius: 20px;
          white-space: nowrap;
          margin-top: 4px;
        }
        .testi-message {
          font-size: 14.5px;
          line-height: 1.75;
          color: #b4b4be;
          font-style: italic;
          margin: 0;
          flex: 1;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .testi-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 10px;
          padding-top: 14px;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          margin-top: auto;
        }
        .testi-author-row {
          display: flex;
          align-items: center;
          gap: 11px;
        }
        .testi-avatar {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.06);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          position: relative;
        }
        .testi-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          position: absolute;
          top: 0; left: 0;
        }
        .testi-initials {
          font-size: 13px;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.45);
          letter-spacing: 0.5px;
          z-index: 1;
        }
        .testi-author-info {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }
        .testi-name {
          font-size: 14px;
          font-weight: 600;
          color: #ffffff;
          line-height: 1;
        }
        .testi-role {
          font-size: 11.5px;
          color: #71717a;
        }
        .testi-stars {
          display: flex;
          gap: 3px;
          align-items: center;
        }
      `}</style>
    </section>
  )
}

export default Testimonials
