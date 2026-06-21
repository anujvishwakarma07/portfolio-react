import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Sponsors from '../components/Sponsors'

function PortfolioPage() {
  const [activeTab, setActiveTab] = useState('Show All')
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  const fallbackProjects = [
    {
      _id: 'havynlife',
      title: 'HAVYNLIFE',
      subtitle: 'Airbnb-Inspired Platform',
      category: 'Full Stack',
      image: '/assets/img/blog/havynlife.png',
      year: '@2025',
      badge: 'Full Stack'
    },
    {
      _id: 'tanviqgpt',
      title: 'TANVIQGPT',
      subtitle: 'AI Chat Application',
      category: 'AI / LLM',
      image: '/assets/img/blog/tanviqgpt.png',
      year: '@2025',
      badge: 'AI / LLM'
    },
    {
      _id: 'upnexa',
      title: 'UPNEXA',
      subtitle: 'Startup Listing Platform',
      category: 'Next.js',
      image: '/assets/img/blog/upnexa.png',
      year: '@2025',
      badge: 'Next.js'
    }
  ]

  useEffect(() => {
    document.title = 'Portfolio | Anuj Vishwakarma – Full Stack Developer'
    
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        if (response.ok) {
          const data = await response.json();
          setProjects(data);
        } else {
          setProjects(fallbackProjects);
        }
      } catch (err) {
        console.warn('Could not fetch portfolio projects:', err);
        setProjects(fallbackProjects);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const projectList = projects.length > 0 ? projects : fallbackProjects;

  // Filter projects dynamically based on the selected tab
  const filteredProjects = activeTab === 'Show All'
    ? projectList
    : projectList.filter(project => project.category === activeTab)

  // Compute tabs dynamically from unique project categories
  const tabs = ['Show All', ...new Set(projectList.map(p => p.category))];


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
              <span className="white">(2025-2026)</span>
              
              {/* Tab Filters */}
              <ul className="tablinks" data-aos="fade-down" data-aos-duration="2000">
                {tabs.map(tab => (
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
                      key={project._id} 
                      className="col-lg-4 col-md-6"
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
                                <Link to={`/Portfolio/${project._id}`} className="title">
                                  <span className="d-block">{project.title}</span>
                                  {project.subtitle}
                                </Link>
                              </h4>
                              {project.badge && <span className="ui-badge">{project.badge}</span>}
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
