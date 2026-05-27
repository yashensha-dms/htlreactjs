import React from 'react';
import { cn } from '../../utils/cn';

const Section = ({ 
  children, 
  className, 
  id,
  as: Component = 'section',
  ...props 
}) => {
  return (
    <Component
      id={id}
      className={cn(
        "relative w-full min-h-[calc(100vh-64px)] flex items-center py-16 md:py-24 overflow-hidden bg-white",
        className
      )}
      {...props}
    >
      <div className="w-full max-w-[1440px] mx-auto px-5 md:px-20 z-10">
        {children}
      </div>
    </Component>
  );
};

export default Section;
