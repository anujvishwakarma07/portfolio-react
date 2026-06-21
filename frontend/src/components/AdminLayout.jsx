import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState('Admin');
  const [isLive, setIsLive] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Authentication guard
    const token = localStorage.getItem('admin_token');
    const storedUser = localStorage.getItem('admin_user');
    
    if (!token) {
      navigate('/admin/login');
      return;
    }
    
    if (storedUser) {
      setUsername(storedUser);
    }

    // Monitor live connection status
    // (This matches standard websocket status, we simulate it via checking if analytics or socket has active connection)
    const handleOnline = () => setIsLive(true);
    const handleOffline = () => setIsLive(false);
    
    setIsLive(navigator.onLine);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    navigate('/admin/login');
  };

  const navItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: 'bi-speedometer2' },
    { path: '/admin/projects', label: 'Projects CRUD', icon: 'bi-briefcase' },
    { path: '/admin/content', label: 'Page Content', icon: 'bi-pencil-square' },
    { path: '/admin/messages', label: 'Messages Inbox', icon: 'bi-envelope' },
    { path: '/admin/feedbacks', label: 'Visitor Reviews', icon: 'bi-star' },
  ];

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      background: '#09090b',
      color: '#f4f4f5',
      fontFamily: '"Inter", sans-serif',
      position: 'relative',
      overflowX: 'hidden'
    }}>
      {/* Sidebar Styling */}
      <aside style={{
        width: '280px',
        background: 'rgba(15, 15, 18, 0.95)',
        borderRight: '1px solid rgba(255, 255, 255, 0.05)',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        zIndex: 100,
        transform: sidebarOpen ? 'translateX(0)' : 'translateX(-280px)',
        transition: 'transform 0.3s ease-in-out',
        padding: '24px',
        '@media (min-width: 992px)': {
          transform: 'translateX(0) !important'
        }
      }} className="admin-sidebar">
        
        {/* Sidebar Header Brand */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '40px',
          paddingBottom: '20px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #ffffff 0%, #a0a0a0 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 15px rgba(255, 255, 255, 0.1)'
          }}>
            <i className="bi bi-shield-lock-fill" style={{ color: '#000000', fontSize: '18px' }}></i>
          </div>
          <div>
            <h5 style={{ margin: 0, fontWeight: 700, fontSize: '16px', letterSpacing: '0.5px' }}>ANUJ.DEV</h5>
            <span style={{ fontSize: '11px', color: '#71717a', fontWeight: 500 }}>ADMIN CONTROL PANEL</span>
          </div>
        </div>

        {/* User Card */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          borderRadius: '12px',
          padding: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '32px'
        }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            fontWeight: 600
          }}>
            {username.charAt(0).toUpperCase()}
          </div>
          <div style={{ overflow: 'hidden' }}>
            <div style={{ fontSize: '14px', fontWeight: 600, textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{username}</div>
            <div style={{ fontSize: '11px', color: '#10b981', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#10b981',
                display: 'inline-block',
                boxShadow: '0 0 8px #10b981'
              }}></span>
              Authenticated
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px', flexGrow: 1 }}>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link 
                key={item.path} 
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  color: isActive ? '#000000' : '#a1a1aa',
                  background: isActive ? '#ffffff' : 'transparent',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: 500,
                  transition: 'all 0.2s ease',
                  boxShadow: isActive ? '0 4px 12px rgba(255, 255, 255, 0.1)' : 'none'
                }}
              >
                <i className={`bi ${item.icon}`} style={{ fontSize: '16px' }}></i>
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <button 
          onClick={handleLogout}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            padding: '12px 16px',
            borderRadius: '10px',
            color: '#ef4444',
            background: 'rgba(239, 68, 68, 0.05)',
            border: '1px solid rgba(239, 68, 68, 0.1)',
            fontSize: '14px',
            fontWeight: 500,
            cursor: 'pointer',
            textAlign: 'left',
            marginTop: 'auto',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
            e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(239, 68, 68, 0.05)';
            e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.1)';
          }}
        >
          <i className="bi bi-box-arrow-right" style={{ fontSize: '16px' }}></i>
          Sign Out
        </button>
      </aside>

      {/* Main Content Area */}
      <div style={{
        flexGrow: 1,
        paddingLeft: '0', // Overwritten on desktop layout
        display: 'flex',
        flexDirection: 'column',
        minWidth: 0
      }} className="admin-main-container">
        
        {/* Top Navbar */}
        <header style={{
          height: '70px',
          background: 'rgba(15, 15, 18, 0.8)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          zIndex: 90
        }}>
          {/* Mobile Sidebar Toggle */}
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#ffffff',
              fontSize: '24px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              padding: 0
            }}
            className="admin-hamburger"
          >
            <i className={`bi ${sidebarOpen ? 'bi-x' : 'bi-list'}`}></i>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* Live Socket Status */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              borderRadius: '20px',
              padding: '6px 14px',
              fontSize: '12px'
            }}>
              <span className="live-pulse" style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: isLive ? '#10b981' : '#f59e0b',
                display: 'inline-block',
                boxShadow: isLive ? '0 0 10px #10b981' : '0 0 10px #f59e0b'
              }}></span>
              <span style={{ color: '#a1a1aa' }}>Live Engine:</span> 
              <strong style={{ color: isLive ? '#10b981' : '#f59e0b', fontWeight: 600 }}>
                {isLive ? 'CONNECTED' : 'DISCONNECTED'}
              </strong>
            </div>

            <a href="/" target="_blank" rel="noopener noreferrer" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '13px',
              color: '#ffffff',
              textDecoration: 'none',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.08)',
              padding: '6px 12px',
              borderRadius: '8px',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
            >
              <i className="bi bi-box-arrow-up-right"></i>
              Visit Site
            </a>
          </div>
        </header>

        {/* Dynamic Inner Page Content */}
        <main style={{ padding: '32px', flexGrow: 1 }}>
          <Outlet />
        </main>
      </div>

      {/* Responsive Overlay style rules injected */}
      <style>{`
        @media (min-width: 992px) {
          .admin-sidebar {
            transform: translateX(0) !important;
          }
          .admin-main-container {
            padding-left: 280px !important;
          }
          .admin-hamburger {
            display: none !important;
          }
        }
        @keyframes pulse {
          0% { transform: scale(0.95); opacity: 0.5; }
          50% { transform: scale(1.15); opacity: 1; }
          100% { transform: scale(0.95); opacity: 0.5; }
        }
        .live-pulse {
          animation: pulse 2s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}
