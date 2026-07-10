import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store';
import { setUserEngagementDb } from '../store/userEngagement.slice';

const UserScore = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const userId = currentUser?.id;

  const score = useSelector((state: RootState) =>
    userId && state.engagement.userEngagement ? state.engagement.userEngagement.engagements[userId]?.xp_progress : 0
  );

  useEffect(() => {
      if (userId) {
          dispatch(setUserEngagementDb(userId));
      }
  }, [dispatch, userId]);

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      backgroundColor: '#20303C',
      borderRadius: '12px',
      padding: '6px 12px',
      color: '#fff',
      fontFamily: 'sans-serif'
    }}>
      <span style={{ fontSize: '16px', marginRight: '6px' }}>💎</span>
      <span style={{ fontWeight: 'bold', fontSize: '16px' }}>{score || 0}</span>
    </div>
  );
};

export default UserScore;
