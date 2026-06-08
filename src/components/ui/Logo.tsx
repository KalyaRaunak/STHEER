import React from 'react';
import logoImg from '../../assets/logo.png';

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
  const getFilterStyle = () => {
    switch (variant) {
      case 'yellow':
        return { filter: 'invert(80%) sepia(70%) saturate(1200%) hue-rotate(350deg) brightness(1.2)' };
      case 'white':
        return { filter: 'invert(1) brightness(2)' };
      case 'black':
      default:
        return {};
    }
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Custom Swan Logo Image */}
      <img
        src={logoImg}
        className="w-8 h-8 md:w-9 md:h-9 object-contain rounded-[4px] mix-blend-lighten"
        style={getFilterStyle()}
        alt="STHEER Logo"
      />
      
      {showText && (
        <span className="font-montserrat font-extrabold text-lg md:text-xl tracking-[-0.03em] uppercase text-brand-white">
          Stheer
        </span>
      )}
    </div>
  );
};

export default Logo;
