import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'

// Centralized project data details
const projectsDetailList = [
  {
    id: 'vetocar',
    title: 'VETOCAR',
    subtitle: 'AI-powered auto contract auditor and negotiation assistant',
    date: '2026',
    client: 'Personal Project',
    service: 'Full-Stack AI Application',
    techStack: 'React.js · Node.js · Express.js · MongoDB · Gemini API · Razorpay',
    description: 'Developed VetoCar, an AI-powered auto contract auditor and negotiation assistant designed to protect car buyers and lessees from predatory dealership markups and hidden fees. Integrated Gemini 2.5 Flash API to analyze lease/loan documents, decode vehicle parameters, identify dealer red flags, and compute Cost Delta Analytics with a deal fairness score. Built a secure token credit gateway system, VIN decoding via NHTSA API, Razorpay payment gateway integration, and real-time conversation AI coach.',
    github: 'https://github.com/anujvishwakarma07/VetoCar',
    live: 'https://car-veto.vercel.app/',
    badge: 'AI / Fintech',
    images: [
      '/assets/img/project/VetoCar/vetocar_1.png',
      '/assets/img/project/VetoCar/vetocar_2.png',
      '/assets/img/project/VetoCar/vetocar_3.png',
      '/assets/img/project/VetoCar/vetocar_4.png'
    ]
  },
  {
    id: 'havynlife',
    title: 'HAVYNLIFE',
    subtitle: 'Airbnb-Inspired Platform',
    date: '2025',
    client: 'Personal Project',
    service: 'Full-Stack Web Application',
    techStack: 'Node.js · Express · MongoDB · EJS',
    description: 'Developed a Full-Stack Web Application inspired by Airbnb, implementing 10+ REST API endpoints with complete CRUD Operations for listings and reviews, enforcing ownership-based Authorization via middleware. Implemented dual-strategy Authentication using Passport.js (Google OAuth 2.0 and local strategies) with secure Session Management via Express Sessions. Integrated Cloudinary for image uploads (up to 5 per listing), Mapbox for geolocation mapping and MongoDB Atlas for cloud database management.',
    github: 'https://github.com/anujvishwakarma07/HavynLife',
    live: 'https://havynlife.onrender.com/',
    badge: 'Full Stack',
    images: [
      '/assets/img/project/Havynlife/havynlife_1.png',
      '/assets/img/project/Havynlife/havynlife_2.png',
      '/assets/img/project/Havynlife/havynlife_3.png',
      '/assets/img/project/Havynlife/havynlife_4.png'
    ]
  },
  {
    id: 'tanviqgpt',
    title: 'TANVIQGPT',
    subtitle: 'AI Chat Application',
    date: '2025',
    client: 'Personal Project',
    service: 'Full-Stack AI Application',
    techStack: 'React.js · Node.js · Express.js · MongoDB Atlas · OpenRouter API',
    description: 'Built a Full-Stack AI Application with AI/LLM API integration via OpenRouter API, delivering real-time conversational AI responses in a modern dark-mode UI. Designed a thread-based conversation schema in MongoDB with unique thread IDs, maintaining complete message history for multiple concurrent users with user and assistant roles. Developed 8+ REST APIs using Node.js and Express.js for CRUD operations on chat threads; deployed backend on Render and frontend on Vercel.',
    github: 'https://github.com/anujvishwakarma07/TanviqGpt',
    live: 'https://tanviq-gpt.vercel.app/',
    badge: 'AI / LLM',
    images: [
      '/assets/img/project/TanviqGpt/tanviqgpt_1.png',
      '/assets/img/project/TanviqGpt/tanviqgpt_2.png'
    ]
  },
  {
    id: 'upnexa',
    title: 'UPNEXA',
    subtitle: 'Startup Listing Platform',
    date: '2025',
    client: 'Personal Project',
    service: 'Modern Web Application with SSR/ISR/SSG',
    techStack: 'Next.js 15 · React 19 · Sanity CMS · Tailwind CSS',
    description: 'Built a modern startup listing platform using Next.js 15 App Router with SSR, ISR, and SSG for optimized SEO performance and 95+ Lighthouse score. Integrated Sanity CMS as headless CMS for real-time content management with custom GROQ queries for advanced filtering and search with strongly typed schemas. Implemented OAuth via NextAuth.js with GitHub provider, Zod schema validation, and Sentry for error tracking and performance monitoring, deployed on Vercel.',
    github: 'https://github.com/anujvishwakarma07/UpNexa',
    live: 'https://upnexa.vercel.app/',
    badge: 'Next.js',
    images: [
      '/assets/img/project/UpNexa/upnexa_1.png',
      '/assets/img/project/UpNexa/upnexa_2.png',
      '/assets/img/project/UpNexa/upnexa_3.png',
      '/assets/img/project/UpNexa/upnexa_4.png',
      '/assets/img/project/UpNexa/upnexa_5.png'
    ]
  }
]

function PortfolioDetailsPage() {
  const { id } = useParams()

  // Find the active project details, or fall back to the first one if not found
  const activeProject = projectsDetailList.find(p => p.id === id) || projectsDetailList[0]

  // Stateful gallery selection
  const [selectedImage, setSelectedImage] = useState(activeProject.images[0])

  // Reset selected image when project changes
  useEffect(() => {
    setSelectedImage(activeProject.images[0])
  }, [activeProject])

  const handlePrevImage = () => {
    const currentIndex = activeProject.images.indexOf(selectedImage || activeProject.images[0]);
    if (currentIndex === -1) return;
    const prevIndex = (currentIndex - 1 + activeProject.images.length) % activeProject.images.length;
    setSelectedImage(activeProject.images[prevIndex]);
  };

  const handleNextImage = () => {
    const currentIndex = activeProject.images.indexOf(selectedImage || activeProject.images[0]);
    if (currentIndex === -1) return;
    const nextIndex = (currentIndex + 1) % activeProject.images.length;
    setSelectedImage(activeProject.images[nextIndex]);
  };

  useEffect(() => {
    document.title = `${activeProject.title} | Portfolio – Anuj Vishwakarma`
  }, [activeProject.title])

  // Filter out the active project to list other projects as related projects
  const relatedProjects = projectsDetailList.filter(p => p.id !== activeProject.id).slice(0, 3)

  return (
    <>
      {/* 1. Header Banner */}
      <section className="breadcrumnd-section" id="bn">
        <div className="container pt-100 pb-100">
          <div className="section-title text-center">
            <a href="/portfolio" className="section-sub" data-aos="fade-down" data-aos-duration="1000">
              Back To Portfolio
            </a>
            <h2 className="stitle fw-500 mt-3 mb-2" data-aos="fade-down" data-aos-duration="1500">
              {activeProject.title}
            </h2>
            {activeProject.subtitle && (
              <span className="d-block white fz-20 fw-400 mb-3" data-aos="fade-up" data-aos-duration="1200" style={{ color: '#e5c07b' }}>
                {activeProject.subtitle}
              </span>
            )}
            <p className="pra-clr max-458 mx-auto">
              {activeProject.service}
            </p>
          </div>
        </div>
      </section>

      {/* 2. Project Details grid */}
      <section className="project-section pb-120">
        <div className="container">
          <div className="row g-4">
            {/* Left Column: Specs */}
            <div className="col-lg-4">
              <div className="protfolio-details-wrap pe-xxl-4 sticky-details-wrap">
                <h4 className="white mb-30">Project Details</h4>
                <div className="des-dated-area">
                  <div className="date-border"></div>
                  <div className="dates-item">
                    <span className="date-text">Year:</span>
                    <span className="pra-clr fw-400">{activeProject.date}</span>
                  </div>
                  <div className="date-border"></div>
                  <div className="dates-item">
                    <span className="date-text">Type:</span>
                    <span className="pra-clr fw-400">{activeProject.client}</span>
                  </div>
                  <div className="date-border"></div>
                  <div className="dates-item">
                    <span className="date-text">Service:</span>
                    <p className="pra-clr fw-400">{activeProject.service}</p>
                  </div>
                  <div className="date-border"></div>
                  <div className="dates-item">
                    <span className="date-text">Tech Stack:</span>
                    <p className="pra-clr fw-400">{activeProject.techStack}</p>
                  </div>
                  <div className="date-border"></div>
                  <div className="dates-item d-grid gap-lg-4 gap-3">
                    <span className="date-text">Description:</span>
                    <p className="pra-clr fw-400 pra-one">{activeProject.description}</p>
                    <div className="date-border"></div>
                    <div className="visit-btn mt-xxl-5 mt-4 d-flex gap-3 flex-wrap">
                      <a 
                        href={activeProject.github} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="cmn-shadow round100 py-xxl-3 py-3 px-xxl-5 px-4 white fz-16"
                      >
                        <i className="bi bi-github me-2"></i>GitHub
                      </a>
                      <a 
                        href={activeProject.live} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="cmn-shadow round100 py-xxl-3 py-3 px-xxl-5 px-4 white fz-16"
                      >
                        <i className="bi bi-box-arrow-up-right me-2"></i>Live Demo
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Project Showcase Images */}
            <div className="col-lg-8">
              <div className="project-gallery-container mt-lg-0 mt-4">
                <div className="project-featured-image-wrapper">
                  {activeProject.images && activeProject.images.length > 1 && (
                    <>
                      <button 
                        className="gallery-nav-btn prev-btn" 
                        onClick={handlePrevImage} 
                        aria-label="Previous image"
                      >
                        <i className="bi bi-chevron-left"></i>
                      </button>
                      <button 
                        className="gallery-nav-btn next-btn" 
                        onClick={handleNextImage} 
                        aria-label="Next image"
                      >
                        <i className="bi bi-chevron-right"></i>
                      </button>
                    </>
                  )}
                  <img 
                    src={selectedImage || activeProject.images[0]} 
                    alt={`${activeProject.title} featured`} 
                    className="project-featured-image" 
                  />
                </div>
                {activeProject.images && activeProject.images.length > 1 && (
                  <div className="project-thumbnails-grid">
                    {activeProject.images.map((imgUrl, idx) => (
                      <div 
                        key={idx} 
                        className={`project-thumbnail-item ${selectedImage === imgUrl ? 'active' : ''}`}
                        onClick={() => setSelectedImage(imgUrl)}
                      >
                        <img src={imgUrl} alt={`thumbnail-${idx}`} className="project-thumbnail-img" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Related Projects section */}
      <section className="single-project pb-100">
        <div className="container">
          <h3 className="single-head white mb-4">Related Projects</h3>
          <div className="single-project-wrap">
            <Swiper
              modules={[Autoplay]}
              spaceBetween={24}
              loop={relatedProjects.length > 1}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              breakpoints={{
                320: { slidesPerView: 1, spaceBetween: 16 },
                768: { slidesPerView: Math.min(relatedProjects.length, 2), spaceBetween: 20 },
                1024: { slidesPerView: Math.min(relatedProjects.length, 3), spaceBetween: 24 }
              }}
              className="related-projects-swiper"
            >
              {relatedProjects.map(project => (
                <SwiperSlide key={project.id}>
                  <div className="premium-project-card">
                    <div className="project-img-container">
                      <img 
                        src={project.images[0] || '/assets/img/project/Havynlife/havynlife_1.png'} 
                        alt={project.title} 
                        className="project-card-img" 
                      />
                      {project.badge && (
                        <span className="project-glass-badge">
                          {project.badge}
                        </span>
                      )}
                    </div>
                    <div className="project-card-content">
                      <h4 className="project-card-title">
                        <a href={`/Portfolio/${project.id}`}>{project.title}</a>
                      </h4>
                      <p className="project-card-tech">{project.techStack || project.subtitle}</p>
                      <div className="project-card-actions">
                        {project.github && (
                          <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-action-btn">
                            <i className="bi bi-github"></i> GitHub
                          </a>
                        )}
                        {project.live && (
                          <a href={project.live} target="_blank" rel="noopener noreferrer" className="project-action-btn btn-live">
                            <i className="bi bi-box-arrow-up-right"></i> Live
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>
    </>
  )
}

export default PortfolioDetailsPage
