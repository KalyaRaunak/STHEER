import React from 'react';

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export const SectionLabel: React.FC<SectionLabelProps> = ({
  children,
  className = '',
}) => {
  return (
    <div
      className={`font-dm-sans font-medium text-[13px] text-brand-yellow uppercase tracking-[0.12em] mb-3 select-none ${className}`}
    >
      {children}
    </div>
  );
};

export default SectionLabel;
