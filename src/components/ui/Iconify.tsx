"use client";

import React from 'react';

// Locally declare the custom element for this component
interface IconifyProps extends React.HTMLAttributes<HTMLElement> {
  icon: string;
  width?: string | number;
  height?: string | number;
  rotate?: string | number;
  flip?: string;
  mode?: string;
  inline?: boolean;
}

export function Iconify({ icon, className, ...props }: IconifyProps) {
  const IconifyIcon = 'iconify-icon' as any;
  
  return (
    <IconifyIcon 
      icon={icon} 
      class={className} 
      {...props} 
    />
  );
}
