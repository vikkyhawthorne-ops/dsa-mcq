import React from 'react';

interface BookmarkPageProps {
  navigate: (route: string, params?: any) => void;
}

export const BookmarkPage: React.FC<BookmarkPageProps> = ({ navigate }) => {
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <button onClick={() => navigate('Home')} style={{ marginBottom: '20px', cursor: 'pointer' }}>← Back to Home</button>
      <h2>My Bookmarks</h2>
      <p style={{ color: '#666' }}>No bookmarked questions yet. Bookmark questions during quizzes to save them here.</p>
    </div>
  );
};

export default BookmarkPage;
