import React, { useEffect, useState } from 'react'
import { API_BASE } from '../config'

function Hero() {
  const [content, setContent] = useState({
    status: 'CSE Graduate · SDE Intern 2026 · Open to Full-time',
    title: 'Full Stack <i>Developer</i>. <br /> I build backend systems and <i>ship them</i>.',
    desc: 'Worked across Node.js, React, MongoDB, and Laravel to ship auth systems, real-time apps, and AI integrations.'
  });

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/content`);
        if (response.ok) {
          const data = await response.json();
          const statusItem = data.find(item => item.section === 'hero' && item.key === 'status');
          const titleItem = data.find(item => item.section === 'hero' && item.key === 'title');
          const descItem = data.find(item => item.section === 'hero' && item.key === 'desc');

          setContent({
            status: statusItem ? statusItem.value : 'CSE Graduate · SDE Intern 2026 · Open to Full-time',
            title: titleItem ? titleItem.value : 'Full Stack <i>Developer</i>. <br /> I build backend systems and <i>ship them</i>.',
            desc: descItem ? descItem.value : 'Worked across Node.js, React, MongoDB, and Laravel to ship auth systems, real-time apps, and AI integrations.'
          });
        }
      } catch (err) {
        console.warn('Could not fetch dynamic hero content:', err);
      }
    };
    fetchContent();
  }, []);

  return (
    <div className="hero-fullscreen-layout container">
      <div className="row align-items-center h-100 py-lg-5">

        {/* Left Side: Typography and main introduction */}
        <div className="col-lg-7 col-md-12 hero-text-side">
          <div className="location-label mb-4 mb-lg-3 d-inline-flex align-items-center" data-aos="fade-down" data-aos-duration="1000">
            <span className="status-dot"></span>
            <span dangerouslySetInnerHTML={{ __html: content.status }}></span>
          </div>

          <h1 className="hero-main-title white mb-4" data-aos="fade-right" data-aos-duration="1200" dangerouslySetInnerHTML={{ __html: content.title }}></h1>

          <p className="hero-intro-desc pra-clr mb-5" data-aos="fade-right" data-aos-duration="1400" dangerouslySetInnerHTML={{ __html: content.desc }}></p>

          {/* Quick Metrics at bottom left */}
          <div className="hero-metrics-grid d-flex flex-wrap gap-5 mt-4" data-aos="fade-up" data-aos-duration="1500">
            <div className="metric-item">
              <span className="metric-number">1+</span>
              <span className="metric-label">Years<br />Experience</span>
            </div>
            <div className="metric-item">
              <span className="metric-number">3+</span>
              <span className="metric-label">Projects<br />Deployed</span>
            </div>
            <div className="metric-item">
              <span className="metric-number">2</span>
              <span className="metric-label">Company<br />Worked At</span>
            </div>
          </div>
        </div>

        {/* Right Side: Profile visual */}
        <div className="col-lg-5 col-md-12 hero-visual-side mt-5 mt-lg-0 d-flex justify-content-center justify-content-lg-end" data-aos="fade-left" data-aos-duration="1200">
          <div className="hero-profile-card-layout d-flex flex-column align-items-center">
            <div className="hero-profile-image-wrap">
              <img src="/assets/img/banner/profile.png" alt="Anuj Vishwakarma Profile" className="hero-profile-img" />
            </div>

            <div className="profile-details mt-3 text-center">
              <h4 className="profile-name white mb-1">Anuj Vishwakarma</h4>
              <p className="profile-role pra-clr mb-3">Full Stack Developer | MERN Stack</p>
              <ul className="profile-social-links d-flex gap-3 justify-content-center">
                <li>
                  <a href="https://www.linkedin.com/in/anuj-vishwakarma-84845133b/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <i className="bi bi-linkedin"></i>
                  </a>
                </li>
                <li>
                  <a href="mailto:anujvishwakarma7077@gmail.com" aria-label="Email">
                    <i className="bi bi-envelope"></i>
                  </a>
                </li>
                <li>
                  <a href="https://github.com/anujvishwakarma07" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <i className="bi bi-github"></i>
                  </a>
                </li>
                <li>
                  <a href="https://leetcode.com/u/anujvishwakarma07/" target="_blank" rel="noopener noreferrer" aria-label="LeetCode">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                      <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Hero
