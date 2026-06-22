import React, { useEffect, useState } from 'react';
import { API_BASE } from '../../config';

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Modal & form states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  const initialFormState = {
    title: '',
    subtitle: '',
    category: 'Web Development',
    image: '',
    year: '@2026',
    badge: '',
    githubUrl: '',
    liveUrl: ''
  };

  const [formData, setFormData] = useState(initialFormState);
  const [actionLoading, setActionLoading] = useState(false);

  // Fetch all projects
  const fetchProjects = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/projects`);
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      } else {
        setErrorMsg('Failed to load portfolio projects.');
      }
    } catch (err) {
      setErrorMsg('Cannot establish connection to backend portfolio API.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const openAddModal = () => {
    setFormData(initialFormState);
    setModalMode('add');
    setSelectedProjectId(null);
    setIsModalOpen(true);
    setErrorMsg('');
    setSuccessMsg('');
  };

  const openEditModal = (project) => {
    setFormData({
      title: project.title || '',
      subtitle: project.subtitle || '',
      category: project.category || 'Web Development',
      image: project.image || '',
      year: project.year || '@2026',
      badge: project.badge || '',
      githubUrl: project.githubUrl || '',
      liveUrl: project.liveUrl || ''
    });
    setModalMode('edit');
    setSelectedProjectId(project._id);
    setIsModalOpen(true);
    setErrorMsg('');
    setSuccessMsg('');
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData(initialFormState);
    setSelectedProjectId(null);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    const token = localStorage.getItem('admin_token');
    const method = modalMode === 'add' ? 'POST' : 'PUT';
    const url = modalMode === 'add' ? `${API_BASE}/api/projects` : `${API_BASE}/api/projects/${selectedProjectId}`;

    // Clean image empty string to fallback default in model
    const payload = { ...formData };
    if (!payload.image) {
      delete payload.image; // Let mongoose model select its default value
    }

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMsg(modalMode === 'add' ? 'Project created successfully!' : 'Project updated successfully!');
        fetchProjects(); // Reload list
        closeModal();
      } else {
        setErrorMsg(data.error || 'Failed to submit project request.');
      }
    } catch (err) {
      setErrorMsg('Server connection failed. Could not write project data.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteProject = async (projectId) => {
    if (!window.confirm('Are you absolutely sure you want to delete this project?')) return;

    setErrorMsg('');
    setSuccessMsg('');
    const token = localStorage.getItem('admin_token');

    try {
      const response = await fetch(`${API_BASE}/api/projects/${projectId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setSuccessMsg('Project removed successfully!');
        fetchProjects(); // Reload list
      } else {
        const data = await response.json();
        setErrorMsg(data.error || 'Failed to delete project.');
      }
    } catch (err) {
      setErrorMsg('Server connection error. Failed to execute deletion.');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ margin: '0 0 4px 0', fontWeight: 700, fontSize: '26px', letterSpacing: '-0.5px' }}>Manage Projects</h2>
          <p style={{ margin: 0, color: '#71717a', fontSize: '14px' }}>Add, update, or remove projects shown on your portfolio</p>
        </div>
        <button 
          onClick={openAddModal}
          style={{
            background: '#ffffff',
            color: '#000000',
            border: 'none',
            borderRadius: '8px',
            padding: '12px 20px',
            fontWeight: 600,
            cursor: 'pointer',
            fontSize: '13px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'transform 0.2s',
            boxShadow: '0 4px 15px rgba(255, 255, 255, 0.1)'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-1px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}
        >
          <i className="bi bi-plus-lg"></i>
          Add Project
        </button>
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
          <i className="bi bi-check-circle" style={{ marginRight: '8px' }}></i>
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
          <i className="bi bi-exclamation-triangle" style={{ marginRight: '8px' }}></i>
          {errorMsg}
        </div>
      )}

      {/* Projects Table */}
      {loading ? (
        <div style={{ display: 'flex', height: '40vh', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            border: '2px solid rgba(255,255,255,0.05)',
            borderTopColor: '#ffffff',
            animation: 'spin 1s linear infinite'
          }}></div>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      ) : projects.length === 0 ? (
        <div style={{
          padding: '60px 20px',
          background: 'rgba(15,15,18,0.6)',
          border: '1px dashed rgba(255,255,255,0.05)',
          borderRadius: '16px',
          textAlign: 'center'
        }}>
          <i className="bi bi-folder" style={{ fontSize: '36px', color: '#3f3f46', marginBottom: '12px', display: 'inline-block' }}></i>
          <p style={{ margin: '0 0 16px 0', color: '#a1a1aa' }}>No projects found in database</p>
          <button 
            onClick={openAddModal}
            style={{
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#ffffff',
              padding: '10px 20px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 500,
              fontSize: '13px'
            }}
          >
            Create First Project
          </button>
        </div>
      ) : (
        <div style={{
          background: 'rgba(15, 15, 18, 0.6)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          borderRadius: '16px',
          overflow: 'hidden'
        }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.01)' }}>
                  <th style={{ padding: '16px 20px', color: '#71717a', fontWeight: 500 }}>Preview</th>
                  <th style={{ padding: '16px 20px', color: '#71717a', fontWeight: 500 }}>Title / Subtitle</th>
                  <th style={{ padding: '16px 20px', color: '#71717a', fontWeight: 500 }}>Category</th>
                  <th style={{ padding: '16px 20px', color: '#71717a', fontWeight: 500 }}>Badge / Year</th>
                  <th style={{ padding: '16px 20px', color: '#71717a', fontWeight: 500 }}>External Links</th>
                  <th style={{ padding: '16px 20px', color: '#71717a', fontWeight: 500, textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)', verticalAlign: 'middle' }}>
                    
                    {/* Image Preview */}
                    <td style={{ padding: '16px 20px' }}>
                      <div style={{
                        width: '80px',
                        height: '50px',
                        borderRadius: '6px',
                        overflow: 'hidden',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.05)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <img 
                          src={project.image || '/assets/img/blog/havynlife.png'} 
                          alt={project.title}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          onError={(e) => { e.target.src = '/assets/img/blog/havynlife.png'; }}
                        />
                      </div>
                    </td>

                    {/* Title */}
                    <td style={{ padding: '16px 20px' }}>
                      <div style={{ fontWeight: 600, fontSize: '15px' }}>{project.title}</div>
                      <div style={{ color: '#71717a', fontSize: '12px', marginTop: '2px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: '200px' }}>
                        {project.subtitle || '—'}
                      </div>
                    </td>

                    {/* Category */}
                    <td style={{ padding: '16px 20px' }}>
                      <span style={{
                        background: 'rgba(59, 130, 246, 0.1)',
                        color: '#60a5fa',
                        padding: '4px 8px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: 500
                      }}>
                        {project.category}
                      </span>
                    </td>

                    {/* Badge / Year */}
                    <td style={{ padding: '16px 20px' }}>
                      {project.badge ? (
                        <span style={{
                          background: 'rgba(255, 255, 255, 0.05)',
                          color: '#ffffff',
                          padding: '3px 8px',
                          borderRadius: '6px',
                          fontSize: '11px',
                          marginRight: '8px'
                        }}>{project.badge}</span>
                      ) : null}
                      <span style={{ color: '#71717a', fontSize: '13px' }}>{project.year}</span>
                    </td>

                    {/* Links */}
                    <td style={{ padding: '16px 20px' }}>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        {project.githubUrl ? (
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#a1a1aa' }} title="GitHub Repo">
                            <i className="bi bi-github" style={{ fontSize: '18px' }}></i>
                          </a>
                        ) : <span style={{ color: '#3f3f46' }}>—</span>}
                        {project.liveUrl ? (
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#a1a1aa' }} title="Live Demo">
                            <i className="bi bi-link-45deg" style={{ fontSize: '18px' }}></i>
                          </a>
                        ) : null}
                      </div>
                    </td>

                    {/* Actions */}
                    <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '8px' }}>
                        <button 
                          onClick={() => openEditModal(project)}
                          style={{
                            background: 'rgba(255,255,255,0.04)',
                            border: '1px solid rgba(255,255,255,0.05)',
                            borderRadius: '6px',
                            color: '#ffffff',
                            width: '32px',
                            height: '32px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'background 0.2s'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                          onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
                        >
                          <i className="bi bi-pencil-fill" style={{ fontSize: '12px' }}></i>
                        </button>
                        <button 
                          onClick={() => handleDeleteProject(project._id)}
                          style={{
                            background: 'rgba(239, 68, 68, 0.05)',
                            border: '1px solid rgba(239, 68, 68, 0.1)',
                            borderRadius: '6px',
                            color: '#ef4444',
                            width: '32px',
                            height: '32px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'background 0.2s'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'}
                          onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.05)'}
                        >
                          <i className="bi bi-trash-fill" style={{ fontSize: '12px' }}></i>
                        </button>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add / Edit Form Modal */}
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(9, 9, 11, 0.8)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div style={{
            width: '100%',
            maxWidth: '600px',
            background: '#18181b',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            borderRadius: '16px',
            padding: '32px',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
            position: 'relative'
          }}>
            {/* Close */}
            <button 
              onClick={closeModal}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'transparent',
                border: 'none',
                color: '#71717a',
                fontSize: '20px',
                cursor: 'pointer'
              }}
            >
              <i className="bi bi-x-lg"></i>
            </button>

            <h4 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: 600 }}>
              {modalMode === 'add' ? 'Add New Project' : 'Edit Project'}
            </h4>
            <p style={{ margin: '0 0 24px 0', fontSize: '13px', color: '#71717a' }}>
              Fill in the metadata variables for the work entry.
            </p>

            <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                
                {/* Title */}
                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: '#a1a1aa', marginBottom: '6px', fontWeight: 500 }}>
                    PROJECT TITLE *
                  </label>
                  <input 
                    type="text" 
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g. Portfolio React"
                    required
                    style={{
                      width: '100%',
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '8px',
                      padding: '10px 14px',
                      color: '#ffffff',
                      fontSize: '13px',
                      outline: 'none'
                    }}
                  />
                </div>

                {/* Subtitle */}
                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: '#a1a1aa', marginBottom: '6px', fontWeight: 500 }}>
                    SUBTITLE / DESCRIPTION
                  </label>
                  <input 
                    type="text" 
                    name="subtitle"
                    value={formData.subtitle}
                    onChange={handleInputChange}
                    placeholder="e.g. Modern responsive profile page"
                    style={{
                      width: '100%',
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '8px',
                      padding: '10px 14px',
                      color: '#ffffff',
                      fontSize: '13px',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                
                {/* Category */}
                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: '#a1a1aa', marginBottom: '6px', fontWeight: 500 }}>
                    CATEGORY *
                  </label>
                  <select 
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      background: '#27272a',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '8px',
                      padding: '10px 14px',
                      color: '#ffffff',
                      fontSize: '13px',
                      outline: 'none'
                    }}
                  >
                    <option value="Web Development">Web Development</option>
                    <option value="Mobile Applications">Mobile Applications</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="Open Source">Open Source</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Badge */}
                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: '#a1a1aa', marginBottom: '6px', fontWeight: 500 }}>
                    BADGE TAG
                  </label>
                  <input 
                    type="text" 
                    name="badge"
                    value={formData.badge}
                    onChange={handleInputChange}
                    placeholder="e.g. Featured, React, Hot"
                    style={{
                      width: '100%',
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '8px',
                      padding: '10px 14px',
                      color: '#ffffff',
                      fontSize: '13px',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
                
                {/* Image URL */}
                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: '#a1a1aa', marginBottom: '6px', fontWeight: 500 }}>
                    IMAGE URL
                  </label>
                  <input 
                    type="text" 
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    placeholder="e.g. /assets/img/... or Web URL"
                    style={{
                      width: '100%',
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '8px',
                      padding: '10px 14px',
                      color: '#ffffff',
                      fontSize: '13px',
                      outline: 'none'
                    }}
                  />
                </div>

                {/* Year */}
                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: '#a1a1aa', marginBottom: '6px', fontWeight: 500 }}>
                    YEAR
                  </label>
                  <input 
                    type="text" 
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    placeholder="e.g. @2026"
                    style={{
                      width: '100%',
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '8px',
                      padding: '10px 14px',
                      color: '#ffffff',
                      fontSize: '13px',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                
                {/* Github Link */}
                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: '#a1a1aa', marginBottom: '6px', fontWeight: 500 }}>
                    GITHUB REPOSITORY URL
                  </label>
                  <input 
                    type="url" 
                    name="githubUrl"
                    value={formData.githubUrl}
                    onChange={handleInputChange}
                    placeholder="https://github.com/..."
                    style={{
                      width: '100%',
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '8px',
                      padding: '10px 14px',
                      color: '#ffffff',
                      fontSize: '13px',
                      outline: 'none'
                    }}
                  />
                </div>

                {/* Live Link */}
                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: '#a1a1aa', marginBottom: '6px', fontWeight: 500 }}>
                    LIVE DEMO URL
                  </label>
                  <input 
                    type="url" 
                    name="liveUrl"
                    value={formData.liveUrl}
                    onChange={handleInputChange}
                    placeholder="https://..."
                    style={{
                      width: '100%',
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '8px',
                      padding: '10px 14px',
                      color: '#ffffff',
                      fontSize: '13px',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', justifySelf: 'end', gap: '12px', marginTop: '16px' }}>
                <button 
                  type="button" 
                  onClick={closeModal}
                  style={{
                    background: 'transparent',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '8px',
                    padding: '10px 18px',
                    color: '#ffffff',
                    fontSize: '13px',
                    cursor: 'pointer',
                    fontWeight: 500
                  }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={actionLoading}
                  style={{
                    background: '#ffffff',
                    color: '#000000',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '10px 18px',
                    fontSize: '13px',
                    cursor: 'pointer',
                    fontWeight: 600,
                    boxShadow: '0 4px 10px rgba(255, 255, 255, 0.1)'
                  }}
                >
                  {actionLoading ? 'Saving...' : 'Save Project'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
