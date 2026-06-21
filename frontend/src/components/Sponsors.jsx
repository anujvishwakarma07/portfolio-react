import React from 'react'

function Sponsors() {
  return (
    <section className="sponsor-sections check-box-style mb-common pt-100 pb-100">
      <div className="container">
        <div className="sponsor__area">
          <div className="section-title text-center mb-60">
            <span className="section-sub text-capitalize" data-aos="fade-down" data-aos-duration="1000">
              Worked With Modern Technologies
            </span>
          </div>
          <div className="tech-marquee-wrapper">
            <div className="tech-marquee-container">
              <div className="tech-marquee-content">
                {/* 1. React */}
                <div className="tech-card react">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" />
                  <span>React</span>
                </div>
                {/* 2. Next.js */}
                <div className="tech-card nextjs">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" className="light-filter" alt="Next.js" />
                  <span>Next.js</span>
                </div>
                {/* 3. Node.js */}
                <div className="tech-card nodejs">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="Node.js" />
                  <span>Node.js</span>
                </div>
                {/* 4. MongoDB */}
                <div className="tech-card mongodb">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" alt="MongoDB" />
                  <span>MongoDB</span>
                </div>
                {/* 5. Express.js */}
                <div className="tech-card express">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" className="light-filter" alt="Express.js" />
                  <span>Express.js</span>
                </div>
                {/* 6. GitHub */}
                <div className="tech-card github">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" className="light-filter" alt="GitHub" />
                  <span>GitHub</span>
                </div>
                {/* 7. Java */}
                <div className="tech-card java">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" alt="Java" />
                  <span>Java</span>
                </div>
                {/* 8. Tailwind CSS */}
                <div className="tech-card tailwind">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" alt="Tailwind" />
                  <span>Tailwind</span>
                </div>
                {/* 9. Docker */}
                <div className="tech-card docker">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" alt="Docker" />
                  <span>Docker</span>
                </div>
                {/* 10. Kubernetes */}
                <div className="tech-card kubernetes">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" alt="Kubernetes" />
                  <span>Kubernetes</span>
                </div>
                {/* 11. MySQL */}
                <div className="tech-card mysql">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" alt="MySQL" />
                  <span>MySQL</span>
                </div>
                {/* 12. Vercel */}
                <div className="tech-card vercel">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg" className="light-filter" alt="Vercel" />
                  <span>Vercel</span>
                </div>
                {/* 13. Postman */}
                <div className="tech-card postman">
                  <img src="https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg" alt="Postman" />
                  <span>Postman</span>
                </div>

                {/* Duplicate Cards for Smooth Infinite Loop */}
                <div className="tech-card react">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" />
                  <span>React</span>
                </div>
                <div className="tech-card nextjs">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" className="light-filter" alt="Next.js" />
                  <span>Next.js</span>
                </div>
                <div className="tech-card nodejs">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="Node.js" />
                  <span>Node.js</span>
                </div>
                <div className="tech-card mongodb">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" alt="MongoDB" />
                  <span>MongoDB</span>
                </div>
                <div className="tech-card express">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" className="light-filter" alt="Express.js" />
                  <span>Express.js</span>
                </div>
                <div className="tech-card github">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" className="light-filter" alt="GitHub" />
                  <span>GitHub</span>
                </div>
                <div className="tech-card java">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" alt="Java" />
                  <span>Java</span>
                </div>
                <div className="tech-card tailwind">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" alt="Tailwind" />
                  <span>Tailwind</span>
                </div>
                <div className="tech-card docker">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" alt="Docker" />
                  <span>Docker</span>
                </div>
                <div className="tech-card kubernetes">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" alt="Kubernetes" />
                  <span>Kubernetes</span>
                </div>
                <div className="tech-card mysql">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" alt="MySQL" />
                  <span>MySQL</span>
                </div>
                <div className="tech-card vercel">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg" className="light-filter" alt="Vercel" />
                  <span>Vercel</span>
                </div>
                <div className="tech-card postman">
                  <img src="https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg" alt="Postman" />
                  <span>Postman</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Sponsors
