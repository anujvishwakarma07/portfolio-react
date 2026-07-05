import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Sponsors from '../components/Sponsors'
import { API_BASE } from '../config'

function PortfolioPage() {
  const [activeTab, setActiveTab] = useState('Show All')
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const fallbackProjects = [
    {
      _id: 'vetocar',
      title: 'VETOCAR',
      subtitle: 'React.js · Node.js · Express.js · MongoDB · Gemini API · Razorpay',
      category: 'AI / Fintech',
      image: '/assets/img/project/VetoCar/vetocar_1.png',
      year: '@2026',
      badge: 'AI / Fintech',
      githubUrl: 'https://github.com/anujvishwakarma07/VetoCar',
      liveUrl: 'https://car-veto.vercel.app/'
    },
    {
      _id: 'tanviqgpt',
      title: 'TANVIQGPT',
      subtitle: 'React.js · Node.js · Express.js · MongoDB Atlas · OpenRouter API',
      category: 'AI / LLM',
      image: '/assets/img/project/TanviqGpt/tanviqgpt_1.png',
      year: '@2025',
      badge: 'AI / LLM',
      githubUrl: 'https://github.com/anujvishwakarma07/TanviqGpt',
      liveUrl: 'https://tanviq-gpt.vercel.app/'
    },
    {
      _id: 'havynlife',
      title: 'HAVYNLIFE',
      subtitle: 'Node.js · Express · MongoDB · EJS',
      category: 'Full Stack',
      image: '/assets/img/project/Havynlife/havynlife_1.png',
      year: '@2025',
      badge: 'Full Stack',
      githubUrl: 'https://github.com/anujvishwakarma07/HavynLife',
      liveUrl: 'https://havynlife.onrender.com/'
    },
    {
      _id: 'upnexa',
      title: 'UPNEXA',
      subtitle: 'Next.js 15 · React 19 · Sanity CMS · Tailwind CSS',
      category: 'Next.js',
      image: '/assets/img/project/UpNexa/upnexa_1.png',
      year: '@2025',
      badge: 'Next.js',
      githubUrl: 'https://github.com/anujvishwakarma07/UpNexa',
      liveUrl: 'https://upnexa.vercel.app/'
    }
  ]

  useEffect(() => {
    document.title = 'Portfolio | Anuj Vishwakarma – Full Stack Developer'
    
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/projects`);
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
              My Portfolio
            </span>
            <h2 className="stitle fw-500 mt-3" data-aos="fade-down" data-aos-duration="1500">
              Projects I've Built &
              <span className="text-storkes d-block">Shipped Live.</span>
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
                      className="col-lg-4 col-md-6 portfolio-project-grid-item"
                    >
                      <div className="premium-project-card">
                        <div className="project-img-container">
                          <img 
                            src={project.image || '/assets/img/project/Havynlife/havynlife_1.png'} 
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
                            <Link to={`/Portfolio/${project._id}`}>{project.title}</Link>
                          </h4>
                          <p className="project-card-tech">{project.subtitle || project.category}</p>
                          <div className="project-card-actions">
                            {project.githubUrl && (
                              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="project-action-btn">
                                <i className="bi bi-github"></i> GitHub
                              </a>
                            )}
                            {project.liveUrl && (
                              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="project-action-btn btn-live">
                                <i className="bi bi-box-arrow-up-right"></i> Live
                              </a>
                            )}
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
