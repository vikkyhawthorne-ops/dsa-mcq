import React from 'react';

export type UserProfileSummaryProps = {
  fullName?: string;
  xp?: number;
};

const UserProfileSummary: React.FC<UserProfileSummaryProps> = ({
  fullName,
  xp,
}) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', fontFamily: 'sans-serif' }}>
      <div style={{
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        backgroundColor: '#4CAF50',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: '10px',
        color: '#fff',
        fontSize: '20px'
      }}>
        👤
      </div>
      <div style={{ textAlign: 'left' }}>
        <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 'bold' }}>Hello, {fullName}</h4>
        <p style={{ margin: 0, fontSize: '13px', color: '#666' }}>{xp} XP</p>
      </div>
    </div>
  );
};

export default UserProfileSummary;
