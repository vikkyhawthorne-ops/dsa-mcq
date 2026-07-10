import React from 'react';

interface BottomNavProps {
  navigate: (route: string) => void;
  activeScreen?: string;
}

const BottomNav: React.FC<BottomNavProps> = ({ navigate, activeScreen = 'Home' }) => {
  const navItems = [
    { name: 'Home', icon: '🏠', navigateTo: 'Home' },
    { name: 'Bookmark', icon: '🔖', navigateTo: 'Bookmark' },
    { name: 'Achievement', icon: '🏆', navigateTo: 'Achievement' },
    { name: 'Profile', icon: '👤', navigateTo: 'Profile' },
  ];

  return (
    <div style={{
      display: 'flex',
      backgroundColor: 'white',
      borderRadius: '20px',
      margin: '18px',
      padding: '8px 0',
      boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
      justifyContent: 'space-around',
      fontFamily: 'sans-serif'
    }}>
      {navItems.map((item) => {
        const isActive = activeScreen === item.name;
        const color = isActive ? '#FF7A3C' : '#B0B0B0';

        return (
          <button
            key={item.name}
            onClick={() => navigate(item.navigateTo)}
            style={{
              flex: 1,
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              outline: 'none',
              color: color
            }}
          >
            <span style={{ fontSize: '20px' }}>{item.icon}</span>
            <span style={{ fontSize: '11px', fontWeight: '600', marginTop: '2px' }}>{item.name}</span>
          </button>
        );
      })}
    </div>
  );
};

export default BottomNav;
