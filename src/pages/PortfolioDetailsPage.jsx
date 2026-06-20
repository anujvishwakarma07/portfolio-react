import React from 'react'
import { useParams } from 'react-router-dom'

// Centralized project data details
const projectsDetailList = [
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
    images: ['/assets/img/blog/havynlife.png']
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
    images: ['/assets/img/blog/tanviqgpt.png']
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
    images: ['/assets/img/blog/upnexa.png']
  }
]

function PortfolioDetailsPage() {
  const { id } = useParams()

  // Find the active project details, or fall back to the first one if not found
  const activeProject = projectsDetailList.find(p => p.id === id) || projectsDetailList[0]

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
            <h2 className="stitle fw-500 mt-3 mb-4" data-aos="fade-down" data-aos-duration="1500">
              {activeProject.title}
            </h2>
            <p className="pra-clr max-458">
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
              <div className="protfolio-details-wrap pe-xxl-4">
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
              <div className="project-detial-right mt-lg-0 mt-4">
                {activeProject.images.map((imgUrl, idx) => (
                  <div key={idx} className="thumbs w-100">
                    <img src={imgUrl} alt={`showcase-${idx}`} className="w-100" />
                  </div>
                ))}
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
            <div className="row g-4">
              {relatedProjects.map(project => (
                <div key={project.id} className="col-lg-4 col-md-6">
                  <div className="protfolio-porject-item d-center">
                    <img src={project.images[0]} alt={project.title} />
                    <div className="project-cont-inner">
                      <span className="title date-title text-end pt-3 pe-4 d-block">
                        {project.date.split(' ').pop()}
                      </span>
                      <div className="project-cont-box d-center w-100 h-100 position-relative">
                        <div className="boxes text-center">
                          <h4>
                            <a href={`/portfolio/${project.id}`} className="title">
                              <span className="d-block">{project.title}</span>
                              {project.subtitle}
                            </a>
                          </h4>
                          <span className="ui-badge">{project.badge}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default PortfolioDetailsPage
