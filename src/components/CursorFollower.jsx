import React from 'react';

const CursorFollower = ({ position }) => {
  return (
    <div
      className="fixed w-4 h-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 pointer-events-none z-50 mix-blend-difference"
      style={{
        left: position.x - 8,
        top: position.y - 8,
        transition: 'all 0.1s ease-out',
      }}
    />
  );
};

export default CursorFollower;