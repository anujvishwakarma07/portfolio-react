import { useEffect } from "react"
import About from "./components/About"
import Header from "./components/Header"
import Hero from "./components/Hero"
import AOS from 'aos' // 1. Import AOS JS library
import Timeline from "./components/Timeline"

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
    </>
  )
}

export default App
