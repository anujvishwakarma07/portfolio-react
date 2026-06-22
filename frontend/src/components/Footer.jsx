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
