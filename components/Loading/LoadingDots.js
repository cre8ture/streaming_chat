import React, { useState, useEffect } from 'react';

const Loader = () => {
  const [dots, setDots] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => (prevDots + 1) % 4);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return <div>{'.'.repeat(dots)}</div>;
};

export default Loader;
