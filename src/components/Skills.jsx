import React, { useState, useEffect, useRef } from 'react'

// Sub-component to handle local counting animation
function AnimatedProgress({ percent, label, subtext, delay }) {
  const [count, setCount] = useState(0)
  const [animated, setAnimated] = useState(false)
  const [startAnimation, setStartAnimation] = useState(false)
  const elementRef = useRef(null)

  // Use IntersectionObserver to start animation only when scrolled into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting) {
          setStartAnimation(true)
          // Stop observing once animation has started
          observer.unobserve(entry.target)
        }
      },
      {
        threshold: 0.1, // trigger when 10% of the element is visible
      }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!startAnimation) return

    // 1. Trigger the circle progress animation
    const timer = setTimeout(() => {
      setAnimated(true)
    }, 100)

    // 2. Trigger the number counting animation
    let start = 0
    const end = percent
    if (start === end) return

    const duration = 2000 // 2 seconds animation
    const incrementTime = Math.floor(duration / end)

    const counter = setInterval(() => {
      start += 1
      setCount(start)
      if (start === end) {
        clearInterval(counter)
      }
    }, incrementTime)

    return () => {
      clearTimeout(timer)
      clearInterval(counter)
    }
  }, [percent, startAnimation])

  // Circumference for r=45 is 283
  const strokeDashoffset = animated ? 283 - (percent / 100) * 283 : 283

  return (
    <div 
      ref={elementRef}
      className="col-lg-3 col-md-6 col-sm-6" 
      data-aos="fade-up" 
      data-aos-duration={delay}
    >
      <div className="exprience-item cmn-shadow round50 d-center skill-circle-wrapper">
        <div className="skill-circle-inner">
          <svg className="skill-circle-svg" viewBox="0 0 100 100">
            <circle className="skill-circle-bg" cx="50" cy="50" r="45"></circle>
            <circle 
              className="skill-circle-progress" 
              cx="50" 
              cy="50" 
              r="45"
              style={{
                strokeDasharray: 283,
                strokeDashoffset: strokeDashoffset
              }}
            ></circle>
          </svg>
          <div className="skill-content text-center">
            <div className="odometer-item">
              <h3 className="counters d-flex align-items-center justify-content-center">
                <span>{count}</span>
                <span>%</span>
              </h3>
            </div>
            <span className="white sub-wu fw-600">{label}</span>
            <p className="pra-clr fz-12 mb-0">{subtext}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function Skills() {
  return (
    <section className="exprience-section-v1 check-box-style mb-common pt-100 pb-100" id="skill">
      <div className="container">
        <div className="section-title text-center mb-60">
          <span className="section-sub" data-aos="fade-down" data-aos-duration="1000">
            Professional Skills
          </span>
          <h2 className="stitle fw-500 mt-3" data-aos="fade-down" data-aos-duration="1500">
            I Build Reliable and Scalable
            <span className="text-storkes d-block">
              Software Solutions
            </span>
          </h2>
        </div>

        <div className="row g-xxl-4 g-3 justify-content-center">
          <AnimatedProgress 
            percent={85} 
            label="Frontend" 
            subtext="(React, Next.js, HTML, CSS)" 
            delay={1200}
          />
          <AnimatedProgress 
            percent={80} 
            label="Backend" 
            subtext="(Node.js, Express.js, APIs)" 
            delay={1400}
          />
          <AnimatedProgress 
            percent={75} 
            label="Full-Stack" 
            subtext="(MERN, Auth, DBs)" 
            delay={1600}
          />
          <AnimatedProgress 
            percent={70} 
            label="DSA & Logic" 
            subtext="Solving complex problems with efficient algorithms." 
            delay={1800}
          />
        </div>
      </div>
    </section>
  )
}

export default Skills
