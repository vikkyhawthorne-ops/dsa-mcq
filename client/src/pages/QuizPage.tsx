import React, { useState, useEffect } from 'react';

interface QuizPageProps {
  navigate: (route: string, params?: any) => void;
  params?: any;
}

export const QuizPage: React.FC<QuizPageProps> = ({ navigate, params }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);

  const mockQuestions = [
    {
      question: "Which data structure is typically used to implement a Breadth-First Search (BFS)?",
      options: ["Stack", "Queue", "Priority Queue", "BST"],
      correct: 1,
    },
    {
      question: "What is the worst-case time complexity of Quick Sort?",
      options: ["O(n log n)", "O(n)", "O(n²)", "O(2ⁿ)"],
      correct: 2,
    }
  ];

  const handleNext = () => {
    if (selectedOpt === null) return;

    if (currentIdx < mockQuestions.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setSelectedOpt(null);
    } else {
      navigate('SessionSummary');
    }
  };

  const handleExit = () => {
    if (window.confirm('Are you sure you want to exit the quiz? Progress will be lost.')) {
      navigate('Home');
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '600px', margin: '30px auto', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', backgroundColor: '#fff' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '20px' }}>
        <button onClick={handleExit} style={{ padding: '6px 12px', cursor: 'pointer', border: '1px solid #ccc', borderRadius: '4px', background: 'none' }}>Exit</button>
        <span style={{ fontWeight: 'bold' }}>Question {currentIdx + 1} of {mockQuestions.length}</span>
      </div>

      <h3 style={{ marginBottom: '25px', color: '#333' }}>{mockQuestions[currentIdx].question}</h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '30px' }}>
        {mockQuestions[currentIdx].options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedOpt(idx)}
            style={{
              padding: '12px',
              textAlign: 'left',
              border: selectedOpt === idx ? '2px solid #00B5D8' : '1px solid #ddd',
              backgroundColor: selectedOpt === idx ? '#EEFCFF' : '#fff',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '15px'
            }}
          >
            {opt}
          </button>
        ))}
      </div>

      <button
        onClick={handleNext}
        disabled={selectedOpt === null}
        style={{
          width: '100%',
          padding: '14px',
          backgroundColor: selectedOpt === null ? '#ccc' : '#00B5D8',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          fontWeight: 'bold',
          cursor: selectedOpt === null ? 'not-allowed' : 'pointer'
        }}
      >
        {currentIdx === mockQuestions.length - 1 ? 'Finish Quiz' : 'Next Question'}
      </button>
    </div>
  );
};

export default QuizPage;
