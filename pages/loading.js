import React from 'react';

const LoadingAnimation = () => {
  return (
    <div style={{ fontSize: '20px' }}>
      <span className="dot">.</span>
      <span className="dot">.</span>
      <span className="dot">.</span>
      <span className="dot">.</span>
      <span className="dot">.</span>
      <span className="dot">.</span>
      <span className="dot">.</span>
      <span className="dot">.</span>
      <span className="dot">.</span>
      <span className="dot">.</span>

      <style jsx>{`
        .dot {
          animation: wave 1s infinite ease-in-out;
        }

        @keyframes wave {
          0%,
          60%,
          100% {
            transform: translateY(0);
          }
          30% {
            transform: translateY(-10px);
          }
        }

        .dot:nth-child(2) {
          animation-delay: -0.9s;
        }
        .dot:nth-child(3) {
          animation-delay: -0.8s;
        }
        .dot:nth-child(4) {
          animation-delay: -0.7s;
        }
        .dot:nth-child(5) {
          animation-delay: -0.6s;
        }
        .dot:nth-child(6) {
          animation-delay: -0.5s;
        }
        .dot:nth-child(7) {
          animation-delay: -0.4s;
        }
        .dot:nth-child(8) {
          animation-delay: -0.3s;
        }
        .dot:nth-child(9) {
          animation-delay: -0.2s;
        }
        .dot:nth-child(10) {
          animation-delay: -0.1s;
        }
      `}</style>
    </div>
  );
};

export default LoadingAnimation;
