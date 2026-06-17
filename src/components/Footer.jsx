import React, { useState } from 'react'

function Footer() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.placeholder.toLowerCase() || e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // For now, we alert the user. In the future, you can connect this to a backend API or email service!
    alert(`Thank you ${formData.name || 'there'}! Your message has been sent successfully (Mocked).`)
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <div className="footer-section check-box-style pt-100" id="conts">
      <div className="container p-0">
        <div className="talk-text text-center" data-aos="zoom-in" data-aos-duration="1400">
          LET’S WORK TOGETHER
        </div>
        
        <a href="mailto:anujvishwakarma7077@gmail.com" className="infomail d-center cmborder round100">
          anujvishwakarma7077@gmail.com
        </a>

        <div className="footer-topping-wrap check-box-style round30">
          <div className="row justify-content-between">
            <div className="col-xl-4 col-lg-6">
              <div className="contact-left">
                <p className="pra-clr fz16 pragraph-one">
                  I’m always open to discussing new opportunities, collaborations, or innovative project ideas.
                  Let’s connect and build something impactful.
                </p>
                <div className="contact-infos">
                  <a href="#0">Kanpur (Uttar Pradesh), India, 208008</a>
                  <a href="tel:+916386109984">+91 6386109984</a>
                  <a href="mailto:anujvishwakarma7077@gmail.com">anujvishwakarma7077@gmail.com</a>
                </div>
                <div className="footer-social">
                  <a href="#0" className="fsocial d-inline-flex align-items-center justify-content-center">Facebook</a>
                  <a href="#0" className="fsocial d-inline-flex align-items-center justify-content-center">Twitter</a>
                  <a href="#0" className="fsocial d-inline-flex align-items-center justify-content-center">Behance</a>
                  <a href="#0" className="fsocial d-inline-flex align-items-center justify-content-center">Dribble</a>
                </div>
              </div>
            </div>

            <div className="col-xl-7 col-lg-6">
              {/* React onSubmit Form Handler */}
              <form onSubmit={handleSubmit} className="cmn-contact-form row g-4">
                <div className="col-lg-6">
                  <input 
                    type="text" 
                    placeholder="Name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
                <div className="col-lg-6">
                  <input 
                    type="email" 
                    placeholder="Email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
                <div className="col-lg-12">
                  <input 
                    type="text" 
                    placeholder="Subject" 
                    value={formData.subject} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
                <div className="col-lg-12">
                  <textarea 
                    name="message" 
                    rows="5" 
                    placeholder="Message" 
                    value={formData.message} 
                    onChange={handleChange} 
                    required
                  ></textarea>
                </div>
                <div className="col-lg-12">
                  <div className="btns">
                    <button type="submit" className="cmn-btn">
                      Send Message
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Footer bottom links & copyright */}
        <div className="footer-bottom">
          <div className="copyright">
            <p className="pra-clr">
              &copy; 2024. All rights reserved <a href="/" className="pwhite">Anuj Vishwakarma.</a>
            </p>
            <a href="#bn" className="scroll-toptext">Back To Home</a>
            <ul className="terms">
              <li><a href="#0">Terms & Condition</a></li>
              <li><a href="#0">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
