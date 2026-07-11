import React from 'react';

export const BlurView: React.FC<any> = ({ children, style, blurAmount = 10, blurType = 'light' }) => {
  const backdropFilter = `blur(${blurAmount}px)`;
  const backgroundColor = blurType === 'dark' ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.3)';
  return (
    <div style={{ backdropFilter, WebkitBackdropFilter: backdropFilter, backgroundColor, ...style }}>
      {children}
    </div>
  );
};

export const VibrancyView = BlurView;
export default BlurView;
