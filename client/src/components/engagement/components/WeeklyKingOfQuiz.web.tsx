import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

interface WeeklyKingOfQuizProps {
  navigate?: (route: string) => void;
}

const WeeklyKingOfQuiz: React.FC<WeeklyKingOfQuizProps> = ({ navigate }) => {
  const king = useSelector((state: RootState) => state.engagement.globalEngagement.engagement.weeklyKingOfQuiz);

  if (!king) {
    return (
      <div style={{ padding: '18px', textAlign: 'center', fontFamily: 'sans-serif' }}>
        <p>Loading...</p>
      </div>
    );
  }

  const handlePress = () => {
    if (navigate) navigate('Achievement');
  };

  return (
    <div
      onClick={handlePress}
      style={{
        backgroundColor: '#9B59B6',
        borderRadius: '20px',
        margin: '18px',
        padding: '18px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: '#fff',
        fontFamily: 'sans-serif',
        cursor: 'pointer',
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
      }}
    >
      <div>
        <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 'normal', opacity: 0.9 }}>This week's</h4>
        <h3 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold' }}>King of the Quiz</h3>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img
          src={king.avatar}
          alt={king.name}
          style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #fff' }}
        />
        <span style={{ fontWeight: 'bold', fontSize: '14px', marginTop: '4px' }}>{king.name}</span>
        <div style={{ display: 'flex', alignItems: 'center', fontSize: '13px', color: '#FFBE0B', fontWeight: 'bold' }}>
          <span>💎 {king.score} diamonds</span>
        </div>
      </div>
    </div>
  );
};

export default WeeklyKingOfQuiz;
