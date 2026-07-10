import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { loginUser, registerUser } from '../components/user/store/user.slice';

interface AuthPageProps {
  navigate: (route: string, params?: any) => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ navigate }) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const dispatch: AppDispatch = useDispatch();
  const { currentUser, loading, error } = useSelector((state: RootState) => state.pages.auth);
  const userState = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (userState.currentUser) {
      navigate('Home');
    }
  }, [userState.currentUser, navigate]);

  useEffect(() => {
    if (userState.error) {
      setErrorMessage(userState.error);
    }
  }, [userState.error]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email || !password) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    if (activeTab === 'login') {
      dispatch(loginUser({ email, password }));
    } else {
      if (!fullName) {
        setErrorMessage('Full name is required.');
        return;
      }
      if (password !== confirmPassword) {
        setErrorMessage('Passwords do not match.');
        return;
      }
      dispatch(registerUser({ fullName, email, password }));
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', fontFamily: 'sans-serif', backgroundColor: '#F0F2F5' }}>
      <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', width: '100%', maxWidth: '400px' }}>
        <div style={{ display: 'flex', marginBottom: '24px', borderBottom: '1px solid #eee' }}>
          <button
            onClick={() => { setActiveTab('login'); setErrorMessage(null); }}
            style={{ flex: 1, padding: '10px', background: 'none', border: 'none', borderBottom: activeTab === 'login' ? '3px solid #00B5D8' : 'none', fontWeight: activeTab === 'login' ? 'bold' : 'normal', cursor: 'pointer' }}
          >
            Login
          </button>
          <button
            onClick={() => { setActiveTab('register'); setErrorMessage(null); }}
            style={{ flex: 1, padding: '10px', background: 'none', border: 'none', borderBottom: activeTab === 'register' ? '3px solid #00B5D8' : 'none', fontWeight: activeTab === 'register' ? 'bold' : 'normal', cursor: 'pointer' }}
          >
            Register
          </button>
        </div>

        {errorMessage && (
          <div style={{ color: 'red', backgroundColor: '#FFEEEE', padding: '10px', borderRadius: '4px', marginBottom: '15px', fontSize: '14px' }}>
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {activeTab === 'register' && (
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '14px' }}>Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}
                placeholder="John Doe"
              />
            </div>
          )}

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '14px' }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}
              placeholder="you@example.com"
              required
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '14px' }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}
              placeholder="••••••"
              required
            />
          </div>

          {activeTab === 'register' && (
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '14px' }}>Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}
                placeholder="••••••"
                required
              />
            </div>
          )}

          <button
            type="submit"
            disabled={userState.loading}
            style={{ width: '100%', padding: '12px', backgroundColor: '#00B5D8', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}
          >
            {userState.loading ? 'Processing...' : activeTab === 'login' ? 'Login' : 'Register'}
          </button>
        </form>

        {activeTab === 'login' && (
          <div style={{ textAlign: 'center', marginTop: '15px' }}>
            <button
              onClick={() => navigate('ForgotPassword')}
              style={{ background: 'none', border: 'none', color: '#00B5D8', cursor: 'pointer', fontSize: '14px' }}
            >
              Forgot Password?
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
