import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { logoutUser } from '../components/user/store/user.slice';

interface UserProfilePageProps {
  navigate: (route: string, params?: any) => void;
}

export const UserProfilePage: React.FC<UserProfilePageProps> = ({ navigate }) => {
  const dispatch: AppDispatch = useDispatch();
  const { currentUser } = useSelector((state: RootState) => state.user);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate('Welcome');
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '500px', margin: '30px auto', border: '1px solid #ddd', borderRadius: '8px' }}>
      <button onClick={() => navigate('Home')} style={{ marginBottom: '20px', cursor: 'pointer', background: 'none', border: '1px solid #ccc', padding: '6px 12px', borderRadius: '4px' }}>← Home</button>
      <h2>Profile & Settings</h2>
      {currentUser && (
        <div style={{ margin: '20px 0', borderBottom: '1px solid #eee', paddingBottom: '20px' }}>
          <p><strong>Name:</strong> {currentUser.fullName}</p>
          <p><strong>Email:</strong> {currentUser.email}</p>
          <p><strong>Level:</strong> {currentUser.level || 1}</p>
          <p><strong>XP:</strong> {currentUser.xp || 0}</p>
        </div>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <button
          onClick={() => navigate('PasswordReset')}
          style={{ padding: '12px', border: '1px solid #ccc', background: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Change Password
        </button>
        <button
          onClick={handleLogout}
          style={{ padding: '12px', backgroundColor: '#d9534f', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserProfilePage;
