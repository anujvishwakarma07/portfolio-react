import React, { useState, useEffect } from 'react';
import '../assets/css/preloader.css';

const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFadingText, setIsFadingText] = useState(false);
  const [isRevealing, setIsRevealing] = useState(false);

  useEffect(() => {
    // Disable body scroll context
    document.body.classList.add('preloader-active');
    
    const duration = 2000; // 2 seconds total loading duration
    const intervalTime = 20; // increments every 20ms
    const step = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step;
        if (next >= 100) {
          clearInterval(timer);
          // Wait briefly, then trigger the fade/slide-up transitions
          setTimeout(() => {
            setIsFadingText(true);
            setTimeout(() => {
              setIsRevealing(true);
              // Complete preloader after curtain vertical columns finish sliding up (1.2s total)
              setTimeout(() => {
                document.body.classList.remove('preloader-active');
                onComplete();
              }, 1200);
            }, 300);
          }, 400);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => {
      clearInterval(timer);
      document.body.classList.remove('preloader-active');
    };
  }, [onComplete]);

  return (
    <div className={`preloader-container ${isRevealing ? 'revealing' : ''}`}>
      {/* 5 Column slide-up panels for creative reveal */}
      <div className="preloader-panels">
        <div className="reveal-panel col-1"></div>
        <div className="reveal-panel col-2"></div>
        <div className="reveal-panel col-3"></div>
        <div className="reveal-panel col-4"></div>
        <div className="reveal-panel col-5"></div>
      </div>

      {/* Ambient background glows */}
      {!isFadingText && (
        <>
          <div className="preloader-glow glow-1"></div>
          <div className="preloader-glow glow-2"></div>
        </>
      )}

      {/* Centered Animated Introduction and Loader */}
      <div className={`preloader-content-wrap ${isFadingText ? 'text-fade-out' : ''}`}>
        <div className="intro-line-wrap">
          <div className="intro-line line-1">HELLO, I AM</div>
        </div>
        <div className="intro-line-wrap">
          <div className="intro-line line-2">ANUJ VISHWAKARMA</div>
        </div>
        <div className="intro-line-wrap">
          <div className="intro-line line-3">A SOFTWARE DEVELOPER</div>
        </div>

        {/* Dynamic loader bar, label, and waiting subtitle */}
        <div className="preloader-loader-wrapper">
          <div className="preloader-waiting-text">THE WAIT WILL BE WORTH IT.</div>
          <div className="progress-bar-container">
            <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="progress-percentage-label">
            {Math.round(progress)}%
          </div>
        </div>
      </div>
      
      {/* Big watermark percentage in the background */}
      <div className="preloader-percentage">
        {Math.round(progress)}<span>%</span>
      </div>
    </div>
  );
};

export default Preloader;
