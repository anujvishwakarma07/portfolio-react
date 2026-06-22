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

// Fetch client geolocation with robust fallbacks
const getGeoInfo = async () => {
  const cached = sessionStorage.getItem('visitor_geo_info');
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch (e) {
      // Ignored cache corruptions
    }
  }

  // Provider 1: FreeIPAPI (highly accurate, fast, no limits)
  try {
    const res = await fetch('https://freeipapi.com/api/json');
    if (res.ok) {
      const data = await res.json();
      const geo = {
        ip: data.ipAddress || 'Unknown',
        country: data.countryName || 'Unknown',
        city: data.cityName || 'Unknown',
        region: data.regionName || 'Unknown'
      };
      sessionStorage.setItem('visitor_geo_info', JSON.stringify(geo));
      return geo;
    }
  } catch (err) {
    console.warn('FreeIPAPI failed, attempting backup provider...', err);
  }

  // Provider 2: IPWho.is (reliable backup, free 10k/month)
  try {
    const res = await fetch('https://ipwho.is/');
    if (res.ok) {
      const data = await res.json();
      if (data.success) {
        const geo = {
          ip: data.ip || 'Unknown',
          country: data.country || 'Unknown',
          city: data.city || 'Unknown',
          region: data.region || 'Unknown'
        };
        sessionStorage.setItem('visitor_geo_info', JSON.stringify(geo));
        return geo;
      }
    }
  } catch (err) {
    console.warn('IPWho.is failed, attempting final fallback...', err);
  }

  // Provider 3: IPAPI.co (legacy fallback)
  try {
    const res = await fetch('https://ipapi.co/json/');
    if (res.ok) {
      const data = await res.json();
      const geo = {
        ip: data.ip || 'Unknown',
        country: data.country_name || 'Unknown',
        city: data.city || 'Unknown',
        region: data.region || 'Unknown'
      };
      sessionStorage.setItem('visitor_geo_info', JSON.stringify(geo));
      return geo;
    }
  } catch (err) {
    console.warn('All geolocation providers failed to resolve client IP.', err);
  }

  return { ip: 'Unknown', country: 'Unknown', city: 'Unknown', region: 'Unknown' };
};

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

  // Setup WebSocket connection for live tracking & Page events
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

    const initTracking = async () => {
      // 1. Resolve geolocation first
      const geoInfo = await getGeoInfo();

      // 2. Fire the REST tracking to write to MongoDB
      try {
        await fetch(`${API_BASE}/api/analytics/track`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sessionId,
            path: location.pathname,
            referrer: document.referrer || '',
            browser,
            os,
            device,
            ip: geoInfo.ip !== 'Unknown' ? geoInfo.ip : undefined, // let backend fallback to headers if client fetch failed
            country: geoInfo.country !== 'Unknown' ? geoInfo.country : undefined,
            city: geoInfo.city !== 'Unknown' ? geoInfo.city : undefined,
            region: geoInfo.region !== 'Unknown' ? geoInfo.region : undefined
          })
        });
      } catch (error) {
        console.warn('Analytics REST log error:', error.message);
      }

      // 3. Connect/Emit user register details on WebSocket for live admin view
      if (!socketRef.current) {
        const socketUrl = SOCKET_URL;
        socketRef.current = io(socketUrl, {
          transports: ['websocket', 'polling']
        });

        socketRef.current.on('connect', () => {
          let userLocation = 'Unknown Location';
          if (geoInfo.city !== 'Unknown' && geoInfo.city !== 'Localhost') {
            userLocation = `${geoInfo.city}, ${geoInfo.country}`;
          } else if (geoInfo.country !== 'Unknown' && geoInfo.country !== 'Localhost') {
            userLocation = geoInfo.country;
          }

          socketRef.current.emit('user-register', {
            sessionId,
            path: location.pathname,
            device,
            browser,
            ip: geoInfo.ip !== 'Unknown' ? geoInfo.ip : undefined,
            location: userLocation
          });
          isRegisteredRef.current = true;
        });
      } else if (isRegisteredRef.current) {
        // Emit navigate update on route changes
        socketRef.current.emit('user-navigate', {
          path: location.pathname
        });
      }
    };

    initTracking();

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
