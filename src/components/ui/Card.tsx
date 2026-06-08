import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  onClick,
  hoverEffect = true,
}) => {
  return (
    <motion.div
      onClick={onClick}
      className={`bg-brand-surface border border-brand-border rounded-[4px] p-8 transition-colors duration-300 ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
      whileHover={
        hoverEffect
          ? {
              y: -4,
              borderColor: 'rgba(255, 215, 0, 0.3)',
              boxShadow: '0 12px 30px rgba(255, 215, 0, 0.06)',
            }
          : undefined
      }
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
};

export default Card;
