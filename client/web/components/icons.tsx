import React from 'react';
import {
  IoChevronBackOutline,
  IoArrowBack,
  IoTimeOutline,
  IoBookmark,
  IoBookmarkOutline,
  IoMailOutline,
  IoLockClosedOutline,
  IoCheckmarkCircleOutline,
  IoCloseOutline,
  IoEllipsisVertical
} from 'react-icons/io5';

export const Icon: React.FC<any> = ({ name, size = 24, color = '#000', style }) => {
  const props = { size, color, style };

  switch (name) {
    case 'chevron-left':
      return <IoChevronBackOutline {...props} />;
    case 'arrow-left':
    case 'arrow-back':
      return <IoArrowBack {...props} />;
    case 'clock-outline':
      return <IoTimeOutline {...props} />;
    case 'bookmark':
      return <IoBookmark {...props} />;
    case 'bookmark-outline':
      return <IoBookmarkOutline {...props} />;
    case 'email-outline':
      return <IoMailOutline {...props} />;
    case 'lock-outline':
      return <IoLockClosedOutline {...props} />;
    case 'check':
    case 'checkmark-circle':
      return <IoCheckmarkCircleOutline {...props} />;
    case 'close':
      return <IoCloseOutline {...props} />;
    case 'dots-vertical':
    case 'ellipsis-vertical':
      return <IoEllipsisVertical {...props} />;
    default:
      // Fallback
      return <IoChevronBackOutline {...props} />;
  }
};

export const Button: React.FC<any> = ({ children, onPress, style }) => (
  <button onClick={onPress} style={{ background: 'transparent', border: 'none', cursor: 'pointer', outline: 'none', padding: 0, ...style }}>
    {children}
  </button>
);

export default Icon;
