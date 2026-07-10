import React, { useState } from 'react';

interface ForgotPasswordPageProps {
  navigate: (route: string, params?: any) => void;
}

export const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = ({ navigate }) => {
  const [email, setEmail] = useState('');
  const [isSent, setIsSuccess] = useState(false);

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSuccess(true);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', fontFamily: 'sans-serif', backgroundColor: '#F0F2F5' }}>
      <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', width: '100%', maxWidth: '400px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Forgot Password</h2>
        {isSent ? (
          <div style={{ textAlign: 'center' }}>
            <p style={{ color: 'green', backgroundColor: '#EEFFEE', padding: '15px', borderRadius: '4px', marginBottom: '20px' }}>
              Reset instructions have been sent to your email.
            </p>
            <button
              onClick={() => navigate('Auth')}
              style={{ width: '100%', padding: '12px', backgroundColor: '#00B5D8', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}
            >
              Back to Login
            </button>
          </div>
        ) : (
          <form onSubmit={handleReset}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '14px' }}>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}
                placeholder="you@example.com"
                required
              />
            </div>
            <button
              type="submit"
              style={{ width: '100%', padding: '12px', backgroundColor: '#00B5D8', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}
            >
              Send Reset Instructions
            </button>
            <button
              type="button"
              onClick={() => navigate('Auth')}
              style={{ width: '100%', padding: '12px', marginTop: '10px', border: '1px solid #ccc', background: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Cancel
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
