import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { API_BASE } from '../config'

function Works() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const fallbackProjects = [
    {
      _id: 'havynlife',
      title: 'HAVYNLIFE',
      subtitle: 'Node.js · Express · MongoDB · EJS',
      category: 'Full Stack',
      image: '/assets/img/blog/havynlife.png',
      badge: 'Full Stack',
      githubUrl: 'https://github.com/anujvishwakarma07/HavynLife',
      liveUrl: 'https://havynlife.onrender.com/'
    },
    {
      _id: 'tanviqgpt',
      title: 'TANVIQGPT',
      subtitle: 'React.js · Node.js · Express.js · MongoDB Atlas · OpenRouter API',
      category: 'AI / LLM',
      image: '/assets/img/blog/tanviqgpt.png',
      badge: 'AI / LLM',
      githubUrl: 'https://github.com/anujvishwakarma07/TanviqGpt',
      liveUrl: 'https://tanviq-gpt.vercel.app/'
    },
    {
      _id: 'upnexa',
      title: 'UPNEXA',
      subtitle: 'Next.js 15 · React 19 · Sanity CMS · Tailwind CSS',
      category: 'Next.js',
      image: '/assets/img/blog/upnexa.png',
      badge: 'Next.js',
      githubUrl: 'https://github.com/anujvishwakarma07/UpNexa',
      liveUrl: 'https://upnexa.vercel.app/'
    }
  ];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/projects`);
        if (response.ok) {
          const data = await response.json();
          // Get the newest 3 projects
          setProjects(data.slice(0, 3));
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

  return (
    <section className="working-section check-box-style mb-common pt-100 pb-100" id="ports">
      <div className="container">
        <div className="cus__mb60 d-md-flex d-grid align-items-center justify-content-between gap-3">
          <div className="section-title">
            <span className="section-sub" data-aos="fade-down" data-aos-duration="1000">
              My Works
            </span>
            <h2 className="stitle fw-500 mt-3" data-aos="fade-down" data-aos-duration="1500">
              Look at My Portfolio & Give Me
              <span className="text-storkes d-block">
                Your Feedback
              </span>
            </h2>
            <div className="select-work d-flex align-items-start">
              <div className="d-flex flex-wrap align-items-center gap-md-4 gap-2 white">
                <span className="pra-clr">Selected work *</span>
                (2025-2026)
              </div>
              <img src="/assets/img/blog/half-arrow.png" alt="img" className="half-arrow" />
            </div>
          </div>
          
          {/* View All Projects Circle Button */}
          <div className="blog-hoverbox">
            <Link to="/portfolio" className="hover-circle cmborder wow fadeInUp" data-wow-duration="1.6s">
              <span className="box">
                <i className="bi bi-arrow-up-right"></i>
                <span className="textmore">Projects All</span>
              </span>
            </Link>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="row g-4">
          {projectList.map((project, index) => (
            <div 
              key={project._id || index} 
              className="col-lg-4 col-md-6" 
              data-aos="fade-up" 
              data-aos-duration={1000 + (index * 200)}
            >
              <div className="working-work-items cmn-shadow round8">
                <div className="thumb round8 position-relative mb-30">
                  <img src={project.image || '/assets/img/blog/havynlife.png'} alt={project.title} className="round8" />
                  {project.badge && (
                    <span className="bade-kit round100 d-inline-flex justify-content-center align-items-center">
                      {project.badge}
                    </span>
                  )}
                </div>
                <div className="working-content">
                  <h4 className="mb-xxl-2 mb-2">
                    <Link to={`/Portfolio/${project._id}`} className="white">{project.title}</Link>
                  </h4>
                  <span className="pra-clr d-block mb-2">{project.subtitle || project.category}</span>
                  <div className="d-flex gap-2 flex-wrap">
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="project-link-btn">
                        <i className="bi bi-github"></i> GitHub
                      </a>
                    )}
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="project-link-btn project-link-live">
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
    </section>
  )
}

export default Works
