import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { API_BASE } from '../config'

function Footer() {
  const location = useLocation()

  if (location.pathname.startsWith('/admin')) {
    return null
  }

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [statusMsg, setStatusMsg] = useState({ type: '', text: '' })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.placeholder.toLowerCase() || e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatusMsg({ type: '', text: '' })

    try {
      const response = await fetch(`${API_BASE}/api/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      const data = await response.json()

      if (response.ok) {
        setStatusMsg({ type: 'success', text: `Thank you, ${formData.name}! Your message has been sent successfully.` })
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        setStatusMsg({ type: 'error', text: data.error || 'Failed to send message. Please try again.' })
      }
    } catch (error) {
      setStatusMsg({ type: 'error', text: 'Server error. Please try again later.' })
    } finally {
      setLoading(false)
    }
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
                <ul className="profile-social-links d-flex gap-3 flex-wrap" style={{ listStyle: 'none', padding: 0, margin: '16px 0 0 0' }}>
                  <li>
                    <a href="https://www.linkedin.com/in/anuj-vishwakarma-84845133b/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                      <i className="bi bi-linkedin" style={{ fontSize: '18px' }}></i>
                    </a>
                  </li>
                  <li>
                    <a href="https://github.com/anujvishwakarma07" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                      <i className="bi bi-github" style={{ fontSize: '18px' }}></i>
                    </a>
                  </li>
                  <li>
                    <a href="https://leetcode.com/u/anujvishwakarma07/" target="_blank" rel="noopener noreferrer" aria-label="LeetCode">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor" style={{ verticalAlign: 'middle' }}>
                        <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a href="mailto:anujvishwakarma7077@gmail.com" aria-label="Gmail">
                      <i className="bi bi-envelope" style={{ fontSize: '18px' }}></i>
                    </a>
                  </li>
                </ul>
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
                {statusMsg.text && (
                  <div className="col-lg-12">
                    <div style={{
                      padding: '12px 18px',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: '400',
                      background: statusMsg.type === 'success' ? 'rgba(46, 204, 113, 0.15)' : 'rgba(231, 76, 60, 0.15)',
                      border: statusMsg.type === 'success' ? '1px solid rgba(46, 204, 113, 0.3)' : '1px solid rgba(231, 76, 60, 0.3)',
                      color: statusMsg.type === 'success' ? '#2ecc71' : '#e74c3c',
                      marginTop: '5px'
                    }}>
                      {statusMsg.text}
                    </div>
                  </div>
                )}
                <div className="col-lg-12">
                  <div className="btns">
                    <button type="submit" className="cmn-btn" disabled={loading}>
                      {loading ? 'Sending...' : 'Send Message'}
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
              &copy; 2025. All rights reserved <a href="/" className="pwhite">Anuj Vishwakarma.</a>
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
