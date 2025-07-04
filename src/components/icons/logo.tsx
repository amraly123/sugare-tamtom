import React from 'react';

const Logo = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="60"
    height="60"
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="50" cy="50" r="48" fill="hsl(var(--primary))" />
    <text
      x="50"
      y="60"
      fontFamily="PT Sans, sans-serif"
      fontSize="40"
      fill="hsl(var(--primary-foreground))"
      textAnchor="middle"
      fontWeight="bold"
    >
      TT
    </text>
  </svg>
);

export default Logo;
