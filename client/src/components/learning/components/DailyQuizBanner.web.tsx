import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

interface DailyQuizBannerProps {
  navigate?: (route: string) => void;
}

const DailyQuizBanner: React.FC<DailyQuizBannerProps> = ({ navigate }) => {
  const dailyQuiz = useSelector((state: RootState) => state.engagement.globalEngagement.engagement.dailyQuiz);

  const handleJoinQuiz = () => {
    if (navigate) navigate('DailyQuiz');
  };

  if (!dailyQuiz) {
    return null;
  }

  return (
    <div style={{ padding: '0 18px', marginTop: '18px', fontFamily: 'sans-serif' }}>
      <div style={{
        backgroundColor: '#FFB74D',
        borderRadius: '20px',
        padding: '18px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: '#fff',
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
      }}>
        <div>
          <h3 style={{ margin: '0 0 4px 0', fontSize: '18px', fontWeight: 'bold' }}>{dailyQuiz.title}</h3>
          <p style={{ margin: '0 0 10px 0', fontSize: '14px', opacity: 0.9 }}>{dailyQuiz.description}</p>
          <button
            onClick={handleJoinQuiz}
            style={{
              backgroundColor: '#F57C00',
              color: 'white',
              border: 'none',
              padding: '6px 16px',
              borderRadius: '12px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '14px'
            }}
          >
            Join a quiz
          </button>
        </div>
        <div style={{ fontSize: '48px' }}>❓</div>
      </div>
    </div>
  );
};

export default DailyQuizBanner;
