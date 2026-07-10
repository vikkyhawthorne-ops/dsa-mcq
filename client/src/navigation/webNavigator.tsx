import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setSharedState } from '../store/sharedState.slice';

// Import all our page components
import Welcome from '../Welcome.web';
import HomePage from '../pages/index';
import AuthPage from '../pages/AuthPage';
import AchievementPage from '../pages/AchievementPage';
import BookmarkPage from '../pages/BookmarkPage';
import DailyQuizPage from '../pages/DailyQuizPage';
import DailyQuizSummaryPage from '../pages/DailyQuizSummaryPage';
import ForgotPasswordPage from '../pages/ForgotPasswordPage';
import GoalPage from '../pages/GoalPage';
import PasswordResetPage from '../pages/PasswordResetPage';
import QuizPage from '../pages/QuizPage';
import SessionSummaryPage from '../pages/SessionSummaryPage';
import UserProfilePage from '../pages/UserProfilePage';

export const WebNavigator: React.FC = () => {
  const dispatch = useDispatch();

  // Read current route from mediator state (defaults to 'Welcome')
  const currentRoute = useSelector((state: RootState) => state.mediator.sharedState.currentRoute || 'Welcome');
  const routeParams = useSelector((state: RootState) => state.mediator.sharedState.routeParams || {});

  const navigate = (route: string, params?: any) => {
    dispatch(setSharedState({ key: 'currentRoute', value: route }));
    dispatch(setSharedState({ key: 'routeParams', value: params || {} }));
  };

  const renderScreen = () => {
    switch (currentRoute) {
      case 'Welcome':
        return <Welcome navigate={navigate} />;
      case 'Home':
        return <HomePage navigate={navigate} />;
      case 'Auth':
        return <AuthPage navigate={navigate} />;
      case 'Achievement':
        return <AchievementPage navigate={navigate} />;
      case 'Bookmark':
        return <BookmarkPage navigate={navigate} />;
      case 'DailyQuiz':
        return <DailyQuizPage navigate={navigate} />;
      case 'DailyQuizSummary':
        return <DailyQuizSummaryPage navigate={navigate} />;
      case 'ForgotPassword':
        return <ForgotPasswordPage navigate={navigate} />;
      case 'Goal':
        return <GoalPage navigate={navigate} />;
      case 'PasswordReset':
        return <PasswordResetPage navigate={navigate} />;
      case 'Quiz':
        return <QuizPage navigate={navigate} params={routeParams} />;
      case 'SessionSummary':
        return <SessionSummaryPage navigate={navigate} />;
      case 'Profile':
        return <UserProfilePage navigate={navigate} />;
      default:
        return <Welcome navigate={navigate} />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fafafa' }}>
      {renderScreen()}
    </div>
  );
};

export default WebNavigator;
