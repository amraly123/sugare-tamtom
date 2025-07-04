import React from 'react';

const Logo = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="60"
    height="60"
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="50" cy="50" r="48" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="2" />
    <path
      d="M50,40 C28,40 22,55 22,70 C22,90 38,98 50,98 C62,98 78,90 78,70 C78,55 72,40 50,40 Z"
      fill="hsl(var(--accent))"
    />
    <path
      d="M48,42 C48,35 52,35 52,42 L52,25 C55,20 45,20 48,25 Z"
      fill="hsl(var(--primary))"
    />
    <path
      d="M38,75 Q50,85 62,75"
      stroke="hsl(var(--accent-foreground))"
      strokeWidth="3"
      fill="transparent"
      strokeLinecap="round"
    />
    <circle cx="42" cy="65" r="3" fill="hsl(var(--accent-foreground))" />
    <circle cx="58" cy="65" r="3" fill="hsl(var(--accent-foreground))" />
  </svg>
);

export default Logo;
