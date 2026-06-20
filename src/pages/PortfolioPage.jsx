import React, { useState, useEffect } from 'react'
import Sponsors from '../components/Sponsors'

function PortfolioPage() {
  const [activeTab, setActiveTab] = useState('Show All')

  useEffect(() => {
    document.title = 'Portfolio | Anuj Vishwakarma – Full Stack Developer'
  }, [])
  // List of all projects (copied directly from protfolio.html)
  const projects = [
    {
      id: 1,
      title: 'Growthary',
      subtitle: 'Unified Ecosystem',
      category: 'Design',
      image: '/assets/img/blog/growthary.jpg',
      year: '@2026',
      badge: 'SaaS Platform'
    },
    {
      id: 2,
      title: 'UpNexa',
      subtitle: 'SaaS Platform',
      category: 'Design',
      image: '/assets/img/blog/upnexa.jpg',
      year: '@2025',
      badge: 'Web App'
    },
    {
      id: 3,
      title: 'KaryaNexus',
      subtitle: 'Digital Solutions',
      category: 'Design',
      image: '/assets/img/blog/karyanexus.jpg',
      year: '@2026',
      badge: 'Web App'
    },
    {
      id: 4,
      title: 'Brand',
      subtitle: 'Revitalization.',
      category: 'Media',
      image: '/assets/img/project/pro-bg1.png',
      year: '@2024',
      badge: 'Color Design'
    },
    {
      id: 5,
      title: 'Application',
      subtitle: 'Design',
      category: 'Media',
      image: '/assets/img/project/pro-bg2.png',
      year: '@2024',
      badge: 'Wordpress'
    },
    {
      id: 6,
      title: 'Social',
      subtitle: 'Masterpieces',
      category: 'Trends',
      image: '/assets/img/project/pro4.png',
      year: '@2024',
      badge: 'Social Marketer'
    },
    {
      id: 7,
      title: 'Data',
      subtitle: 'Analytics',
      category: 'Trends',
      image: '/assets/img/project/pro5.png',
      year: '@2024',
      badge: 'Ai Design'
    },
    {
      id: 8,
      title: 'Machine',
      subtitle: 'Learning',
      category: 'Trends',
      image: '/assets/img/project/pro6.png',
      year: '@2024',
      badge: 'AI Development'
    }
  ]

  // Filter projects dynamically based on the selected tab
  const filteredProjects = activeTab === 'Show All'
    ? projects
    : projects.filter(project => project.category === activeTab)

  return (
    <>
      {/* 1. Header Banner */}
      <section className="breadcrumnd-section" id="bn">
        <div className="container pt-100 pb-100">
          <div className="section-title text-center">
            <span className="section-sub" data-aos="fade-down" data-aos-duration="1000">
              My Protfolio
            </span>
            <h2 className="stitle fw-500 mt-3" data-aos="fade-down" data-aos-duration="1500">
              Helping digital brands scale
              <span className="text-storkes d-block">with design.</span>
            </h2>
          </div>
        </div>
      </section>

      {/* 2. Project Grid Section */}
      <section className="project-section pb-120">
        <div className="container">
          <div className="singletab project-proft-tab">
            <div className="project-head">
              <span className="white">(2020-2024)</span>
              
              {/* Tab Filters */}
              <ul className="tablinks" data-aos="fade-down" data-aos-duration="2000">
                {['Show All', 'Design', 'Media', 'Trends'].map(tab => (
                  <li 
                    key={tab} 
                    className={`nav-links ${activeTab === tab ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    <button className="tablink">{tab}</button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Dynamic Project Cards Grid */}
            <div className="tabcontents position-relative">
              <div className="tabitem active">
                <div className="row g-4">
                  {filteredProjects.map(project => (
                    <div 
                      key={project.id} 
                      className={project.id === 4 || project.id === 5 ? 'col-lg-6 col-md-6' : 'col-lg-4 col-md-6'}
                    >
                      <div className="protfolio-porject-item d-center">
                        <img src={project.image} alt={project.title} />
                        <div className="project-cont-inner">
                          <span className="title date-title text-end pt-3 pe-4 d-block">
                            {project.year}
                          </span>
                          <div className="project-cont-box d-center w-100 h-100 position-relative">
                            <div className="boxes text-center">
                              <h4>
                                <a href="protfolio-details.html" className="title">
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
          </div>
        </div>
      </section>

      {/* 3. Reuse the Technologies slider */}
      <Sponsors />
    </>
  )
}

export default PortfolioPage
