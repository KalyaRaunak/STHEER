import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  to?: string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  to,
  onClick,
  className = '',
  type = 'button',
  size = 'md',
}) => {
  const getPaddingClass = () => {
    if (size === 'sm') {
      return 'px-5 py-2.5 text-xs';
    }
    if (size === 'lg') {
      return 'px-10 py-[18px] text-[15px]';
    }
    // md
    return variant === 'primary' ? 'px-8 py-3.5 text-sm' : 'px-[30px] py-[13px] text-sm';
  };

  const baseStyles = `inline-flex items-center justify-center font-bold uppercase tracking-[0.08em] rounded-[2px] transition-all duration-300 select-none`;

  const variantStyles = {
    primary: 'bg-brand-yellow hover:bg-brand-gold text-brand-black font-montserrat',
    secondary: 'bg-transparent border border-white/30 text-white font-dm-sans hover:border-brand-yellow hover:text-brand-yellow',
    ghost: 'bg-transparent hover:bg-white/5 text-white font-dm-sans',
  };

  const buttonClasses = `${baseStyles} ${variantStyles[variant]} ${getPaddingClass()} ${className}`;

  const buttonContent = (
    <motion.span
      className="inline-flex items-center justify-center gap-2"
      whileHover={{ y: -1 }}
      whileTap={{ y: 0 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
    >
      {children}
    </motion.span>
  );

  if (to) {
    return (
      <Link to={to} className={buttonClasses}>
        {buttonContent}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={buttonClasses}>
      {buttonContent}
    </button>
  );
};

export default Button;
