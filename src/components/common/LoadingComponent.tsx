import React from 'react';

const LoadingComponent: React.FC = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="flex space-x-2">
        <div className="w-4 h-4 rounded-full bg-primary animate-wave1"></div>
        <div className="w-4 h-4 rounded-full bg-secondary animate-wave2"></div>
        <div className="w-4 h-4 rounded-full bg-accent animate-wave3"></div>
      </div>
    </div>
  );
};

export default LoadingComponent;
