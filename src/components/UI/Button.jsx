import React from 'react';
import { Button as HeadlessButton } from '@headlessui/react';
import { cva } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const buttonVariants = cva(
  "inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-95 disabled:opacity-40 disabled:pointer-events-none disabled:scale-100 cursor-pointer select-none",
  {
    variants: {
      variant: {
        primary: "bg-gradient-to-t from-[#ff1d4e] to-[#ff2b2b] text-white shadow-lg shadow-brand-red/10 hover:shadow-xl hover:shadow-brand-red/25 hover:opacity-95 focus-visible:ring-brand-red",
        primaryOutline: "border-2 border-brand-red text-brand-red bg-transparent hover:bg-brand-red/5 focus-visible:ring-brand-red",
        black: "bg-gray-primary text-white shadow-lg shadow-black/10 hover:bg-black hover:shadow-xl hover:shadow-black/20 focus-visible:ring-gray-primary",
        blackOutline: "border-2 border-gray-primary text-gray-primary bg-transparent hover:bg-gray-primary/5 focus-visible:ring-gray-primary",
        white: "bg-white text-gray-primary shadow-md hover:bg-gray-50 hover:shadow-lg focus-visible:ring-white border border-gray-200",
        whiteOutline: "border-2 border-white text-white bg-transparent hover:bg-white/10 focus-visible:ring-white",
      },
      size: {
        sm: "px-4 py-2 text-sm gap-1.5",
        md: "px-6 py-2.5 text-base gap-2",
        lg: "px-8 py-3.5 text-lg gap-2.5",
      },
      fullWidth: {
        true: "w-full sm:w-auto",
        false: "w-auto",
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false,
    }
  }
);

const Button = ({
  children,
  className,
  variant,
  size = "md",
  fullWidth,
  startIcon,
  endIcon,
  ...props
}) => {
  const iconSizeClass = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  }[size];

  const renderIcon = (Icon) => {
    if (!Icon) return null;
    if (React.isValidElement(Icon)) {
      return Icon;
    }
    const IconComponent = Icon;
    return <IconComponent className={cn("flex-shrink-0", iconSizeClass)} />;
  };

  return (
    <HeadlessButton
      className={cn(buttonVariants({ variant, size, fullWidth }), className)}
      {...props}
    >
      {renderIcon(startIcon)}
      <span>{children}</span>
      {renderIcon(endIcon)}
    </HeadlessButton>
  );
};

export { Button, buttonVariants };
export default Button;
