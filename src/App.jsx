import { useEffect } from "react"
import About from "./components/About"
import Header from "./components/Header"
import Hero from "./components/Hero"
import AOS from 'aos' // 1. Import AOS JS library
import Timeline from "./components/Timeline"
import Skills from "./components/Skills"
import Marquee from "./components/Marquee"
import Services from "./components/Services"
import Sponsors from "./components/Sponsors"

function App() {
  //Initializing AOS when the app loads
  useEffect(()=>{
    AOS.init({
      once : true,
      easing : 'ease-in-out',
    })
  }, []);

  return (
    <>
      <section className="banner-section mb-common" id="bn">
        <div className="banner-herowrapper">
          <Header />
          <Hero />
        </div>
      </section>
      

      {/* About Section  */}
      <About />

      {/* Rendering the timeline here */}
      <Timeline />

      {/* Rendering the skills section  */}
      <Skills />

      {/* Rendering the Marquee section */}
      <Marquee />

      {/* Rendering the Service section */}
      <Services />

      {/* Rendering the working technology section */}
      <Sponsors />
    </>
  )
}

export default App
