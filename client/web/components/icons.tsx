import React from 'react';

export const Icon: React.FC<any> = ({ name, size = 24, color = '#000', style }) => {
  let path = "";
  let viewBox = "0 0 24 24";

  switch (name) {
    case "chevron-left":
    case "arrow-left":
    case "arrow-back":
      path = "M15 19l-7-7 7-7";
      break;
    case "clock-outline":
      path = "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z";
      break;
    case "bookmark":
      path = "M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z";
      break;
    case "bookmark-outline":
      path = "M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5zm2 1.2v11.3l5-2.5 5 2.5V6.2A.8.8 0 0016.2 5H7.8a.8.8 0 00-.8.8z";
      break;
    case "email-outline":
      path = "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z";
      break;
    case "lock-outline":
      path = "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z";
      break;
    case "check":
    case "checkmark-circle":
      path = "M5 13l4 4L19 7";
      break;
    case "close":
      path = "M6 18L18 6M6 6l12 12";
      break;
    case "dots-vertical":
      path = "M12 5h.01M12 12h.01M12 19h.01";
      break;
    default:
      path = "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z";
  }

  return (
    <svg width={size} height={size} viewBox={viewBox} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle', ...style }}>
      <path d={path} />
    </svg>
  );
};

export const Button: React.FC<any> = ({ children, onPress, style }) => (
  <button onClick={onPress} style={{ background: 'transparent', border: 'none', cursor: 'pointer', outline: 'none', padding: 0, ...style }}>
    {children}
  </button>
);

export default Icon;
