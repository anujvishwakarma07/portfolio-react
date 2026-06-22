import React, { useEffect, useState } from 'react';
import { API_BASE } from '../../config';

export default function AdminContent() {
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState({});
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Local state for all fields
  const [content, setContent] = useState({
    hero_status: '',
    hero_title: '',
    hero_desc: '',
    about_subheading: '',
    about_para1: '',
    about_para2: ''
  });

  const defaults = {
    hero_status: 'CSE Graduate · SDE Intern 2026 · Open to Full-time',
    hero_title: 'Full Stack Developer. I build backend systems and ship them.',
    hero_desc: 'Worked across Node.js, React, MongoDB, and Laravel to ship auth systems, real-time apps, and AI integrations.',
    about_subheading: 'CSE Graduate and Full Stack Developer. I design, build, and deploy MERN & Next.js applications with secure auth, real-time data, and AI-powered features.',
    about_para1: "I'm Anuj from UP, India, focused on building solid, backend-heavy full stack applications using Node.js, React, MongoDB, and Laravel. Over the last 2 years, I've shipped Havynlife and TanviqGPT, implementing secure auth, live Mapbox mapping, and OpenAI integrations.",
    about_para2: 'My approach: DB-first design, clean code, and optimization. If it breaks in production or runs slow, it\'s not done. Currently leveling up in DSA and system design.'
  };

  // Fetch current content values
  const fetchContent = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/content`);
      if (response.ok) {
        const data = await response.json();
        
        // Map list elements into localized state
        const stateMap = { ...defaults };
        data.forEach(item => {
          const stateKey = `${item.section}_${item.key}`;
          if (stateKey in stateMap) {
            stateMap[stateKey] = item.value;
          }
        });

        setContent(stateMap);
      } else {
        setErrorMsg('Failed to load page content variables.');
      }
    } catch (err) {
      setErrorMsg('Could not establish connection to backend database content API.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const handleInputChange = (e) => {
    setContent({ ...content, [e.target.name]: e.target.value });
    setErrorMsg('');
    setSuccessMsg('');
  };

  // Submit updates for a specific section
  const handleSaveSection = async (sectionName, keys) => {
    setActionLoading(prev => ({ ...prev, [sectionName]: true }));
    setErrorMsg('');
    setSuccessMsg('');

    const token = localStorage.getItem('admin_token');
    let hasFailed = false;

    try {
      // Save all keys in this section in parallel
      const savePromises = keys.map(key => {
        const stateKey = `${sectionName}_${key}`;
        const value = content[stateKey];
        return fetch(`${API_BASE}/api/content`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ section: sectionName, key, value })
        });
      });

      const responses = await Promise.all(savePromises);
      responses.forEach(res => {
        if (!res.ok) hasFailed = true;
      });

      if (!hasFailed) {
        setSuccessMsg(`Successfully saved ${sectionName.toUpperCase()} content modifications!`);
      } else {
        setErrorMsg('One or more fields failed to write to database.');
      }
    } catch (err) {
      setErrorMsg('Network error. Failed to save content.');
    } finally {
      setActionLoading(prev => ({ ...prev, [sectionName]: false }));
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', height: '40vh', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          border: '2px solid rgba(255,255,255,0.05)',
          borderTopColor: '#ffffff',
          animation: 'spin 1s linear infinite'
        }}></div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* Header */}
      <div>
        <h2 style={{ margin: '0 0 4px 0', fontWeight: 700, fontSize: '26px', letterSpacing: '-0.5px' }}>Page Content Editor</h2>
        <p style={{ margin: 0, color: '#71717a', fontSize: '14px' }}>Edit text headers, slogans, and body paragraphs shown on your portfolio pages</p>
      </div>

      {/* Global Alerts */}
      {successMsg && (
        <div style={{
          background: 'rgba(16, 185, 129, 0.1)',
          border: '1px solid rgba(16, 185, 129, 0.2)',
          color: '#34d399',
          padding: '16px',
          borderRadius: '12px',
          fontSize: '14px'
        }}>
          <i className="bi bi-check-circle-fill" style={{ marginRight: '8px' }}></i>
          {successMsg}
        </div>
      )}

      {errorMsg && (
        <div style={{
          background: 'rgba(239, 68, 68, 0.1)',
          border: '1px solid rgba(239, 68, 68, 0.2)',
          color: '#f87171',
          padding: '16px',
          borderRadius: '12px',
          fontSize: '14px'
        }}>
          <i className="bi bi-exclamation-triangle-fill" style={{ marginRight: '8px' }}></i>
          {errorMsg}
        </div>
      )}

      {/* Section Forms Wrapper */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
        
        {/* Section 1: Hero landing */}
        <div style={{
          background: 'rgba(15, 15, 18, 0.6)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          borderRadius: '16px',
          padding: '28px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>Hero Slogan & Intro</h4>
            <button 
              onClick={() => handleSaveSection('hero', ['status', 'title', 'desc'])}
              disabled={actionLoading['hero']}
              style={{
                background: '#ffffff',
                color: '#000000',
                border: 'none',
                borderRadius: '8px',
                padding: '8px 16px',
                fontWeight: 600,
                cursor: 'pointer',
                fontSize: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              {actionLoading['hero'] ? 'Saving...' : 'Save Hero Copy'}
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '11px', color: '#a1a1aa', marginBottom: '8px', fontWeight: 500 }}>
                STATUS TAG LINE (e.g. SDE Intern)
              </label>
              <input 
                type="text" 
                name="hero_status"
                value={content.hero_status}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '8px',
                  padding: '12px',
                  color: '#ffffff',
                  fontSize: '13px',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11px', color: '#a1a1aa', marginBottom: '8px', fontWeight: 500 }}>
                HERO MAIN TITLE
              </label>
              <input 
                type="text" 
                name="hero_title"
                value={content.hero_title}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '8px',
                  padding: '12px',
                  color: '#ffffff',
                  fontSize: '13px',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11px', color: '#a1a1aa', marginBottom: '8px', fontWeight: 500 }}>
                INTRO BRIEF DESCRIPTION
              </label>
              <textarea 
                name="hero_desc"
                value={content.hero_desc}
                onChange={handleInputChange}
                rows={3}
                style={{
                  width: '100%',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '8px',
                  padding: '12px',
                  color: '#ffffff',
                  fontSize: '13px',
                  outline: 'none',
                  resize: 'vertical'
                }}
              />
            </div>
          </div>
        </div>

        {/* Section 2: About Me */}
        <div style={{
          background: 'rgba(15, 15, 18, 0.6)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          borderRadius: '16px',
          padding: '28px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>About Me Descriptions</h4>
            <button 
              onClick={() => handleSaveSection('about', ['subheading', 'para1', 'para2'])}
              disabled={actionLoading['about']}
              style={{
                background: '#ffffff',
                color: '#000000',
                border: 'none',
                borderRadius: '8px',
                padding: '8px 16px',
                fontWeight: 600,
                cursor: 'pointer',
                fontSize: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              {actionLoading['about'] ? 'Saving...' : 'Save About Copy'}
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '11px', color: '#a1a1aa', marginBottom: '8px', fontWeight: 500 }}>
                ABOUT ME SUBHEADING
              </label>
              <textarea 
                name="about_subheading"
                value={content.about_subheading}
                onChange={handleInputChange}
                rows={2}
                style={{
                  width: '100%',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '8px',
                  padding: '12px',
                  color: '#ffffff',
                  fontSize: '13px',
                  outline: 'none',
                  resize: 'vertical'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11px', color: '#a1a1aa', marginBottom: '8px', fontWeight: 500 }}>
                ABOUT ME PARAGRAPH 1 (INTRO / BACKGROUND)
              </label>
              <textarea 
                name="about_para1"
                value={content.about_para1}
                onChange={handleInputChange}
                rows={4}
                style={{
                  width: '100%',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '8px',
                  padding: '12px',
                  color: '#ffffff',
                  fontSize: '13px',
                  outline: 'none',
                  resize: 'vertical'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11px', color: '#a1a1aa', marginBottom: '8px', fontWeight: 500 }}>
                ABOUT ME PARAGRAPH 2 (APPROACH / FOCUS)
              </label>
              <textarea 
                name="about_para2"
                value={content.about_para2}
                onChange={handleInputChange}
                rows={3}
                style={{
                  width: '100%',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '8px',
                  padding: '12px',
                  color: '#ffffff',
                  fontSize: '13px',
                  outline: 'none',
                  resize: 'vertical'
                }}
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
