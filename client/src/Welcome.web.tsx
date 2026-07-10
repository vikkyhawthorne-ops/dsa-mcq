import React from 'react';

interface WelcomeProps {
  navigate: (route: string) => void;
}

const Welcome: React.FC<WelcomeProps> = ({ navigate }) => {
  const handleLogin = () => {
    navigate('Auth');
  };

  const handleRegister = () => {
    navigate('Auth');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', fontFamily: 'sans-serif', backgroundColor: '#fff', minHeight: '100vh' }}>
      <div style={{ width: '100%', maxWidth: '500px', marginBottom: '20px', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
        <img
          src="https://images.unsplash.com/photo-1560185008-5a0d6c72c11d"
          alt="NestHouse placeholder"
          style={{ width: '100%', height: '200px', objectFit: 'cover' }}
        />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
        <span style={{ fontSize: '36px', color: '#00B5D8' }}>🏠</span>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 0 0 6px' }}>NestHouse</h2>
      </div>

      <h1 style={{ fontSize: '28px', fontWeight: 'bold', textAlign: 'center', marginBottom: '8px' }}>
        Find Your <span style={{ color: '#00B5D8' }}>Dream</span> Home with Ease
      </h1>
      <p style={{ fontSize: '15px', color: '#888', textAlign: 'center', marginBottom: '24px', maxWidth: '400px' }}>
        NestHouse helps you discover the perfect property tailored to your needs.
      </p>

      <div style={{ display: 'flex', gap: '10px', width: '100%', maxWidth: '400px', marginBottom: '20px' }}>
        <button
          onClick={handleLogin}
          style={{ flex: 1, padding: '12px', backgroundColor: '#00B5D8', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
        >
          Login
        </button>
        <button
          onClick={handleRegister}
          style={{ flex: 1, padding: '12px', backgroundColor: '#007A8D', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
        >
          Register
        </button>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', width: '100%', maxWidth: '400px', marginBottom: '16px' }}>
        <div style={{ flex: 1, height: '1px', backgroundColor: '#E0E0E0' }} />
        <span style={{ margin: '0 8px', fontSize: '12px', color: '#BDBDBD' }}>Or sign in with</span>
        <div style={{ flex: 1, height: '1px', backgroundColor: '#E0E0E0' }} />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '25px', marginBottom: '20px' }}>
        <span style={{ fontSize: '30px', cursor: 'pointer' }}>🌐 Google</span>
        <span style={{ fontSize: '30px', cursor: 'pointer' }}>💻 Github</span>
        <span style={{ fontSize: '30px', cursor: 'pointer' }}>🐦 Twitter</span>
      </div>
    </div>
  );
};

export default Welcome;
