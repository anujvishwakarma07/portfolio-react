import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

function NotFoundPage() {
  useEffect(() => {
    document.title = '404 – Page Not Found | Anuj Vishwakarma'
  }, [])

  return (
    <section className="breadcrumnd-section" id="bn" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
      <div className="container pt-100 pb-100">
        <div className="section-title text-center">
          <h1 className="stitle fw-500" style={{ fontSize: '6rem', lineHeight: 1 }} data-aos="fade-down" data-aos-duration="1000">
            404
          </h1>
          <h2 className="stitle fw-500 mt-3" data-aos="fade-down" data-aos-duration="1500">
            Page Not Found
          </h2>
          <p className="pra-clr mt-4 mb-5" data-aos="fade-up" data-aos-duration="1500">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link
            to="/"
            className="cmn-btn"
            data-aos="fade-up"
            data-aos-duration="1800"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  )
}

export default NotFoundPage
