import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function FeedbackWidget() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [promptState, setPromptState] = useState('idle'); // 'idle', 'visible', 'dismissing', 'dismissed'
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [formData, setFormData] = useState({ name: '', role: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [flashState, setFlashState] = useState('hidden'); // 'hidden', 'visible', 'dismissing'
  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [error, setError] = useState('');

  const getRatingFeedback = (r) => {
    switch (r) {
      case 1: return 'Needs Improvement 😕';
      case 2: return 'Okay, could be better 😐';
      case 3: return 'Good work! 😊';
      case 4: return 'Great! Highly responsive! 🚀';
      case 5: return 'Masterpiece! Exceptional! 💎';
      default: return 'Select your rating';
    }
  };

  // 10-second timer to show feedback prompt tooltip
  useEffect(() => {
    if (location.pathname.startsWith('/admin')) return;

    // Check if user dismissed prompt in this session
    const isDismissed = sessionStorage.getItem('feedback_prompt_dismissed');
    if (isDismissed) {
      setPromptState('dismissed');
      return;
    }

    const timer = setTimeout(() => {
      const currentlyDismissed = sessionStorage.getItem('feedback_prompt_dismissed');
      if (!isOpen && !currentlyDismissed) {
        setPromptState('visible');
      }
    }, 10000); // 10 seconds delay

    return () => clearTimeout(timer);
  }, [location.pathname, isOpen]);

  // Do not show widget on admin routes
  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (rating === 0) {
      setError('Please select a star rating.');
      return;
    }
    if (!formData.name.trim()) {
      setError('Please enter your name.');
      return;
    }
    if (!formData.message.trim()) {
      setError('Please write feedback comments.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          role: formData.role || 'Visitor',
          rating,
          message: formData.message
        })
      });

      const data = await response.json();

      if (response.ok) {
        setFormData({ name: '', role: '', message: '' });
        setRating(0);
        setShowModalSuccess(true);
        setFlashState('visible');
        setTimeout(() => {
          setFlashState('dismissing');
          setTimeout(() => {
            setFlashState('hidden');
          }, 400);
          setIsOpen(false);
          setShowModalSuccess(false);
        }, 3500);
      } else {
        setError(data.error || 'Failed to submit feedback.');
      }
    } catch (err) {
      setError('Failed to reach backend server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDismissWithAnimation = (callback) => {
    setPromptState('dismissing');
    sessionStorage.setItem('feedback_prompt_dismissed', 'true');
    setTimeout(() => {
      setPromptState('dismissed');
      if (callback) callback();
    }, 400);
  };

  const toggleModal = () => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
      setError('');
      setShowModalSuccess(false);
      if (promptState === 'visible') {
        handleDismissWithAnimation();
      } else {
        setPromptState('dismissed');
        sessionStorage.setItem('feedback_prompt_dismissed', 'true');
      }
    }
  };

  const dismissPrompt = (e) => {
    e.stopPropagation(); // Stop click propagation to prevent modal trigger
    handleDismissWithAnimation();
  };



  return (
    <>
      {/* Dynamic Coaching Prompt (Tooltip pointing to floating button) */}
      {/* Unique Hand-Drawn Glowing Arrow Coaching Widget */}
      {(promptState === 'visible' || promptState === 'dismissing') && (
        <div 
          style={{
            position: 'fixed',
            bottom: '140px',
            right: '74px',
            width: '180px',
            height: '110px',
            zIndex: 998,
            animation: promptState === 'dismissing' 
              ? 'fadeOutRight 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards' 
              : 'bounceIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
            fontFamily: '"Unbounded", sans-serif'
          }}
        >
          {/* Inner wrapper for continuous floating wiggle animation */}
          <div style={{
            width: '100%',
            height: '100%',
            position: 'relative',
            animation: 'floatWiggle 2s infinite ease-in-out'
          }}>
            {/* Annotation Text & Close Button Wrapper */}
            <div 
              style={{
                position: 'absolute',
                top: '5px',
                left: '10px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                pointerEvents: 'auto',
                zIndex: 10,
                cursor: 'pointer'
              }}
              onClick={() => handleDismissWithAnimation(() => {
                setIsOpen(true);
                setError('');
                setShowModalSuccess(false);
              })}
            >
              <span style={{
                fontFamily: 'Caveat, cursive, sans-serif',
                fontSize: '19px',
                fontWeight: 700,
                color: 'var(--white)',
                textShadow: '0 0 10px rgba(253, 249, 207, 0.4)',
                transform: 'rotate(-4deg)',
                display: 'inline-block',
                userSelect: 'none',
                transition: 'transform 0.2s, color 0.2s'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#ffffff'; e.currentTarget.style.transform = 'rotate(-4deg) scale(1.05)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--white)'; e.currentTarget.style.transform = 'rotate(-4deg) scale(1)'; }}
              >
                Feedback?
              </span>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  handleDismissWithAnimation();
                }}
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: 'none',
                  color: 'var(--white)',
                  cursor: 'pointer',
                  fontSize: '11px',
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s',
                  padding: 0
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(253, 249, 207, 0.2)'; e.currentTarget.style.color = '#ffffff'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'; e.currentTarget.style.color = 'var(--white)'; }}
              >
                <i className="bi bi-x-lg"></i>
              </button>
            </div>

            {/* Glowing, Flowing SVG Pointing Arrow */}
            <svg 
              width="180" 
              height="110" 
              style={{ 
                position: 'absolute',
                top: 0,
                left: 0,
                pointerEvents: 'none'
              }}
            >
              <defs>
                <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <marker 
                  id="neon-arrowhead" 
                  viewBox="0 0 10 10" 
                  refX="2" 
                  refY="5" 
                  markerWidth="6" 
                  markerHeight="6" 
                  orient="auto"
                >
                  <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="var(--white)" />
                </marker>
              </defs>
              {/* Hand-drawn style bezier curve pointing to the bottom right button */}
              <path 
                d="M 35 35 C 90 20, 130 45, 160 85" 
                fill="none" 
                stroke="var(--white)" 
                strokeWidth="2.5" 
                strokeDasharray="6, 4"
                markerEnd="url(#neon-arrowhead)"
                filter="url(#neon-glow)"
                style={{
                  animation: 'strokeFlow 1s linear infinite'
                }}
              />
            </svg>
          </div>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button 
        onClick={toggleModal}
        className="feedback-trigger-btn"
        style={{
          animation: promptState === 'visible'
            ? 'floatPulse 2s infinite ease-in-out, glowingButtonPulse 2s infinite ease-in-out'
            : 'floatPulse 2s infinite ease-in-out'
        }}
      >
        <i className={isOpen ? "bi bi-x-lg" : "bi bi-chat-heart-fill"}></i>
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.85)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000,
          padding: '20px',
          animation: 'fadeIn 0.25s ease-out'
        }}>
          <div className="feedback-modal-card">
            {/* Ambient Background Glow Circles */}
            <div style={{
              position: 'absolute',
              top: '-50px',
              left: '-50px',
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              background: 'rgba(253, 249, 207, 0.04)',
              filter: 'blur(40px)',
              pointerEvents: 'none',
              zIndex: 0
            }}></div>
            <div style={{
              position: 'absolute',
              bottom: '-50px',
              right: '-50px',
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              background: 'rgba(253, 249, 207, 0.02)',
              filter: 'blur(40px)',
              pointerEvents: 'none',
              zIndex: 0
            }}></div>

            {/* Close Button */}
            <button 
              onClick={toggleModal}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'transparent',
                border: '1px solid var(--cmborder)',
                color: 'var(--pra)',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                zIndex: 10
              }}
              onMouseEnter={(e) => { 
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; 
                e.currentTarget.style.color = '#ffffff'; 
                e.currentTarget.style.transform = 'scale(1.1)';
                e.currentTarget.style.borderColor = 'var(--white)';
              }}
              onMouseLeave={(e) => { 
                e.currentTarget.style.background = 'transparent'; 
                e.currentTarget.style.color = 'var(--pra)'; 
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.borderColor = 'var(--cmborder)';
              }}
            >
              <i className="bi bi-x-lg"></i>
            </button>

            {showModalSuccess ? (
              // Success Screen inside the Modal
              <div style={{ 
                textAlign: 'center', 
                padding: '30px 0 10px',
                position: 'relative',
                zIndex: 1,
                animation: 'scaleIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}>
                <div style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: '50%',
                  background: 'rgba(63, 202, 144, 0.1)',
                  color: 'var(--success)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '36px',
                  marginBottom: '24px',
                  boxShadow: '0 0 20px rgba(63, 202, 144, 0.2)',
                  border: '1px solid rgba(63, 202, 144, 0.3)',
                  animation: 'rotateScaleIn 0.5s ease-out'
                }}>
                  <i className="bi bi-check-lg"></i>
                </div>
                <h4 className="feedback-heading">
                  Feedback <i>Submitted!</i>
                </h4>
                <p className="feedback-subheading" style={{ margin: '0' }}>
                  Thank you for rating my portfolio. Your review has been saved and is sent directly to the admin panel.
                </p>
                <div style={{ fontSize: '11px', color: 'var(--white)', fontWeight: 600, marginTop: '24px', letterSpacing: '0.5px' }}>
                  CLOSING WINDOW IN A MOMENT...
                </div>
              </div>
            ) : (
              // Form Screen inside the Modal
              <div style={{ position: 'relative', zIndex: 1 }}>
                <h4 className="feedback-heading">
                  Rate My <i>Portfolio</i>
                </h4>
                <p className="feedback-subheading">
                  What do you think of the design, speed, and features?
                </p>

                {error && (
                  <div style={{
                    background: 'rgba(237, 80, 80, 0.1)',
                    border: '1px solid rgba(237, 80, 80, 0.2)',
                    color: 'var(--danger)',
                    padding: '10px 14px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    marginBottom: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <i className="bi bi-exclamation-triangle"></i>
                    {error}
                  </div>
                )}

                <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  
                  {/* Star Rating selector */}
                  <div style={{
                    background: 'transparent',
                    border: '1px solid var(--cmborder)',
                    borderRadius: '6px',
                    padding: '18px 16px',
                    textAlign: 'center',
                    marginBottom: '20px'
                  }}>
                    <label className="feedback-label">
                      SELECT RATING SCORE *
                    </label>
                    <div 
                      onMouseLeave={() => setHoverRating(0)}
                      style={{ display: 'inline-flex', gap: '10px' }}
                    >
                      {[1, 2, 3, 4, 5].map((index) => {
                        const filled = index <= (hoverRating || rating);
                        return (
                          <button
                            key={index}
                            type="button"
                            onClick={() => setRating(index)}
                            onMouseEnter={() => setHoverRating(index)}
                            style={{
                              background: 'transparent',
                              border: 'none',
                              cursor: 'pointer',
                              padding: 0,
                              fontSize: '28px',
                              color: filled ? 'var(--ratting)' : '#333333',
                              transition: 'all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                              transform: hoverRating === index ? 'scale(1.2)' : 'none',
                              filter: filled ? 'drop-shadow(0 0 4px rgba(250, 163, 17, 0.4))' : 'none'
                            }}
                          >
                            <i className={filled ? "bi bi-star-fill" : "bi bi-star"}></i>
                          </button>
                        );
                      })}
                    </div>
                    <div style={{ 
                      fontSize: '10px', 
                      color: 'var(--white)', 
                      marginTop: '8px', 
                      fontWeight: 600, 
                      letterSpacing: '0.5px',
                      textTransform: 'uppercase',
                      height: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {getRatingFeedback(hoverRating || rating)}
                    </div>
                  </div>

                  {/* Name Input */}
                  <div className="feedback-input-wrap">
                    <label className="feedback-label">
                      YOUR NAME *
                    </label>
                    <div style={{ position: 'relative' }}>
                      <span className="feedback-input-icon">
                        <i className="bi bi-person-fill"></i>
                      </span>
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g. John Doe"
                        required
                        className="feedback-input-with-icon"
                      />
                    </div>
                  </div>

                  {/* Role Input */}
                  <div className="feedback-input-wrap">
                    <label className="feedback-label">
                      ROLE / COMPANY (OPTIONAL)
                    </label>
                    <div style={{ position: 'relative' }}>
                      <span className="feedback-input-icon">
                        <i className="bi bi-briefcase-fill"></i>
                      </span>
                      <input 
                        type="text" 
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        placeholder="e.g. Recruiter at Google"
                        className="feedback-input-with-icon"
                      />
                    </div>
                  </div>

                  {/* Message Input */}
                  <div className="feedback-input-wrap">
                    <label className="feedback-label">
                      FEEDBACK MESSAGE *
                    </label>
                    <div style={{ position: 'relative' }}>
                      <span className="feedback-textarea-icon">
                        <i className="bi bi-chat-text-fill"></i>
                      </span>
                      <textarea 
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={3}
                        placeholder="Share your thoughts on design, responsiveness, or features..."
                        required
                        className="feedback-input-with-icon"
                        style={{ resize: 'none', paddingTop: '12px' }}
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="feedback-submit-btn"
                    style={{ marginTop: '8px' }}
                  >
                    {loading ? 'Submitting...' : 'Submit Feedback'}
                  </button>

                </form>
              </div>
            )}

          </div>
        </div>
      )}

      {/* Dynamic Flash Message Toast (At the top right of the viewport) */}
      {(flashState === 'visible' || flashState === 'dismissing') && (
        <div className="feedback-toast-container" style={{
          animation: flashState === 'dismissing' 
            ? 'slideOutRight 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards' 
            : 'slideInRight 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards'
        }}>
          <div style={{
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            background: 'rgba(63, 202, 144, 0.1)',
            color: 'var(--success)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            flexShrink: 0
          }}>
            <i className="bi bi-check-lg"></i>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--pwhite)' }}>Success!</div>
            <div style={{ fontSize: '11px', color: 'var(--pra)', marginTop: '2px', lineHeight: 1.4 }}>
              Feedback logged successfully. Thank you!
            </div>
          </div>
          {/* Progress Countdown Line Bar */}
          <div className="toast-progress-bar"></div>
        </div>
      )}

      {/* Embedded CSS Animations */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap');

        .feedback-modal-card {
          position: relative;
          width: 100%;
          max-width: 480px;
          background: #0d0d0d !important;
          border: 1px solid var(--cmborder) !important;
          border-radius: 16px !important;
          padding: 36px !important;
          box-shadow: inset 4px 4px 12px rgba(56, 53, 53, 0.27), inset -4px -4px 12px rgba(58, 56, 56, 0.32), 0 20px 50px rgba(0, 0, 0, 0.8) !important;
          overflow: hidden;
          font-family: "Unbounded", sans-serif !important;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .feedback-heading {
          font-family: "Unbounded", sans-serif;
          font-size: 22px;
          font-weight: 500;
          color: var(--pwhite);
          line-height: 1.3;
          margin: 0 0 6px 0;
          letter-spacing: -0.5px;
        }

        .feedback-heading i {
          font-family: "Instrument Serif", serif;
          font-style: italic;
          font-weight: 400;
          color: var(--white) !important;
          text-transform: none;
        }

        .feedback-subheading {
          font-family: "Unbounded", sans-serif;
          font-size: 13px;
          font-weight: 300;
          color: var(--pra);
          margin: 0 0 24px 0;
          line-height: 1.5;
        }

        .feedback-label {
          display: block;
          font-family: "Unbounded", sans-serif;
          font-size: 10px;
          font-weight: 400;
          letter-spacing: 0.08em;
          color: var(--pra);
          margin-bottom: 8px;
          text-transform: uppercase;
        }

        .feedback-input-wrap {
          position: relative;
          margin-bottom: 20px;
        }

        .feedback-input-with-icon {
          width: 100%;
          background: transparent !important;
          border: 1px solid var(--cmborder) !important;
          border-radius: 6px !important;
          padding: 14px 16px 14px 44px !important;
          color: var(--pwhite) !important;
          font-size: 14px !important;
          font-family: "Unbounded", sans-serif !important;
          font-weight: 300 !important;
          outline: none !important;
          transition: border-color 0.3s, box-shadow 0.3s !important;
        }

        .feedback-input-with-icon:focus {
          border-color: rgba(253, 249, 207, 0.4) !important;
          box-shadow: 0 0 0 3px rgba(253, 249, 207, 0.08) !important;
        }

        .feedback-input-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--pra);
          font-size: 16px;
          transition: color 0.3s;
          pointer-events: none;
          z-index: 2;
        }

        .feedback-textarea-icon {
          position: absolute;
          left: 16px;
          top: 16px;
          color: var(--pra);
          font-size: 16px;
          transition: color 0.3s;
          pointer-events: none;
          z-index: 2;
        }

        .feedback-input-wrap:focus-within .feedback-input-icon,
        .feedback-input-wrap:focus-within .feedback-textarea-icon {
          color: var(--white) !important;
        }

        .feedback-submit-btn {
          width: 100%;
          padding: 16px 28px;
          font-family: "Unbounded", sans-serif;
          font-weight: 700;
          font-size: 14px;
          text-transform: uppercase;
          background: var(--white) !important;
          color: #000000 !important;
          border: 1px solid var(--white) !important;
          border-radius: 6px !important;
          cursor: pointer !important;
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
          box-shadow: 0 5px 15px rgba(253, 249, 207, 0.1) !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          gap: 8px !important;
        }

        .feedback-submit-btn:hover:not(:disabled) {
          background: transparent !important;
          color: var(--white) !important;
          box-shadow: 0 0 20px rgba(253, 249, 207, 0.2) !important;
          transform: translateY(-2px);
        }

        .feedback-submit-btn:disabled {
          background: rgba(255, 255, 255, 0.05) !important;
          border-color: rgba(255, 255, 255, 0.05) !important;
          color: rgba(255, 255, 255, 0.2) !important;
          box-shadow: none !important;
          cursor: not-allowed !important;
        }

        .feedback-trigger-btn {
          position: fixed;
          bottom: 100px;
          right: 30px;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: var(--body) !important;
          color: var(--white) !important;
          border: 1px solid var(--cmborder) !important;
          box-shadow: inset 4px 4px 12px rgba(56, 53, 53, 0.27), inset -4px -4px 12px rgba(58, 56, 56, 0.32), 0 8px 24px rgba(0, 0, 0, 0.5) !important;
          cursor: pointer;
          zIndex: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .feedback-trigger-btn:hover {
          transform: scale(1.08) translateY(-2px);
          border-color: var(--white) !important;
          box-shadow: inset 4px 4px 12px rgba(56, 53, 53, 0.27), inset -4px -4px 12px rgba(58, 56, 56, 0.32), 0 12px 30px rgba(253, 249, 207, 0.15) !important;
        }

        .feedback-toast-container {
          position: fixed;
          top: 30px;
          right: 30px;
          width: 340px;
          background: rgba(13, 13, 15, 0.9) !important;
          backdrop-filter: blur(12px) !important;
          -webkit-backdrop-filter: blur(12px) !important;
          border: 1px solid rgba(63, 202, 144, 0.3) !important;
          border-radius: 10px !important;
          padding: 16px 20px !important;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.6), 0 0 20px rgba(63, 202, 144, 0.1) !important;
          z-index: 100000;
          font-family: "Unbounded", sans-serif !important;
          display: flex;
          align-items: flex-start;
          gap: 12px;
          overflow: hidden;
          pointer-events: auto;
        }

        @media (max-width: 575px) {
          .feedback-toast-container {
            top: 20px;
            right: 20px;
            left: 20px;
            width: calc(100% - 40px);
          }
        }

        .toast-progress-bar {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 3px;
          background: var(--success) !important;
          width: 100%;
          animation: progressCountdown 3.5s linear forwards;
        }

        @keyframes floatPulse {
          0% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
          100% { transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes bounceIn {
          0% { transform: scale(0.8) translateX(40px); opacity: 0; }
          70% { transform: scale(1.02) translateX(-4px); opacity: 0.9; }
          100% { transform: scale(1) translateX(0); opacity: 1; }
        }
        @keyframes fadeOutRight {
          0% { transform: scale(1) translateX(0); opacity: 1; }
          100% { transform: scale(0.8) translateX(40px); opacity: 0; }
        }
        @keyframes strokeFlow {
          to {
            stroke-dashoffset: -20;
          }
        }
        @keyframes floatWiggle {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(3px, 3px); }
        }
        @keyframes glowingButtonPulse {
          0% {
            box-shadow: inset 4px 4px 12px rgba(56, 53, 53, 0.27), inset -4px -4px 12px rgba(58, 56, 56, 0.32), 0 0 0 0 rgba(253, 249, 207, 0.4);
          }
          50% {
            box-shadow: inset 4px 4px 12px rgba(56, 53, 53, 0.27), inset -4px -4px 12px rgba(58, 56, 56, 0.32), 0 0 0 10px rgba(253, 249, 207, 0);
          }
          100% {
            box-shadow: inset 4px 4px 12px rgba(56, 53, 53, 0.27), inset -4px -4px 12px rgba(58, 56, 56, 0.32), 0 0 0 0 rgba(253, 249, 207, 0);
          }
        }
        @keyframes slideInRight {
          0% { transform: translateX(50px); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
          0% { transform: translateX(0); opacity: 1; }
          100% { transform: translateX(50px); opacity: 0; }
        }
        @keyframes rotateScaleIn {
          0% { transform: scale(0.3) rotate(-45deg); opacity: 0; }
          70% { transform: scale(1.1) rotate(10deg); }
          100% { transform: scale(1) rotate(0); opacity: 1; }
        }
        @keyframes progressCountdown {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </>
  );
}
