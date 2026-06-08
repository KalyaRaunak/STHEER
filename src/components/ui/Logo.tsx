import React from 'react';
import logoImg from '../../assets/logo.jpg';

interface LogoProps {
  variant?: 'white' | 'yellow' | 'black' | 'current';
  showText?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'white',
  showText = true,
  className = '',
}) => {
  const getTextColorClass = () => {
    switch (variant) {
      case 'yellow':
        return 'text-brand-yellow';
      case 'black':
        return 'text-brand-black';
      case 'white':
      default:
        return 'text-brand-white';
    }
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Swan Icon inside a White Box */}
      <div className="w-8 h-8 md:w-9 md:h-9 bg-white rounded-[2px] overflow-hidden flex items-center justify-center p-0 shrink-0 shadow-sm border border-white">
        <img
          src={logoImg}
          className="w-full h-full object-cover object-left"
          alt="STHEER Swan"
        />
      </div>
      
      {showText && (
        <span className={`font-montserrat font-extrabold text-[17px] md:text-[19px] tracking-[0.03em] uppercase ${getTextColorClass()}`}>
          STHEER
        </span>
      )}
    </div>
  );
};

export default Logo;
