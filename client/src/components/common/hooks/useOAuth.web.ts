import { useDispatch } from 'react-redux';
import { loginWithProviderToken, logoutUser } from '../../user/store/user.slice';
import { AppDispatch } from '../../../store';

export const useOAuth = () => {
  const dispatch: AppDispatch = useDispatch();

  const signIn = async (provider: 'google' | 'github' | 'twitter') => {
    if (provider === 'twitter') {
      throw new Error('Twitter login is not supported in this client.');
    }

    try {
      // Clean web-native authentication fallback
      const accessToken = 'web-access-token';
      const result = await dispatch(
        loginWithProviderToken({ provider, token: accessToken })
      ).unwrap();

      return {
        ...result,
        accessToken,
        idToken: 'web-id-token',
      };
    } catch (error) {
      console.error('Web OAuth sign-in failed:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
    } catch (error) {
      console.error('Web OAuth sign-out failed:', error);
      throw error;
    }
  };

  return { signIn, signOut };
};
