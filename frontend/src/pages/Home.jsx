import React, { useEffect } from 'react'
import Hero from '../components/Hero'
import About from '../components/About'
import Timeline from '../components/Timeline'
import Skills from '../components/Skills'
import Marquee from '../components/Marquee'
import Services from '../components/Services'
import Sponsors from '../components/Sponsors'
import Works from '../components/Works'
import Testimonials from '../components/Testimonials'

function Home() {
    useEffect(() => {
        document.title = 'Anuj Vishwakarma | Full Stack Developer – MERN Stack Portfolio'
    }, [])

    return (
        <>
            {/* Hero banner section wrapper */}
            <section className="banner-section mb-common" id="bn">
                <Hero />
            </section>

            <About />
            <Timeline />
            <Skills />
            <Marquee />
            <Services />
            <Sponsors />
            <Works />
            <Testimonials />
        </>
    )
}

export default Home
