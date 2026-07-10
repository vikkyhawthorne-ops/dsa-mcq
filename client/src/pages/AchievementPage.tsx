import React from 'react';

interface AchievementPageProps {
  navigate: (route: string, params?: any) => void;
}

export const AchievementPage: React.FC<AchievementPageProps> = ({ navigate }) => {
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <button onClick={() => navigate('Home')} style={{ marginBottom: '20px', cursor: 'pointer' }}>← Back to Home</button>
      <h2>My Achievements</h2>
      <div style={{ backgroundColor: '#fff', borderRadius: '8px', padding: '15px', border: '1px solid #ddd', marginBottom: '15px' }}>
        <h3>🏆 First Steps</h3>
        <p>Complete your first daily quiz challenge successfully.</p>
        <span style={{ backgroundColor: '#E2F0D9', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', color: '#385723' }}>Unlocked</span>
      </div>
      <div style={{ backgroundColor: '#fff', borderRadius: '8px', padding: '15px', border: '1px solid #ddd', marginBottom: '15px' }}>
        <h3>🔥 7-Day Streak</h3>
        <p>Participate in the Daily Quiz 7 days in a row.</p>
        <span style={{ backgroundColor: '#FFF2CC', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', color: '#7F6000' }}>In Progress</span>
      </div>
    </div>
  );
};

export default AchievementPage;
