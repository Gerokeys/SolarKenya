import { useEffect, useState } from 'react';

const LoadingScreen = ({ onDone }) => {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const exit = setTimeout(() => setExiting(true), 1800);
    const done = setTimeout(() => onDone(), 2350);
    return () => { clearTimeout(exit); clearTimeout(done); };
  }, [onDone]);

  return (
    <div className={`loader-screen${exiting ? ' loader-exit' : ''}`}>
      {/* Sun */}
      <svg className="loader-sun" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="40" cy="40" r="16" stroke="#F97316" strokeWidth="2.5" className="loader-circle" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
          const rad = (deg * Math.PI) / 180;
          const x1 = 40 + 22 * Math.cos(rad);
          const y1 = 40 + 22 * Math.sin(rad);
          const x2 = 40 + 30 * Math.cos(rad);
          const y2 = 40 + 30 * Math.sin(rad);
          return (
            <line
              key={deg}
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke="#F97316"
              strokeWidth="2.5"
              strokeLinecap="round"
              className="loader-ray"
              style={{ animationDelay: `${0.4 + i * 0.06}s` }}
            />
          );
        })}
      </svg>

      {/* Wordmark */}
      <div className="loader-wordmark">
        <span className="loader-solar">SOLAR</span>
        <span className="loader-kenya">LINK</span>
      </div>

      {/* Progress bar */}
      <div className="loader-bar-track">
        <div className="loader-bar-fill" />
      </div>
    </div>
  );
};

export default LoadingScreen;
