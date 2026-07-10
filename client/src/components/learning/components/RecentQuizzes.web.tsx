import React from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { RootState } from '../../../store';

interface RecentQuizzesProps {
  navigate?: (route: string) => void;
}

const selectRecentQuizzesEntities = (state: RootState) => state.learning.recentQuizzes.entities;

const selectRecentQuizzes = createSelector(
    [selectRecentQuizzesEntities],
    (entities) => Object.values(entities)
);

const RecentQuizzes: React.FC<RecentQuizzesProps> = ({ navigate }) => {
    const recentQuizzes = useSelector(selectRecentQuizzes);

    const handleSeeAll = () => {
        if (navigate) navigate('Achievement');
    };

    return (
        <div style={{ marginTop: '28px', marginHorizontal: '18px', fontFamily: 'sans-serif' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#212121', margin: 0 }}>Recent Quiz</h3>
                <button
                    onClick={handleSeeAll}
                    style={{ border: 'none', background: 'none', color: '#FF7A3C', fontWeight: 'bold', cursor: 'pointer' }}
                >
                    See All
                </button>
            </div>
            {recentQuizzes.map((quiz, index) => (
                <div
                    key={quiz.id}
                    onClick={handleSeeAll}
                    style={{
                        marginBottom: '12px',
                        backgroundColor: 'white',
                        borderRadius: '20px',
                        padding: '16px 20px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                        border: '1px solid #eee',
                        cursor: 'pointer'
                    }}
                >
                    <div>
                        <h4 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: 'bold' }}>{quiz.name}</h4>
                        <span style={{ fontSize: '14px', color: '#757575' }}>Score: {quiz.score}/{quiz.totalQuestions}</span>
                    </div>
                    <button
                        onClick={(e) => { e.stopPropagation(); console.log('Retake pressed'); }}
                        style={{
                            backgroundColor: '#FF7A3C',
                            color: '#fff',
                            border: 'none',
                            padding: '8px 16px',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            fontWeight: 'bold'
                        }}
                    >
                        Retake
                    </button>
                </div>
            ))}
            {recentQuizzes.length === 0 && (
                <div style={{ color: '#666', fontSize: '14px', padding: '10px 0' }}>No recent quizzes found.</div>
            )}
        </div>
    );
};

export default RecentQuizzes;
