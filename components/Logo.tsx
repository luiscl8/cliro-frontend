import React from 'react';

interface LogoProps {
  className?: string;
  color?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = "h-10 w-10", color = "currentColor" }) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
      aria-label="CLIRO Logo"
    >
      <path 
        d="M50 0C22.3858 0 0 22.3858 0 50C0 77.6142 22.3858 100 50 100C77.6142 100 100 77.6142 100 50C100 22.3858 77.6142 0 50 0ZM50 92C26.804 92 8 73.196 8 50C8 26.804 26.804 8 50 8C73.196 8 92 26.804 92 50C92 73.196 73.196 92 50 92Z" 
        fill={color}
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d="M50 88C70.9868 88 88 70.9868 88 50C88 29.0132 70.9868 12 50 12C29.0132 12 12 29.0132 12 50C12 70.9868 29.0132 88 50 88ZM50 80C33.4315 80 20 66.5685 20 50C20 33.4315 33.4315 20 50 20C66.5685 20 80 33.4315 80 50C80 66.5685 66.5685 80 50 80Z" 
        fill={color}
        fillOpacity="0.1"
      />
      <path 
        d="M50 20C50 36.5685 36.5685 50 20 50C36.5685 50 50 63.4315 50 80C50 63.4315 63.4315 50 80 50C63.4315 50 50 36.5685 50 20Z" 
        fill={color}
      />
    </svg>
  );
};