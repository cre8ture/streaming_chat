import React from 'react';

const GeneratePlanButton = () => {
  const buttonStyle = {
    position: 'relative',
    background: 'transparent',
    color: '#fff',
    fontSize: '16px',
    fontWeight: 'bold',
    padding: '10px 20px',
    cursor: 'pointer',
    overflow: 'hidden',
  };

  const gradientOutlineStyle = {
    content: "''",
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
    background: 'linear-gradient(90deg, #00f, #0f0, #ff0)',
    border: '2px solid transparent',
    borderRadius: 'inherit',
    pointerEvents: 'none',
  };

  const hoverStyle = {
    background: '#fff',
    color: '#000',
  };

  return (
    <button
    >
      Generate Plan
    </button>
  );
};

export default GeneratePlanButton;
