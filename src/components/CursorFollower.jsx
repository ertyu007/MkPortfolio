// CursorFollower.jsx

import React, { useEffect, useState } from 'react';

const CursorFollower = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;
    let posX = 0;
    let posY = 0;
    let velocity = 0.1;
    
    const updatePosition = () => {
      // คำนวณตำแหน่งใหม่ด้วย easing
      posX += (mouseX - posX) * velocity;
      posY += (mouseY - posY) * velocity;
      
      setPosition({ x: posX, y: posY });
      requestAnimationFrame(updatePosition);
    };
    
    updatePosition();
    
    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setIsMoving(true);
    };
    
    const handleMouseStop = () => {
      setIsMoving(false);
    };
    
    let timeout;
    const debouncedMouseStop = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => setIsMoving(false), 100);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousemove', debouncedMouseStop);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousemove', debouncedMouseStop);
    };
  }, []);

  return (
    <div
      className="cursor-follower"
      style={{
        left: position.x,
        top: position.y,
        opacity: isMoving ? 1 : 0,
        transform: `translate(-50%, -50%) scale(${isMoving ? 1 : 0.5})`,
      }}
    />
  );
};

export default CursorFollower;