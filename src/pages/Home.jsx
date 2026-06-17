import React from 'react'
import Hero from '../components/Hero'
import About from '../components/About'
import Timeline from '../components/Timeline'
import Skills from '../components/Skills'
import Marquee from '../components/Marquee'
import Services from '../components/Services'
import Sponsors from '../components/Sponsors'
import Works from '../components/Works'
import Testimonials from '../components/Testimonials'
import Blogs from '../components/Blogs'
import Footer from '../components/Footer'
import Header from '../components/Header'

function Home() {
    return (
        <>
            {/* Hero banner section wrapper */}
            <section className="banner-section mb-common" id="bn">
                <div className="banner-herowrapper">
                    <Header />
                    <Hero />
                </div>
            </section>

            <About />
            <Timeline />
            <Skills />
            <Marquee />
            <Services />
            <Sponsors />
            <Works />
            <Testimonials />
            <Blogs />
        </>
    )
}

export default Home
