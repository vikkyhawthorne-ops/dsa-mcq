import React, { useState } from 'react';

interface GoalPageProps {
  navigate: (route: string, params?: any) => void;
}

export const GoalPage: React.FC<GoalPageProps> = ({ navigate }) => {
  const [goalXp, setGoalXp] = useState(100);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '500px', margin: '50px auto', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
      <h2>Set Daily Goals</h2>
      <p style={{ color: '#666', marginBottom: '20px' }}>Define your daily learning targets to stay motivated and keep up your streak!</p>

      <div style={{ marginBottom: '25px' }}>
        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '10px' }}>Daily XP Target: {goalXp} XP</label>
        <input
          type="range"
          min="50"
          max="500"
          step="50"
          value={goalXp}
          onChange={(e) => setGoalXp(Number(e.target.value))}
          style={{ width: '100%' }}
        />
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          onClick={() => navigate('Home')}
          style={{ flex: 1, padding: '12px', border: '1px solid #ccc', background: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Cancel
        </button>
        <button
          onClick={() => { alert('Goals saved successfully!'); navigate('Home'); }}
          style={{ flex: 1, padding: '12px', backgroundColor: '#00B5D8', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Save Goals
        </button>
      </div>
    </div>
  );
};

export default GoalPage;
