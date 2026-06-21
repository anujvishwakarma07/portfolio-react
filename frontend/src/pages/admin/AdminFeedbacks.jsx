import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export default function AdminFeedbacks() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [actionLoadingId, setActionLoadingId] = useState(null);

  // Fetch all feedbacks
  const fetchFeedbacks = async () => {
    const token = localStorage.getItem('admin_token');
    try {
      const response = await fetch('/api/feedback', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setFeedbacks(data);
      } else {
        setErrorMsg('Failed to load visitor feedbacks.');
      }
    } catch (err) {
      setErrorMsg('Cannot establish connection to backend feedback database API.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();

    // Establish WebSocket subscription for live review prepending
    const socketUrl = import.meta.env.DEV ? 'http://localhost:5000' : window.location.origin;
    const socket = io(socketUrl, {
      transports: ['websocket', 'polling']
    });

    socket.on('connect', () => {
      socket.emit('admin-join');
    });

    socket.on('new-feedback', (newFb) => {
      setFeedbacks(prev => [newFb, ...prev]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleToggleApprove = async (id, currentApproved) => {
    setActionLoadingId(id);
    setErrorMsg('');
    setSuccessMsg('');

    const token = localStorage.getItem('admin_token');
    const newApprovedState = !currentApproved;

    try {
      const response = await fetch(`/api/feedback/${id}/approve`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ approved: newApprovedState })
      });

      if (response.ok) {
        setFeedbacks(feedbacks.map(f => f._id === id ? { ...f, approved: newApprovedState } : f));
        setSuccessMsg(newApprovedState ? 'Feedback approved and published to homepage testimonials!' : 'Feedback unpublished from homepage.');
      } else {
        setErrorMsg('Failed to update feedback approval state.');
      }
    } catch (err) {
      setErrorMsg('Server connection failed. Could not write approval change.');
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleDeleteFeedback = async (id) => {
    if (!window.confirm('Delete this feedback permanently?')) return;

    setErrorMsg('');
    setSuccessMsg('');
    const token = localStorage.getItem('admin_token');

    try {
      const response = await fetch(`/api/feedback/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setFeedbacks(feedbacks.filter(f => f._id !== id));
        setSuccessMsg('Feedback review deleted successfully.');
      } else {
        setErrorMsg('Failed to delete feedback.');
      }
    } catch (err) {
      setErrorMsg('Server connection error. Failed to execute deletion.');
    }
  };

  // Helper to render star rating icons
  const renderStars = (rating) => {
    return (
      <div style={{ display: 'inline-flex', gap: '3px', color: '#f59e0b', fontSize: '13px' }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <i key={i} className={i < rating ? "bi bi-star-fill" : "bi bi-star"}></i>
        ))}
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* Header */}
      <div>
        <h2 style={{ margin: '0 0 4px 0', fontWeight: 700, fontSize: '26px', letterSpacing: '-0.5px' }}>Visitor Reviews</h2>
        <p style={{ margin: 0, color: '#71717a', fontSize: '14px' }}>Review portfolio ratings and approve feedback to list them as testimonials on your site</p>
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

      {/* Reviews Table */}
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
        </div>
      ) : feedbacks.length === 0 ? (
        <div style={{
          padding: '60px 20px',
          background: 'rgba(15,15,18,0.6)',
          border: '1px dashed rgba(255,255,255,0.05)',
          borderRadius: '16px',
          textAlign: 'center'
        }}>
          <i className="bi bi-star-half" style={{ fontSize: '36px', color: '#3f3f46', marginBottom: '12px', display: 'inline-block' }}></i>
          <p style={{ margin: 0, color: '#a1a1aa', fontSize: '14px' }}>No visitor feedbacks submitted yet.</p>
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
                  <th style={{ padding: '16px 20px', color: '#71717a', fontWeight: 500 }}>Reviewer</th>
                  <th style={{ padding: '16px 20px', color: '#71717a', fontWeight: 500 }}>Rating Score</th>
                  <th style={{ padding: '16px 20px', color: '#71717a', fontWeight: 500 }}>Comments</th>
                  <th style={{ padding: '16px 20px', color: '#71717a', fontWeight: 500 }}>Submitted</th>
                  <th style={{ padding: '16px 20px', color: '#71717a', fontWeight: 500, textAlign: 'center' }}>Show on Site</th>
                  <th style={{ padding: '16px 20px', color: '#71717a', fontWeight: 500, textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {feedbacks.map((fb) => {
                  const dateObj = new Date(fb.createdAt);
                  const formattedTime = dateObj.toLocaleDateString() + ' ' + dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                  return (
                    <tr key={fb._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)', verticalAlign: 'middle' }}>
                      
                      {/* Reviewer Details */}
                      <td style={{ padding: '16px 20px' }}>
                        <div style={{ fontWeight: 600 }}>{fb.name}</div>
                        <div style={{ fontSize: '11px', color: '#71717a' }}>{fb.role}</div>
                      </td>

                      {/* Rating */}
                      <td style={{ padding: '16px 20px', whiteSpace: 'nowrap' }}>
                        {renderStars(fb.rating)}
                      </td>

                      {/* Comment Message */}
                      <td style={{ padding: '16px 20px', maxWidth: '300px', lineHeight: 1.5 }}>
                        <div style={{ wordBreak: 'break-word', fontSize: '13px', color: '#e4e4e7' }}>{fb.message}</div>
                      </td>

                      {/* Date */}
                      <td style={{ padding: '16px 20px', color: '#71717a', whiteSpace: 'nowrap', fontSize: '13px' }}>
                        {formattedTime}
                      </td>

                      {/* Approval Toggle */}
                      <td style={{ padding: '16px 20px', textAlign: 'center' }}>
                        <button
                          onClick={() => handleToggleApprove(fb._id, fb.approved)}
                          disabled={actionLoadingId === fb._id}
                          style={{
                            background: fb.approved ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                            border: fb.approved ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(255, 255, 255, 0.08)',
                            color: fb.approved ? '#34d399' : '#a1a1aa',
                            padding: '6px 14px',
                            borderRadius: '20px',
                            fontSize: '12px',
                            fontWeight: 500,
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px'
                          }}
                        >
                          <i className={fb.approved ? "bi bi-eye-fill" : "bi bi-eye-slash-fill"}></i>
                          {fb.approved ? 'Live (Testimonial)' : 'Hidden'}
                        </button>
                      </td>

                      {/* Delete Action */}
                      <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                        <button 
                          onClick={() => handleDeleteFeedback(fb._id)}
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
                            transition: 'background 0.2s',
                            marginLeft: 'auto'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'}
                          onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.05)'}
                        >
                          <i className="bi bi-trash-fill" style={{ fontSize: '12px' }}></i>
                        </button>
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Embedded CSS Animations */}
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
