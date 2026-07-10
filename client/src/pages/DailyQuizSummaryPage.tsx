import React from 'react';

interface DailyQuizSummaryPageProps {
  navigate: (route: string, params?: any) => void;
}

export const DailyQuizSummaryPage: React.FC<DailyQuizSummaryPageProps> = ({ navigate }) => {
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '500px', margin: '50px auto', textAlign: 'center', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h2>Daily Quiz Results</h2>
      <div style={{ margin: '30px 0' }}>
        <h1 style={{ fontSize: '48px', color: '#4CAF50', margin: '0' }}>+50 XP</h1>
        <p style={{ color: '#666' }}>You answered all questions correctly today!</p>
      </div>
      <button
        onClick={() => navigate('Home')}
        style={{ padding: '12px 24px', backgroundColor: '#00B5D8', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
      >
        Go to Home
      </button>
    </div>
  );
};

export default DailyQuizSummaryPage;
