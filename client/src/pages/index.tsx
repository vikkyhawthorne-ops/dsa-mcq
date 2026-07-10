import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { fetchUserProfile } from '../components/user/store/user.slice';

interface HomePageProps {
  navigate: (route: string, params?: any) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ navigate }) => {
  const dispatch: AppDispatch = useDispatch();
  const { currentUser } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (currentUser) {
      dispatch(fetchUserProfile());
    } else {
      navigate('Welcome');
    }
  }, [dispatch, currentUser?.id]);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', backgroundColor: '#F5F5F5', minHeight: '100vh' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h2>DSA-MCQ Web</h2>
        </div>
        {currentUser && (
          <div style={{ textAlign: 'right' }}>
            <strong>{currentUser.fullName}</strong>
            <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>{currentUser.xp || 0} XP (Level {currentUser.level || 1})</p>
          </div>
        )}
      </header>

      <main style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ backgroundColor: '#fff', borderRadius: '8px', padding: '20px', marginBottom: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3>Weekly King of Quiz</h3>
          <p>Compete and conquer the leaderboards!</p>
          <button
            onClick={() => navigate('Achievement')}
            style={{ backgroundColor: '#00B5D8', color: '#fff', border: 'none', padding: '10px 15px', borderRadius: '4px', cursor: 'pointer' }}
          >
            View Achievements
          </button>
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: '8px', padding: '20px', marginBottom: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3>Daily Quiz</h3>
          <p>Test your skills with today's challenge!</p>
          <button
            onClick={() => navigate('DailyQuiz')}
            style={{ backgroundColor: '#FF7A3C', color: '#fff', border: 'none', padding: '10px 15px', borderRadius: '4px', cursor: 'pointer' }}
          >
            Take Daily Quiz
          </button>
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: '8px', padding: '20px', marginBottom: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3>Featured Categories</h3>
          <p>Browse DSA topics: Arrays, Linked Lists, Trees, Graphs, Dynamic Programming.</p>
          <button
            onClick={() => navigate('Bookmark')}
            style={{ backgroundColor: '#4CAF50', color: '#fff', border: 'none', padding: '10px 15px', borderRadius: '4px', cursor: 'pointer' }}
          >
            My Bookmarks
          </button>
        </div>

        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <button
            onClick={() => navigate('Profile')}
            style={{ background: 'none', border: '1px solid #ccc', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', marginRight: '10px' }}
          >
            Profile & Settings
          </button>
          <button
            onClick={() => navigate('Goal')}
            style={{ background: 'none', border: '1px solid #ccc', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}
          >
            Set Daily Goals
          </button>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
