import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { io } from 'socket.io-client';
import { API_BASE, SOCKET_URL } from '../config';

// Simple client-side UserAgent parser
function parseUserAgent() {
  const ua = navigator.userAgent;
  let browser = 'Unknown Browser';
  let os = 'Unknown OS';
  let device = 'Desktop';

  if (/Mobi|Android|iPhone|iPad/i.test(ua)) {
    device = 'Mobile';
    if (/iPad/i.test(ua)) device = 'Tablet';
  }

  if (/chrome|crios/i.test(ua) && !/edge|edg/i.test(ua) && !/opr/i.test(ua)) {
    browser = 'Chrome';
  } else if (/safari/i.test(ua) && !/chrome|crios/i.test(ua)) {
    browser = 'Safari';
  } else if (/firefox|fxios/i.test(ua)) {
    browser = 'Firefox';
  } else if (/edge|edg/i.test(ua)) {
    browser = 'Edge';
  } else if (/opr/i.test(ua)) {
    browser = 'Opera';
  }

  if (/Windows/i.test(ua)) {
    os = 'Windows';
  } else if (/Macintosh|Mac OS X/i.test(ua)) {
    os = 'macOS';
  } else if (/Android/i.test(ua)) {
    os = 'Android';
  } else if (/iPhone|iPad|iPod/i.test(ua)) {
    os = 'iOS';
  } else if (/Linux/i.test(ua)) {
    os = 'Linux';
  }

  return { browser, os, device };
}

export default function AnalyticsTracker() {
  const location = useLocation();
  const socketRef = useRef(null);
  const isRegisteredRef = useRef(false);

  // Initialize unique session ID
  let sessionId = sessionStorage.getItem('portfolio_session_id');
  if (!sessionId) {
    sessionId = 'sess_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
    sessionStorage.setItem('portfolio_session_id', sessionId);
  }

  const { browser, os, device } = parseUserAgent();

  // Async function to resolve geolocation and submit tracking
  const trackVisit = async (path) => {
    // If it's an admin page, do not record in visitor logs
    if (path.startsWith('/admin')) return;

    try {
      let geoInfo = null;
      const cachedGeo = sessionStorage.getItem('visitor_geo_info');
      
      if (cachedGeo) {
        geoInfo = JSON.parse(cachedGeo);
      } else {
        // Query free geolocation API
        const response = await fetch('https://ipapi.co/json/');
        if (response.ok) {
          const data = await response.json();
          geoInfo = {
            ip: data.ip,
            country: data.country_name,
            city: data.city,
            region: data.region
          };
          sessionStorage.setItem('visitor_geo_info', JSON.stringify(geoInfo));
        }
      }

      // Record page view in DB
      await fetch(`${API_BASE}/api/analytics/track`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          path,
          referrer: document.referrer || '',
          browser,
          os,
          device,
          ip: geoInfo?.ip || 'Unknown',
          country: geoInfo?.country || 'Localhost',
          city: geoInfo?.city || 'Localhost',
          region: geoInfo?.region || 'Localhost'
        })
      });
    } catch (error) {
      console.warn('Analytics tracking error:', error.message);
      
      // Attempt to track page view with mock info on fallback
      try {
        await fetch(`${API_BASE}/api/analytics/track`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sessionId,
            path,
            referrer: document.referrer || '',
            browser,
            os,
            device
          })
        });
      } catch (err) {
        console.error('Fallback tracking failed:', err);
      }
    }
  };

  // Setup WebSocket connection for live tracking
  useEffect(() => {
    // Prevent tracking on admin namespace paths
    if (location.pathname.startsWith('/admin')) {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
        isRegisteredRef.current = false;
      }
      return;
    }

    if (!socketRef.current) {
      const socketUrl = SOCKET_URL;
      socketRef.current = io(socketUrl, {
        transports: ['websocket', 'polling']
      });

      socketRef.current.on('connect', () => {
        let geoInfo = { ip: 'Unknown', country: 'Localhost', city: 'Localhost' };
        const cachedGeo = sessionStorage.getItem('visitor_geo_info');
        if (cachedGeo) geoInfo = JSON.parse(cachedGeo);

        // Register session on socket server
        socketRef.current.emit('user-register', {
          sessionId,
          path: location.pathname,
          device,
          browser,
          ip: geoInfo.ip,
          location: geoInfo.city !== 'Localhost' ? `${geoInfo.city}, ${geoInfo.country}` : 'Localhost'
        });
        isRegisteredRef.current = true;
      });
    } else if (isRegisteredRef.current) {
      // Emit navigate update on route changes
      socketRef.current.emit('user-navigate', {
        path: location.pathname
      });
    }

    // Fire the REST tracking
    trackVisit(location.pathname);

    // Clean up on component unmount
    return () => {
      // We don't disconnect socket immediately unless navigating to admin
    };
  }, [location.pathname]);

  // Global cleanup on main app destroy
  useEffect(() => {
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  return null;
}
