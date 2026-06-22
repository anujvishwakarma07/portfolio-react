import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE } from '../../config';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [hasAdmin, setHasAdmin] = useState(true); // default to true to avoid visual layout shift
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Redirect if already authenticated
    const token = localStorage.getItem('admin_token');
    if (token) {
      navigate('/admin/dashboard');
      return;
    }

    // Check if an admin exists
    const checkAdminStatus = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/auth/status`);
        if (response.ok) {
          const data = await response.json();
          setHasAdmin(data.hasAdmin);
        }
      } catch (err) {
        console.warn('Failed to fetch admin registration status:', err);
      }
    };
    checkAdminStatus();
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMsg('');
    setSuccessMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    const endpoint = isRegisterMode ? `${API_BASE}/api/auth/register` : `${API_BASE}/api/auth/login`;

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();

      if (response.ok) {
        if (isRegisterMode) {
          setSuccessMsg('First Admin registered successfully! You can now log in.');
          setIsRegisterMode(false);
          setHasAdmin(true); // Lock register tabs immediately
          setFormData({ username: formData.username, password: '' });
        } else {
          localStorage.setItem('admin_token', data.token);
          localStorage.setItem('admin_user', data.username);
          navigate('/admin/dashboard');
        }
      } else {
        setErrorMsg(data.error || 'Authentication failed. Please check credentials.');
      }
    } catch (error) {
      setErrorMsg('Failed to reach server. Please make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#000000',
      color: '#ffffff',
      display: 'flex',
      fontFamily: '"Unbounded", sans-serif',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* LEFT PANEL: Form Section */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 24px',
        position: 'relative',
        zIndex: 2,
        background: 'radial-gradient(circle at 10% 20%, rgba(15, 15, 18, 0.95) 0%, rgba(9, 9, 11, 0.98) 100%)'
      }}>
        {/* Background radial highlight for form side */}
        <div style={{
          position: 'absolute',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(253, 249, 207, 0.03) 0%, rgba(0,0,0,0) 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 0,
          pointerEvents: 'none'
        }}></div>

        <div style={{
          width: '100%',
          maxWidth: '400px',
          background: 'rgba(255, 255, 255, 0.01)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          borderRadius: '16px',
          padding: '40px 32px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
          zIndex: 1,
          backdropFilter: 'blur(10px)'
        }}>
          {/* Header Title */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: '#ffffff',
              color: '#000000',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '22px',
              marginBottom: '16px',
              boxShadow: '0 4px 15px rgba(255, 255, 255, 0.15)'
            }}>
              <i className="bi bi-shield-lock-fill"></i>
            </div>
            
            <h3 style={{
              margin: '0 0 10px 0',
              fontSize: '26px',
              fontWeight: 400,
              fontFamily: '"Unbounded", sans-serif',
              color: '#ffffff',
              letterSpacing: '-0.5px'
            }}>
              {isRegisterMode ? (
                <>Admin <span style={{ fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', color: '#fdf9cf' }}>Setup</span></>
              ) : (
                <>Admin <span style={{ fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', color: '#fdf9cf' }}>Sign In</span></>
              )}
            </h3>
            
            <p style={{ margin: 0, fontSize: '12px', color: '#a0a09a', fontFamily: '"Unbounded", sans-serif', fontWeight: 300, lineHeight: 1.5 }}>
              {isRegisterMode 
                ? 'Configure credentials for first-time use' 
                : 'Enter your credentials to access the engine'
              }
            </p>
          </div>

          {/* Tab Selection (only visible if no admin exists) */}
          {!hasAdmin && (
            <div style={{
              display: 'flex',
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              borderRadius: '100px',
              padding: '4px',
              marginBottom: '24px'
            }}>
              <button 
                type="button" 
                onClick={() => { setIsRegisterMode(false); setErrorMsg(''); setSuccessMsg(''); }}
                style={{
                  flex: 1,
                  padding: '8px 0',
                  background: !isRegisterMode ? '#ffffff' : 'transparent',
                  color: !isRegisterMode ? '#000000' : '#a0a09a',
                  border: 'none',
                  borderRadius: '100px',
                  fontSize: '11px',
                  fontFamily: '"Unbounded", sans-serif',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                Sign In
              </button>
              <button 
                type="button" 
                onClick={() => { setIsRegisterMode(true); setErrorMsg(''); setSuccessMsg(''); }}
                style={{
                  flex: 1,
                  padding: '8px 0',
                  background: isRegisterMode ? '#ffffff' : 'transparent',
                  color: isRegisterMode ? '#000000' : '#a0a09a',
                  border: 'none',
                  borderRadius: '100px',
                  fontSize: '11px',
                  fontFamily: '"Unbounded", sans-serif',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                Setup Admin
              </button>
            </div>
          )}

          {/* Status Alerts */}
          {errorMsg && (
            <div style={{
              background: 'rgba(239, 68, 68, 0.06)',
              border: '1px solid rgba(239, 68, 68, 0.15)',
              color: '#f87171',
              padding: '12px',
              borderRadius: '8px',
              fontSize: '12px',
              fontFamily: '"Unbounded", sans-serif',
              fontWeight: 300,
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <i className="bi bi-exclamation-triangle" style={{ fontSize: '14px' }}></i>
              {errorMsg}
            </div>
          )}

          {successMsg && (
            <div style={{
              background: 'rgba(16, 185, 129, 0.06)',
              border: '1px solid rgba(16, 185, 129, 0.15)',
              color: '#34d399',
              padding: '12px',
              borderRadius: '8px',
              fontSize: '12px',
              fontFamily: '"Unbounded", sans-serif',
              fontWeight: 300,
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <i className="bi bi-check-circle" style={{ fontSize: '14px' }}></i>
              {successMsg}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label htmlFor="username" style={{ 
                display: 'block', 
                fontSize: '11px', 
                color: '#a0a09a', 
                marginBottom: '8px', 
                fontWeight: 500,
                fontFamily: '"Unbounded", sans-serif',
                letterSpacing: '1px'
              }}>
                USERNAME
              </label>
              <div style={{ position: 'relative' }}>
                <i className="bi bi-person" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#71717a' }}></i>
                <input 
                  type="text" 
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter username" 
                  required
                  style={{
                    width: '100%',
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '8px',
                    padding: '12px 14px 12px 42px',
                    color: '#ffffff',
                    fontSize: '13px',
                    fontFamily: '"Unbounded", sans-serif',
                    outline: 'none',
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.3)'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" style={{ 
                display: 'block', 
                fontSize: '11px', 
                color: '#a0a09a', 
                marginBottom: '8px', 
                fontWeight: 500,
                fontFamily: '"Unbounded", sans-serif',
                letterSpacing: '1px'
              }}>
                PASSWORD
              </label>
              <div style={{ position: 'relative' }}>
                <i className="bi bi-key" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#71717a' }}></i>
                <input 
                  type="password" 
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password" 
                  required
                  style={{
                    width: '100%',
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '8px',
                    padding: '12px 14px 12px 42px',
                    color: '#ffffff',
                    fontSize: '13px',
                    fontFamily: '"Unbounded", sans-serif',
                    outline: 'none',
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.3)'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              style={{
                background: '#ffffff',
                color: '#000000',
                border: '1px solid #ffffff',
                borderRadius: '100px',
                padding: '14px 28px',
                fontSize: '13px',
                fontWeight: 600,
                fontFamily: '"Unbounded", sans-serif',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                marginTop: '10px',
                boxShadow: '0 4px 15px rgba(255,255,255,0.1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(255,255,255,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#ffffff';
                e.currentTarget.style.color = '#000000';
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(255,255,255,0.1)';
              }}
            >
              {loading ? (
                <>
                  <span style={{
                    width: '16px',
                    height: '16px',
                    border: '2px solid rgba(255,255,255,0.2)',
                    borderTopColor: '#ffffff',
                    borderRadius: '50%',
                    display: 'inline-block',
                    animation: 'spin 0.8s linear infinite'
                  }}></span>
                  Authenticating...
                </>
              ) : (
                <>
                  {isRegisterMode ? 'Complete Setup' : 'Access Dashboard'}
                  <i className="bi bi-arrow-right-short" style={{ fontSize: '18px' }}></i>
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* RIGHT PANEL: Visual Section matching the Hero Section exactly */}
      <div className="login-visual-panel" style={{
        flex: '1.2',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#000000',
        borderLeft: '1px solid rgba(255, 255, 255, 0.05)',
        overflow: 'hidden',
        padding: '40px',
        zIndex: 2
      }}>
        {/* Profile Card Wrapper */}
        <div style={{
          width: '100%',
          maxWidth: '420px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          {/* Profile Image container with the morphing glows */}
          <div className="hero-profile-image-wrap-login" style={{
            width: '100%',
            aspectRatio: '1',
            borderRadius: '24px',
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            {/* Morphing Backdrop Glows */}
            <div className="morph-glow-gold" style={{
              position: 'absolute',
              top: '5%',
              left: '5%',
              right: '5%',
              bottom: '5%',
              zIndex: 1,
              filter: 'blur(65px)',
              opacity: 0.22,
              pointerEvents: 'none',
              background: 'radial-gradient(circle at 35% 35%, rgba(253, 249, 207, 0.3) 0%, rgba(0, 0, 0, 0) 70%)',
              animation: 'morphBlob 20s infinite alternate ease-in-out'
            }}></div>
            <div className="morph-glow-white" style={{
              position: 'absolute',
              top: '5%',
              left: '5%',
              right: '5%',
              bottom: '5%',
              zIndex: 1,
              filter: 'blur(65px)',
              opacity: 0.18,
              pointerEvents: 'none',
              background: 'radial-gradient(circle at 65% 65%, rgba(255, 255, 255, 0.2) 0%, rgba(0, 0, 0, 0) 70%)',
              animation: 'morphBlobSecondary 25s infinite alternate ease-in-out'
            }}></div>

            {/* Profile Image */}
            <img 
              src="/assets/img/banner/profile.png" 
              alt="Anuj Vishwakarma Profile" 
              className="hero-profile-img-login"
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: '420px',
                objectFit: 'contain',
                borderRadius: '20px',
                zIndex: 2,
                boxShadow: '0 15px 35px rgba(0, 0, 0, 0.4)',
                WebkitMaskImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 1) 75%, rgba(0, 0, 0, 0) 100%)',
                maskImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 1) 75%, rgba(0, 0, 0, 0) 100%)',
                transition: 'all 0.3s ease'
              }}
            />
          </div>

          {/* Details below photo */}
          <div className="profile-details-login" style={{
            width: '100%',
            position: 'relative',
            paddingTop: '25px',
            marginTop: '50px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            {/* Divider line matching homepage */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '50%',
              height: '1px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)'
            }}></div>

            <h2 style={{ 
              fontSize: '24px', 
              fontWeight: 500, 
              color: '#ffffff', 
              fontFamily: '"Unbounded", sans-serif',
              margin: '0 0 6px 0'
            }}>
              Anuj Vishwakarma
            </h2>
            <p style={{ 
              fontSize: '11px', 
              color: 'var(--pra-clr, #a0a09a)', 
              margin: 0, 
              fontFamily: '"Unbounded", sans-serif',
              letterSpacing: '1px', 
              textTransform: 'uppercase' 
            }}>
              Portfolio Administration
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes morphBlob {
          0% {
            border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%;
            transform: rotate(0deg) scale(0.95);
          }
          50% {
            border-radius: 70% 30% 52% 48% / 60% 40% 60% 40%;
            transform: rotate(90deg) scale(1.05);
          }
          100% {
            border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%;
            transform: rotate(180deg) scale(0.95);
          }
        }
        @keyframes morphBlobSecondary {
          0% {
            border-radius: 50% 50% 30% 70% / 50% 60% 40% 50%;
            transform: rotate(180deg) scale(1.05);
          }
          50% {
            border-radius: 30% 70% 70% 30% / 50% 30% 70% 50%;
            transform: rotate(90deg) scale(0.95);
          }
          100% {
            border-radius: 50% 50% 30% 70% / 50% 60% 40% 50%;
            transform: rotate(0deg) scale(1.05);
          }
        }
        
        .hero-profile-img-login {
          filter: grayscale(100%) contrast(105%);
        }
        .hero-profile-img-login:hover {
          filter: grayscale(0%) contrast(100%);
        }

        @media (max-width: 991px) {
          .login-visual-panel {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
