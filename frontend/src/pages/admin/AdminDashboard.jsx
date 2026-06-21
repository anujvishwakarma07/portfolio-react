import React, { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';
import Chart from 'chart.js/auto';

export default function AdminDashboard() {
  const [activeUsers, setActiveUsers] = useState([]);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [toast, setToast] = useState({ show: false, title: '', name: '', detail: '', icon: '' });

  // Chart Canvas Refs
  const lineChartRef = useRef(null);
  const browserChartRef = useRef(null);
  const deviceChartRef = useRef(null);
  const pageChartRef = useRef(null);

  // Fetch metrics data
  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch('/api/analytics/dashboard', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setDashboardData(data);
      } else {
        const errData = await response.json();
        setErrorMsg(errData.error || 'Failed to fetch dashboard statistics.');
      }
    } catch (err) {
      setErrorMsg('Failed to connect to backend server analytics API.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();

    // Setup Socket.io client for real-time tracking
    const socketUrl = import.meta.env.DEV ? 'http://localhost:5000' : window.location.origin;
    const socket = io(socketUrl, {
      transports: ['websocket', 'polling']
    });

    socket.on('connect', () => {
      socket.emit('admin-join');
    });

    socket.on('active-users-update', (users) => {
      setActiveUsers(users);
    });

    // Listen for new incoming messages from visitors in real-time
    socket.on('new-message', (msg) => {
      // 1. Update unread metrics instantly
      setDashboardData(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          metrics: {
            ...prev.metrics,
            unreadMessages: prev.metrics.unreadMessages + 1
          }
        };
      });

      // 2. Trigger toast notification
      setToast({ 
        show: true, 
        title: 'NEW INQUIRY RECEIVED', 
        name: msg.name, 
        detail: msg.subject,
        icon: 'bi-chat-left-dots-fill'
      });
      
      // Auto-hide toast after 6 seconds
      setTimeout(() => {
        setToast(t => ({ ...t, show: false }));
      }, 6000);
    });

    // Listen for new incoming feedbacks in real-time
    socket.on('new-feedback', (fb) => {
      setToast({ 
        show: true, 
        title: 'NEW FEEDBACK RECEIVED', 
        name: fb.name, 
        detail: `Rated: ${'★'.repeat(fb.rating)}${'☆'.repeat(5 - fb.rating)}`,
        icon: 'bi-star-fill'
      });
      
      // Auto-hide toast after 6 seconds
      setTimeout(() => {
        setToast(t => ({ ...t, show: false }));
      }, 6000);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // Render Charts when dashboardData updates
  useEffect(() => {
    if (!dashboardData) return;

    const chartInstances = [];

    // 1. Line Chart (Views vs Visitors)
    if (lineChartRef.current) {
      const ctx = lineChartRef.current.getContext('2d');
      const lineChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: dashboardData.trend.map(t => {
            const dateParts = t.date.split('-');
            return `${dateParts[1]}/${dateParts[2]}`; // MM/DD Format
          }),
          datasets: [
            {
              label: 'Page Views',
              data: dashboardData.trend.map(t => t.views),
              borderColor: '#ffffff',
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              tension: 0.3,
              fill: true,
              borderWidth: 2,
              pointBackgroundColor: '#ffffff'
            },
            {
              label: 'Unique Visitors',
              data: dashboardData.trend.map(t => t.visitors),
              borderColor: '#10b981',
              backgroundColor: 'rgba(16, 185, 129, 0.03)',
              tension: 0.3,
              fill: true,
              borderWidth: 2,
              pointBackgroundColor: '#10b981'
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: { color: '#a1a1aa', font: { family: 'Inter', size: 11 } }
            }
          },
          scales: {
            x: {
              grid: { color: 'rgba(255, 255, 255, 0.04)' },
              ticks: { color: '#71717a', font: { size: 10 } }
            },
            y: {
              grid: { color: 'rgba(255, 255, 255, 0.04)' },
              ticks: { color: '#71717a', font: { size: 10 }, stepSize: 1 }
            }
          }
        }
      });
      chartInstances.push(lineChart);
    }

    // 2. Browser Doughnut
    if (browserChartRef.current) {
      const ctx = browserChartRef.current.getContext('2d');
      const browserChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: dashboardData.browserBreakdown.map(b => b.name),
          datasets: [{
            data: dashboardData.browserBreakdown.map(b => b.value),
            backgroundColor: ['#ffffff', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'],
            borderWidth: 0,
            hoverOffset: 4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: { color: '#a1a1aa', font: { size: 10 } }
            }
          },
          cutout: '70%'
        }
      });
      chartInstances.push(browserChart);
    }

    // 3. Device Doughnut
    if (deviceChartRef.current) {
      const ctx = deviceChartRef.current.getContext('2d');
      const deviceChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: dashboardData.deviceBreakdown.map(d => d.name),
          datasets: [{
            data: dashboardData.deviceBreakdown.map(d => d.value),
            backgroundColor: ['#ffffff', '#3b82f6', '#10b981'],
            borderWidth: 0,
            hoverOffset: 4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: { color: '#a1a1aa', font: { size: 10 } }
            }
          },
          cutout: '70%'
        }
      });
      chartInstances.push(deviceChart);
    }

    // 4. Top Pages Bar Chart
    if (pageChartRef.current) {
      const ctx = pageChartRef.current.getContext('2d');
      const pageChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: dashboardData.topPages.map(p => p.path),
          datasets: [{
            data: dashboardData.topPages.map(p => p.count),
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            borderRadius: 4,
            barThickness: 16
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          indexAxis: 'y',
          plugins: {
            legend: { display: false }
          },
          scales: {
            x: {
              grid: { color: 'rgba(255, 255, 255, 0.04)' },
              ticks: { color: '#71717a', font: { size: 10 }, stepSize: 1 }
            },
            y: {
              grid: { display: false },
              ticks: { color: '#a1a1aa', font: { size: 11 } }
            }
          }
        }
      });
      chartInstances.push(pageChart);
    }

    // Clean up chart references on reload/unmount
    return () => {
      chartInstances.forEach(chart => chart.destroy());
    };
  }, [dashboardData]);

  if (loading) {
    return (
      <div style={{ display: 'flex', height: '60vh', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '16px' }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          border: '3px solid rgba(255, 255, 255, 0.05)',
          borderTopColor: '#ffffff',
          animation: 'spin 1s linear infinite'
        }}></div>
        <span style={{ color: '#a1a1aa', fontSize: '14px' }}>Compiling analytics...</span>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (errorMsg) {
    return (
      <div style={{
        background: 'rgba(239, 68, 68, 0.05)',
        border: '1px solid rgba(239, 68, 68, 0.1)',
        padding: '24px',
        borderRadius: '12px',
        textAlign: 'center',
        color: '#f87171'
      }}>
        <i className="bi bi-exclamation-triangle-fill" style={{ fontSize: '32px', marginBottom: '12px', display: 'inline-block' }}></i>
        <h5>Connection Error</h5>
        <p style={{ margin: '0 0 16px 0', fontSize: '14px', color: '#a1a1aa' }}>{errorMsg}</p>
        <button 
          onClick={() => { setLoading(true); fetchDashboardData(); }}
          style={{
            background: '#ffffff',
            color: '#000000',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '8px',
            fontWeight: 600,
            cursor: 'pointer',
            fontSize: '13px'
          }}
        >
          Retry Connection
        </button>
      </div>
    );
  }

  const { metrics } = dashboardData;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* Page Header */}
      <div>
        <h2 style={{ margin: '0 0 4px 0', fontWeight: 700, fontSize: '26px', letterSpacing: '-0.5px' }}>Dashboard Overview</h2>
        <p style={{ margin: 0, color: '#71717a', fontSize: '14px' }}>Real-time telemetry and audience demographics</p>
      </div>

      {/* Core KPI Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '24px'
      }}>
        
        {/* Card 1: Active Users */}
        <div style={{
          background: 'rgba(15, 15, 18, 0.6)',
          border: '1px solid rgba(16, 185, 129, 0.15)',
          borderRadius: '16px',
          padding: '24px',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 4px 20px rgba(16, 185, 129, 0.05)'
        }}>
          <div style={{
            position: 'absolute',
            width: '100px',
            height: '100px',
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.05) 0%, rgba(0,0,0,0) 70%)',
            top: '-20px',
            right: '-20px',
            pointerEvents: 'none'
          }}></div>
          <span style={{ fontSize: '12px', color: '#10b981', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
            <span style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: '#10b981',
              display: 'inline-block',
              animation: 'pulse 1.5s infinite'
            }}></span>
            ACTIVE ONLINE
          </span>
          <h2 style={{ margin: 0, fontSize: '36px', fontWeight: 700, letterSpacing: '-1px', color: '#10b981' }}>
            {activeUsers.length}
          </h2>
          <span style={{ fontSize: '12px', color: '#71717a' }}>Concurrent live sessions</span>
        </div>

        {/* Card 2: Total Page Views */}
        <div style={{
          background: 'rgba(15, 15, 18, 0.6)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}>
          <span style={{ fontSize: '12px', color: '#a1a1aa', fontWeight: 500, display: 'block', marginBottom: '8px' }}>
            TOTAL PAGE VIEWS
          </span>
          <h2 style={{ margin: 0, fontSize: '36px', fontWeight: 700, letterSpacing: '-1px' }}>
            {metrics.totalPageViews.toLocaleString()}
          </h2>
          <span style={{ fontSize: '12px', color: '#71717a' }}>Cumulative views to date</span>
        </div>

        {/* Card 3: Unique Visitors */}
        <div style={{
          background: 'rgba(15, 15, 18, 0.6)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}>
          <span style={{ fontSize: '12px', color: '#a1a1aa', fontWeight: 500, display: 'block', marginBottom: '8px' }}>
            UNIQUE VISITORS
          </span>
          <h2 style={{ margin: 0, fontSize: '36px', fontWeight: 700, letterSpacing: '-1px' }}>
            {metrics.uniqueVisitors.toLocaleString()}
          </h2>
          <span style={{ fontSize: '12px', color: '#71717a' }}>Distinct tracking sessions</span>
        </div>

        {/* Card 4: Unread Messages */}
        <div style={{
          background: 'rgba(15, 15, 18, 0.6)',
          border: metrics.unreadMessages > 0 ? '1px solid rgba(245, 158, 11, 0.15)' : '1px solid rgba(255, 255, 255, 0.05)',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}>
          <span style={{ fontSize: '12px', color: metrics.unreadMessages > 0 ? '#f59e0b' : '#a1a1aa', fontWeight: 500, display: 'block', marginBottom: '8px' }}>
            UNREAD MESSAGES
          </span>
          <h2 style={{ margin: 0, fontSize: '36px', fontWeight: 700, letterSpacing: '-1px', color: metrics.unreadMessages > 0 ? '#f59e0b' : '#ffffff' }}>
            {metrics.unreadMessages}
          </h2>
          <span style={{ fontSize: '12px', color: '#71717a' }}>Awaiting admin review</span>
        </div>
      </div>

      {/* Main Charts & Telemetry Split Layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '24px',
        alignItems: 'start',
        '@media (max-width: 991px)': {
          gridTemplateColumns: '1fr'
        }
      }} className="admin-split-grid">

        {/* Left Side: Real-Time Sockets & Line Chart */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Live Visitor Feed (WebSocket) */}
          <div style={{
            background: 'rgba(15, 15, 18, 0.6)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            borderRadius: '16px',
            padding: '24px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h5 style={{ margin: 0, fontSize: '15px', fontWeight: 600 }}>Active Online Visitors ({activeUsers.length})</h5>
              <div style={{ fontSize: '11px', color: '#71717a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <i className="bi bi-clock-history"></i> Real-time stream active
              </div>
            </div>

            {activeUsers.length === 0 ? (
              <div style={{ padding: '40px 20px', textAlign: 'center', border: '1px dashed rgba(255,255,255,0.06)', borderRadius: '12px' }}>
                <i className="bi bi-people" style={{ fontSize: '28px', color: '#3f3f46', marginBottom: '8px', display: 'inline-block' }}></i>
                <p style={{ margin: 0, fontSize: '13px', color: '#71717a' }}>No active visitors browsing right now</p>
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', textAlign: 'left' }}>
                      <th style={{ padding: '12px', color: '#71717a', fontWeight: 500 }}>Location</th>
                      <th style={{ padding: '12px', color: '#71717a', fontWeight: 500 }}>IP Address</th>
                      <th style={{ padding: '12px', color: '#71717a', fontWeight: 500 }}>Browser / OS</th>
                      <th style={{ padding: '12px', color: '#71717a', fontWeight: 500 }}>Viewing Page</th>
                      <th style={{ padding: '12px', color: '#71717a', fontWeight: 500, textAlign: 'right' }}>Active Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeUsers.map((user) => (
                      <tr key={user.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)', verticalAlign: 'middle' }}>
                        <td style={{ padding: '12px', fontWeight: 500 }}>
                          <i className="bi bi-geo-alt" style={{ marginRight: '6px', color: '#a1a1aa' }}></i>
                          {user.location}
                        </td>
                        <td style={{ padding: '12px', color: '#a1a1aa', fontFamily: 'monospace' }}>{user.ip}</td>
                        <td style={{ padding: '12px', color: '#a1a1aa' }}>
                          <span style={{ marginRight: '8px' }}>
                            <i className={user.device === 'Mobile' ? 'bi bi-phone' : 'bi bi-laptop'} style={{ marginRight: '4px' }}></i>
                            {user.browser}
                          </span>
                          <span style={{ fontSize: '11px', background: 'rgba(255,255,255,0.04)', padding: '2px 6px', borderRadius: '4px' }}>
                            {user.os}
                          </span>
                        </td>
                        <td style={{ padding: '12px' }}>
                          <span style={{
                            background: 'rgba(255,255,255,0.05)',
                            padding: '3px 8px',
                            borderRadius: '6px',
                            fontFamily: 'monospace',
                            fontSize: '12px',
                            border: '1px solid rgba(255,255,255,0.03)'
                          }}>
                            {user.path}
                          </span>
                        </td>
                        <td style={{ padding: '12px', textAlign: 'right', color: '#71717a', fontSize: '11px' }}>
                          Just now
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Line Chart Component (Traffic Trend) */}
          <div style={{
            background: 'rgba(15, 15, 18, 0.6)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            borderRadius: '16px',
            padding: '24px'
          }}>
            <h5 style={{ margin: '0 0 20px 0', fontSize: '15px', fontWeight: 600 }}>Visitor Volume (Last 7 Days)</h5>
            <div style={{ height: '300px', position: 'relative' }}>
              <canvas ref={lineChartRef}></canvas>
            </div>
          </div>
        </div>

        {/* Right Side: Breakdown Charts & Top Pages */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Top Visited Pages Chart */}
          <div style={{
            background: 'rgba(15, 15, 18, 0.6)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            borderRadius: '16px',
            padding: '24px'
          }}>
            <h5 style={{ margin: '0 0 20px 0', fontSize: '15px', fontWeight: 600 }}>Top Visited Pages</h5>
            <div style={{ height: '220px', position: 'relative' }}>
              <canvas ref={pageChartRef}></canvas>
            </div>
          </div>

          {/* Demographics Breakdown Group */}
          <div style={{
            background: 'rgba(15, 15, 18, 0.6)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            borderRadius: '16px',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '32px'
          }}>
            <div>
              <h5 style={{ margin: '0 0 16px 0', fontSize: '15px', fontWeight: 600 }}>Device Breakdown</h5>
              <div style={{ height: '140px', position: 'relative' }}>
                <canvas ref={deviceChartRef}></canvas>
              </div>
            </div>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '24px' }}>
              <h5 style={{ margin: '0 0 16px 0', fontSize: '15px', fontWeight: 600 }}>Browser Breakdown</h5>
              <div style={{ height: '140px', position: 'relative' }}>
                <canvas ref={browserChartRef}></canvas>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Historical Visitor Stream */}
      <div style={{
        background: 'rgba(15, 15, 18, 0.6)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        borderRadius: '16px',
        padding: '24px',
        marginBottom: '24px'
      }}>
        <h5 style={{ margin: '0 0 20px 0', fontSize: '15px', fontWeight: 600 }}>Recent Visitor Traffic Logs</h5>
        
        {dashboardData.recentLogs.length === 0 ? (
          <div style={{ padding: '30px', textAlign: 'center', color: '#71717a', fontSize: '13px' }}>
            No recent analytics entries recorded yet.
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', textAlign: 'left' }}>
                  <th style={{ padding: '12px', color: '#71717a', fontWeight: 500 }}>Time</th>
                  <th style={{ padding: '12px', color: '#71717a', fontWeight: 500 }}>IP Address</th>
                  <th style={{ padding: '12px', color: '#71717a', fontWeight: 500 }}>Region / Country</th>
                  <th style={{ padding: '12px', color: '#71717a', fontWeight: 500 }}>Device Profile</th>
                  <th style={{ padding: '12px', color: '#71717a', fontWeight: 500 }}>Page Path</th>
                  <th style={{ padding: '12px', color: '#71717a', fontWeight: 500 }}>Referrer</th>
                </tr>
              </thead>
              <tbody>
                {dashboardData.recentLogs.map((log) => {
                  const dateObj = new Date(log.timestamp);
                  const formattedTime = dateObj.toLocaleDateString() + ' ' + dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                  return (
                    <tr key={log._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                      <td style={{ padding: '12px', whiteSpace: 'nowrap', color: '#a1a1aa' }}>{formattedTime}</td>
                      <td style={{ padding: '12px', fontFamily: 'monospace', color: '#a1a1aa' }}>{log.ip}</td>
                      <td style={{ padding: '12px' }}>
                        <i className="bi bi-globe" style={{ marginRight: '6px', color: '#71717a' }}></i>
                        {log.city ? `${log.city}, ${log.country}` : log.country}
                      </td>
                      <td style={{ padding: '12px', color: '#a1a1aa' }}>
                        <span style={{ marginRight: '8px' }}>
                          <i className={log.device === 'Mobile' ? 'bi bi-phone' : 'bi bi-laptop'} style={{ marginRight: '4px' }}></i>
                          {log.browser}
                        </span>
                        <span style={{ fontSize: '11px', background: 'rgba(255,255,255,0.04)', padding: '2px 6px', borderRadius: '4px' }}>
                          {log.os}
                        </span>
                      </td>
                      <td style={{ padding: '12px' }}>
                        <span style={{
                          background: 'rgba(255,255,255,0.04)',
                          padding: '2px 6px',
                          borderRadius: '4px',
                          fontFamily: 'monospace',
                          fontSize: '12px'
                        }}>
                          {log.path}
                        </span>
                      </td>
                      <td style={{ padding: '12px', color: '#71717a', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: '150px' }}>
                        {log.referrer ? log.referrer.replace(/https?:\/\//, '') : 'Direct'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Real-time Toast Overlay */}
      {toast.show && (
        <div style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          background: 'rgba(20, 20, 23, 0.95)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          borderRadius: '12px',
          padding: '16px 20px',
          boxShadow: '0 10px 35px rgba(0, 0, 0, 0.4), 0 0 15px rgba(16, 185, 129, 0.1)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          animation: 'slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          color: '#ffffff',
          fontFamily: 'Inter, sans-serif'
        }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'rgba(16, 185, 129, 0.1)',
            color: '#10b981',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px'
          }}>
            <i className={`bi ${toast.icon || 'bi-info-circle-fill'}`}></i>
          </div>
          <div>
            <div style={{ fontSize: '10px', color: '#10b981', fontWeight: 700, letterSpacing: '0.5px' }}>{toast.title}</div>
            <div style={{ fontSize: '13px', fontWeight: 600, marginTop: '2px' }}>{toast.name}</div>
            <div style={{ fontSize: '11px', color: '#a1a1aa' }}>{toast.detail}</div>
          </div>
          <button 
            onClick={() => setToast({ show: false, title: '', name: '', detail: '', icon: '' })}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#71717a',
              cursor: 'pointer',
              marginLeft: '12px',
              padding: 0,
              fontSize: '18px'
            }}
          >
            <i className="bi bi-x"></i>
          </button>
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0% { transform: scale(0.95); opacity: 0.3; }
          50% { transform: scale(1.3); opacity: 1; }
          100% { transform: scale(0.95); opacity: 0.3; }
        }
        @keyframes slideIn {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @media (max-width: 991px) {
          .admin-split-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
