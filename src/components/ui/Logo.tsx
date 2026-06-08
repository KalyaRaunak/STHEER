import React from 'react';

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
  const getColorClass = () => {
    switch (variant) {
      case 'yellow':
        return 'text-brand-yellow';
      case 'black':
        return 'text-brand-black';
      case 'current':
        return 'text-current';
      case 'white':
      default:
        return 'text-brand-white';
    }
  };

  return (
    <div className={`flex items-center gap-3 select-none ${getColorClass()} ${className}`}>
      {/* Swan S-mark SVG */}
      <svg
        viewBox="0 0 100 100"
        className="w-8 h-8 md:w-9 md:h-9"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Sleek, premium geometric swan forming an "S" */}
        <path
          d="M 55,15 C 38,15 32,25 32,32 C 32,36 35,38 38,38 C 42,38 41,32 52,32 C 61,32 63,36 63,40 C 63,52 32,54 32,71 C 32,82 42,85 54,85 C 69,85 73,77 73,72 C 73,69 70,68 68,69 C 65,70.5 65,76 55,76 C 46,76 42,72 42,67 C 42,59 73,57 73,40 C 73,26 66,15 55,15 Z"
          className="transition-colors duration-300"
        />
        {/* Small minimalist dot/eye representing the swan head detail */}
        <circle cx="38" cy="28" r="3.5" className="fill-current opacity-80" />
      </svg>
      
      {showText && (
        <span className="font-montserrat font-extrabold text-lg md:text-xl tracking-[-0.03em] uppercase">
          Stheer
        </span>
      )}
    </div>
  );
};

export default Logo;
