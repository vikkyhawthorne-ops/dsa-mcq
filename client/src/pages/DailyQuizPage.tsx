import React from 'react';

interface DailyQuizPageProps {
  navigate: (route: string, params?: any) => void;
}

export const DailyQuizPage: React.FC<DailyQuizPageProps> = ({ navigate }) => {
  const handleStart = () => {
    // Generate dummy question IDs for the quiz page
    navigate('Quiz', { sessionQuestionIds: ['1', '2', '3', '4'] });
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '500px', margin: '50px auto', textAlign: 'center', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
      <h2>Daily Quiz Challenge</h2>
      <p style={{ margin: '20px 0', color: '#555' }}>
        Ready to take today's DSA MCQ Challenge? You will have 2 minutes to answer the questions. Good luck!
      </p>
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <button
          onClick={() => navigate('Home')}
          style={{ padding: '10px 20px', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer', background: 'none' }}
        >
          Cancel
        </button>
        <button
          onClick={handleStart}
          style={{ padding: '10px 20px', backgroundColor: '#FF7A3C', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Start Daily Quiz
        </button>
      </div>
    </div>
  );
};

export default DailyQuizPage;
