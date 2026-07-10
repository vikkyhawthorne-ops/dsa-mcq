import React from 'react';

interface SessionSummaryPageProps {
  navigate: (route: string, params?: any) => void;
}

export const SessionSummaryPage: React.FC<SessionSummaryPageProps> = ({ navigate }) => {
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '500px', margin: '50px auto', textAlign: 'center', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
      <h2 style={{ color: '#4CAF50' }}>Session Completed!</h2>
      <p style={{ margin: '20px 0', fontSize: '18px', color: '#555' }}>Excellent effort on today's DSA concepts.</p>

      <div style={{ display: 'flex', justifyContent: 'space-around', margin: '30px 0', backgroundColor: '#F9F9F9', padding: '20px', borderRadius: '8px' }}>
        <div>
          <h3 style={{ margin: 0, fontSize: '28px', color: '#333' }}>2/2</h3>
          <span style={{ fontSize: '13px', color: '#777' }}>Score</span>
        </div>
        <div>
          <h3 style={{ margin: 0, fontSize: '28px', color: '#FF7A3C' }}>+30</h3>
          <span style={{ fontSize: '13px', color: '#777' }}>XP Points</span>
        </div>
      </div>

      <button
        onClick={() => navigate('Home')}
        style={{ width: '100%', padding: '12px', backgroundColor: '#00B5D8', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}
      >
        Continue
      </button>
    </div>
  );
};

export default SessionSummaryPage;
