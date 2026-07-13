import React from 'react';
import Link from 'next/link';

export default function Custom404() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>404</h1>
      <h2 style={styles.subtitle}>Page Not Found</h2>
      <p style={styles.text}>The route you are trying to access does not exist or has been moved.</p>
      <Link href="/" style={styles.link}>
        Go Back Home
      </Link>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    fontFamily: 'system-ui, sans-serif',
    backgroundColor: '#f8f9fa',
    color: '#333',
    textAlign: 'center' as const,
    padding: '20px',
  },
  title: {
    fontSize: '72px',
    fontWeight: 'bold' as const,
    margin: '0',
    color: '#E53E3E',
  },
  subtitle: {
    fontSize: '24px',
    margin: '10px 0 20px 0',
  },
  text: {
    fontSize: '16px',
    color: '#666',
    maxWidth: '400px',
    marginBottom: '30px',
  },
  link: {
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#0070f3',
    padding: '12px 24px',
    borderRadius: '5px',
    textDecoration: 'none',
    fontWeight: 'bold' as const,
    transition: 'background-color 0.2s',
  },
};
