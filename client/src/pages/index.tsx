import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { fetchUserProfile } from '../components/user/store/user.slice';

// Import our migrated components
import UserProfileSummary from '../components/user/components/UserProfileSummary';
import UserScore from '../components/engagement/components/UserScore';
import WeeklyKingOfQuiz from '../components/engagement/components/WeeklyKingOfQuiz';
import DailyQuizBanner from '../components/learning/components/DailyQuizBanner';
import FeaturedCategories from '../components/learning/components/FeaturedCategories';
import RecentQuizzes from '../components/learning/components/RecentQuizzes';
import AdComponent from '../components/common/components/AdComponent';
import BottomNav from '../components/common/components/BottomNav';

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
    <div style={{ padding: '20px', fontFamily: 'sans-serif', backgroundColor: '#F5F5F5', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', padding: '0 18px' }}>
        <div>
          {/* Render UserScore Component */}
          <UserScore />
        </div>
        <div>
          {/* Render UserProfileSummary Component */}
          <UserProfileSummary
            fullName={currentUser?.fullName || ''}
            xp={currentUser?.xp || 0}
          />
        </div>
      </header>

      <main style={{ maxWidth: '600px', margin: '0 auto', width: '100%', flex: 1 }}>
        {/* Render WeeklyKingOfQuiz Component */}
        <WeeklyKingOfQuiz navigate={navigate} />

        {/* Render DailyQuizBanner Component */}
        <DailyQuizBanner navigate={navigate} />

        {/* Render Ad Component */}
        <AdComponent />

        {/* Render FeaturedCategories Component */}
        <FeaturedCategories />

        {/* Render RecentQuizzes Component */}
        <RecentQuizzes navigate={navigate} />

        <div style={{ textAlign: 'center', marginTop: '30px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button
            onClick={() => navigate('Goal')}
            style={{ background: '#fff', border: '1px solid #ccc', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Set Daily Goals
          </button>
        </div>
      </main>

      {/* Render Bottom Nav Component */}
      <BottomNav navigate={navigate} activeScreen="Home" />
    </div>
  );
};

export default HomePage;
