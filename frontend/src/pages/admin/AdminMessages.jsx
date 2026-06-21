import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all', 'unread', 'read'
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Selected message detail view modal
  const [selectedMessage, setSelectedMessage] = useState(null);

  const fetchMessages = async () => {
    const token = localStorage.getItem('admin_token');
    try {
      const response = await fetch('/api/messages', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      } else {
        setErrorMsg('Failed to fetch contact submissions.');
      }
    } catch (err) {
      setErrorMsg('Could not establish connection to backend messages API.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();

    // Connect to WebSocket server for real-time inbox updates
    const socketUrl = import.meta.env.DEV ? 'http://localhost:5000' : window.location.origin;
    const socket = io(socketUrl, {
      transports: ['websocket', 'polling']
    });

    socket.on('connect', () => {
      socket.emit('admin-join');
    });

    socket.on('new-message', (newMessage) => {
      setMessages(prev => [newMessage, ...prev]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleMarkAsRead = async (id, isRead) => {
    const token = localStorage.getItem('admin_token');
    try {
      const response = await fetch(`/api/messages/${id}/read`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ isRead })
      });

      if (response.ok) {
        // Update local list state
        setMessages(messages.map(m => m._id === id ? { ...m, isRead } : m));
        // If selected in modal, update that as well
        if (selectedMessage && selectedMessage._id === id) {
          setSelectedMessage({ ...selectedMessage, isRead });
        }
      }
    } catch (err) {
      console.error('Failed to toggle read status:', err);
    }
  };

  const handleDeleteMessage = async (id, e) => {
    if (e) e.stopPropagation(); // Stop row click propagation if deleted from list button
    if (!window.confirm('Delete this message permanently?')) return;

    const token = localStorage.getItem('admin_token');
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const response = await fetch(`/api/messages/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setSuccessMsg('Message deleted successfully.');
        setMessages(messages.filter(m => m._id !== id));
        if (selectedMessage && selectedMessage._id === id) {
          setSelectedMessage(null);
        }
      } else {
        setErrorMsg('Failed to delete message.');
      }
    } catch (err) {
      setErrorMsg('Server connection failed. Could not execute deletion.');
    }
  };

  const handleOpenMessage = (msg) => {
    setSelectedMessage(msg);
    if (!msg.isRead) {
      handleMarkAsRead(msg._id, true);
    }
  };

  // Apply filters
  const filteredMessages = messages.filter(m => {
    if (filter === 'unread') return !m.isRead;
    if (filter === 'read') return m.isRead;
    return true;
  });

  const unreadCount = messages.filter(m => !m.isRead).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ margin: '0 0 4px 0', fontWeight: 700, fontSize: '26px', letterSpacing: '-0.5px' }}>Messages Inbox</h2>
          <p style={{ margin: 0, color: '#71717a', fontSize: '14px' }}>Review contact form inquiries submitted by your portfolio visitors</p>
        </div>

        {/* Filter controls */}
        <div style={{
          display: 'flex',
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          borderRadius: '8px',
          padding: '4px'
        }}>
          {['all', 'unread', 'read'].map(type => (
            <button 
              key={type} 
              onClick={() => setFilter(type)}
              style={{
                padding: '6px 14px',
                background: filter === type ? '#ffffff' : 'transparent',
                color: filter === type ? '#000000' : '#a1a1aa',
                border: 'none',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 500,
                cursor: 'pointer',
                textTransform: 'capitalize',
                transition: 'all 0.2s'
              }}
            >
              {type} {type === 'unread' && unreadCount > 0 ? `(${unreadCount})` : ''}
            </button>
          ))}
        </div>
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

      {/* Message List */}
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
      ) : filteredMessages.length === 0 ? (
        <div style={{
          padding: '60px 20px',
          background: 'rgba(15,15,18,0.6)',
          border: '1px dashed rgba(255,255,255,0.05)',
          borderRadius: '16px',
          textAlign: 'center'
        }}>
          <i className="bi bi-envelope-open" style={{ fontSize: '36px', color: '#3f3f46', marginBottom: '12px', display: 'inline-block' }}></i>
          <p style={{ margin: 0, color: '#a1a1aa', fontSize: '14px' }}>
            No {filter !== 'all' ? filter : ''} messages in your inbox
          </p>
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
                  <th style={{ padding: '16px 20px', width: '40px' }}></th>
                  <th style={{ padding: '16px 20px', color: '#71717a', fontWeight: 500 }}>Sender</th>
                  <th style={{ padding: '16px 20px', color: '#71717a', fontWeight: 500 }}>Subject</th>
                  <th style={{ padding: '16px 20px', color: '#71717a', fontWeight: 500 }}>Snippet</th>
                  <th style={{ padding: '16px 20px', color: '#71717a', fontWeight: 500 }}>Received</th>
                  <th style={{ padding: '16px 20px', color: '#71717a', fontWeight: 500, textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMessages.map((msg) => {
                  const dateObj = new Date(msg.createdAt);
                  const formattedTime = dateObj.toLocaleDateString() + ' ' + dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                  return (
                    <tr 
                      key={msg._id} 
                      onClick={() => handleOpenMessage(msg)}
                      style={{ 
                        borderBottom: '1px solid rgba(255,255,255,0.02)', 
                        verticalAlign: 'middle',
                        cursor: 'pointer',
                        background: !msg.isRead ? 'rgba(255,255,255,0.01)' : 'transparent',
                        fontWeight: !msg.isRead ? 600 : 400
                      }}
                      className="message-row"
                    >
                      {/* Read status icon */}
                      <td style={{ padding: '16px 0 16px 20px' }}>
                        {!msg.isRead ? (
                          <span style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            background: '#3b82f6',
                            display: 'inline-block',
                            boxShadow: '0 0 6px #3b82f6'
                          }}></span>
                        ) : null}
                      </td>

                      {/* Sender */}
                      <td style={{ padding: '16px 20px' }}>
                        <div>{msg.name}</div>
                        <div style={{ fontSize: '11px', color: '#71717a', fontWeight: 400 }}>{msg.email}</div>
                      </td>

                      {/* Subject */}
                      <td style={{ padding: '16px 20px', color: !msg.isRead ? '#ffffff' : '#e4e4e7' }}>
                        {msg.subject}
                      </td>

                      {/* Message Snippet */}
                      <td style={{ padding: '16px 20px', color: '#71717a', fontSize: '13px' }}>
                        <div style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: '280px', fontWeight: 400 }}>
                          {msg.message}
                        </div>
                      </td>

                      {/* Received Time */}
                      <td style={{ padding: '16px 20px', color: '#71717a', whiteSpace: 'nowrap', fontSize: '13px', fontWeight: 400 }}>
                        {formattedTime}
                      </td>

                      {/* Actions */}
                      <td style={{ padding: '16px 20px', textAlign: 'right' }} onClick={(e) => e.stopPropagation()}>
                        <div style={{ display: 'inline-flex', gap: '8px' }}>
                          <button 
                            onClick={() => handleMarkAsRead(msg._id, !msg.isRead)}
                            style={{
                              background: 'rgba(255,255,255,0.04)',
                              border: '1px solid rgba(255,255,255,0.05)',
                              borderRadius: '6px',
                              color: '#a1a1aa',
                              width: '32px',
                              height: '32px',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                            title={msg.isRead ? 'Mark as Unread' : 'Mark as Read'}
                          >
                            <i className={msg.isRead ? 'bi bi-envelope' : 'bi bi-envelope-open'}></i>
                          </button>
                          <button 
                            onClick={(e) => handleDeleteMessage(msg._id, e)}
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
                              justifyContent: 'center'
                            }}
                          >
                            <i className="bi bi-trash-fill" style={{ fontSize: '12px' }}></i>
                          </button>
                        </div>
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Message View Modal */}
      {selectedMessage && (
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
            maxWidth: '560px',
            background: '#18181b',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            borderRadius: '16px',
            padding: '32px',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
            position: 'relative'
          }}>
            {/* Close */}
            <button 
              onClick={() => setSelectedMessage(null)}
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

            {/* Modal Content */}
            <div style={{ marginBottom: '24px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '16px' }}>
              <span style={{ fontSize: '11px', background: 'rgba(59, 130, 246, 0.1)', color: '#60a5fa', padding: '4px 8px', borderRadius: '6px', fontWeight: 600, textTransform: 'uppercase' }}>
                Contact Inquiry
              </span>
              <h4 style={{ margin: '14px 0 6px 0', fontSize: '18px', fontWeight: 600 }}>{selectedMessage.subject}</h4>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '13px', color: '#a1a1aa', marginTop: '12px' }}>
                <div>
                  <strong style={{ color: '#ffffff' }}>From:</strong> {selectedMessage.name} ({selectedMessage.email})
                </div>
                <div>
                  <strong style={{ color: '#ffffff' }}>Date:</strong> {new Date(selectedMessage.createdAt).toLocaleString()}
                </div>
              </div>
            </div>

            <div style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.04)',
              borderRadius: '8px',
              padding: '20px',
              fontSize: '14px',
              lineHeight: 1.6,
              color: '#e4e4e7',
              whiteSpace: 'pre-wrap',
              maxHeight: '240px',
              overflowY: 'auto',
              marginBottom: '28px'
            }}>
              {selectedMessage.message}
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button 
                onClick={() => handleDeleteMessage(selectedMessage._id)}
                style={{
                  background: 'rgba(239, 68, 68, 0.05)',
                  border: '1px solid rgba(239, 68, 68, 0.1)',
                  color: '#ef4444',
                  padding: '10px 18px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: 500
                }}
              >
                <i className="bi bi-trash-fill" style={{ marginRight: '6px' }}></i>
                Delete
              </button>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button 
                  onClick={() => handleMarkAsRead(selectedMessage._id, !selectedMessage.isRead)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: '#ffffff',
                    padding: '10px 18px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: 500
                  }}
                >
                  Mark as {selectedMessage.isRead ? 'Unread' : 'Read'}
                </button>
                <button 
                  onClick={() => setSelectedMessage(null)}
                  style={{
                    background: '#ffffff',
                    color: '#000000',
                    border: 'none',
                    padding: '10px 18px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: 600
                  }}
                >
                  Close
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Row hover background rules injected */}
      <style>{`
        .message-row:hover {
          background: rgba(255,255,255,0.02) !important;
        }
      `}</style>
    </div>
  );
}
