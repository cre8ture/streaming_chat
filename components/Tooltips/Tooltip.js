import React, { useState, useRef, useEffect } from 'react';

const Tooltip = ({ text, children }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef(null);

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  useEffect(() => {
    if (showTooltip) {
      const tooltipWidth = tooltipRef.current.clientWidth;
      const windowWidth = window.innerWidth;
      const elementRect = tooltipRef.current.getBoundingClientRect();
      if (elementRect.left < tooltipWidth / 2) {
        tooltipRef.current.style.left = '0';
        tooltipRef.current.style.transform = 'translateX(0)';
      } else if (elementRect.right + tooltipWidth / 2 > windowWidth) {
        tooltipRef.current.style.right = '0';
        tooltipRef.current.style.transform = 'translateX(50%)';
      } else {
        tooltipRef.current.style.left = '50%';
        tooltipRef.current.style.transform = 'translateX(-50%)';
      }
    }
  }, [showTooltip]);

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ cursor: 'pointer' }}
      >
        {children}
      </div>
      {showTooltip && (
        <div
          ref={tooltipRef}
          style={{
            position: 'absolute',
            top: '100%',
            background: 'rgba(0, 0, 0, 0.8)',
            color: '#fff',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '12px',
            whiteSpace: 'nowrap',
          }}
        >
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
