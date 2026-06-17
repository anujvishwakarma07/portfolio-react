import React from 'react'
import { useParams } from 'react-router-dom'

// Centralized project data details
const projectsDetailList = [
  {
    id: '1',
    title: 'Growthary',
    subtitle: 'Unified Ecosystem',
    date: 'March 25th, 2026',
    client: 'Growthary Team',
    service: 'SaaS Platform, Branding, UI/UX Design',
    description: 'Growthary is a unified ecosystem that helps SaaS startups track, manage, and scale their services. Developed with React, Node, and MongoDB, it features real-time data pipelines and rich user analytics.',
    link: 'https://github.com/anujvishwakarma07',
    badge: 'SaaS Platform',
    images: ['/assets/img/project/pd1.png', '/assets/img/project/pd2.png']
  },
  {
    id: '2',
    title: 'UpNexa',
    subtitle: 'SaaS Platform',
    date: 'September 12th, 2025',
    client: 'UpNexa Corp',
    service: 'Web App, UI/UX Design, Front-end',
    description: 'UpNexa is a cloud-based dashboard facilitating seamless financial planning and metric tracking for digital businesses. Integrated with automated report generation and invoice processing.',
    link: 'https://github.com/anujvishwakarma07',
    badge: 'Web App',
    images: ['/assets/img/project/pd3.png', '/assets/img/project/pd4.png']
  },
  {
    id: '3',
    title: 'KaryaNexus',
    subtitle: 'Digital Solutions',
    date: 'January 10th, 2026',
    client: 'KaryaNexus LLC',
    service: 'React Development, Backend APIs',
    description: 'KaryaNexus bridges productivity management with AI assistant agents. Designed to automate task routing, team scheduling, and document synchronization across workspaces.',
    link: 'https://github.com/anujvishwakarma07',
    badge: 'Web App',
    images: ['/assets/img/project/pd1.png', '/assets/img/project/pd4.png']
  },
  {
    id: '4',
    title: 'Brand Revitalization',
    subtitle: 'Color Design',
    date: 'July 15th, 2024',
    client: 'Creative Brand Co.',
    service: 'Color Palette Design, Style Guide Development',
    description: 'A complete overhaul of corporate style guides, implementing custom UI color tokens and interactive style frameworks to drive brand consistency.',
    link: 'https://github.com/anujvishwakarma07',
    badge: 'Color Design',
    images: ['/assets/img/project/pd2.png', '/assets/img/project/pd3.png']
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
                    <span className="date-text">Date:</span>
                    <span className="pra-clr fw-400">{activeProject.date}</span>
                  </div>
                  <div className="date-border"></div>
                  <div className="dates-item">
                    <span className="date-text">Client:</span>
                    <span className="pra-clr fw-400">{activeProject.client}</span>
                  </div>
                  <div className="date-border"></div>
                  <div className="dates-item">
                    <span className="date-text">Service:</span>
                    <p className="pra-clr fw-400">{activeProject.service}</p>
                  </div>
                  <div className="date-border"></div>
                  <div className="dates-item d-grid gap-lg-4 gap-3">
                    <span className="date-text">Description:</span>
                    <p className="pra-clr fw-400 pra-one">{activeProject.description}</p>
                    <div className="date-border"></div>
                    <div className="visit-btn mt-xxl-5 mt-4">
                      <a 
                        href={activeProject.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="cmn-shadow round100 py-xxl-3 py-3 px-xxl-5 px-4 white fz-16"
                      >
                        Visit Link
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
