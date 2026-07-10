import React, { useState } from 'react';

interface PasswordResetPageProps {
  navigate: (route: string, params?: any) => void;
}

export const PasswordResetPage: React.FC<PasswordResetPageProps> = ({ navigate }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === confirmPassword && password.length >= 6) {
      setIsSuccess(true);
    } else {
      alert('Passwords must match and be at least 6 characters long.');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', fontFamily: 'sans-serif', backgroundColor: '#F0F2F5' }}>
      <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', width: '100%', maxWidth: '400px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Reset Password</h2>
        {isSuccess ? (
          <div style={{ textAlign: 'center' }}>
            <p style={{ color: 'green', backgroundColor: '#EEFFEE', padding: '15px', borderRadius: '4px', marginBottom: '20px' }}>
              Your password has been successfully reset!
            </p>
            <button
              onClick={() => navigate('Auth')}
              style={{ width: '100%', padding: '12px', backgroundColor: '#00B5D8', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}
            >
              Log in Now
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '14px' }}>New Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}
                placeholder="••••••"
                required
              />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '14px' }}>Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}
                placeholder="••••••"
                required
              />
            </div>
            <button
              type="submit"
              style={{ width: '100%', padding: '12px', backgroundColor: '#00B5D8', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}
            >
              Update Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default PasswordResetPage;
