import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import AppNavigator from './navigation/navigator';
import { UserComponent } from './components/user/interface';
import { LearningComponent } from './components/learning/interface';
import { EngagementComponent } from './components/engagement/interface';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './store';
import NetInfo from '@react-native-community/netinfo';
import Toaster from './components/common/components/toaster';
import CryptoJS from 'crypto-js';

const Mediator: React.FC = () => {
  const [initialRoute, setInitialRoute] = useState<'Welcome' | 'Home' | null>(null);
  const dispatch: AppDispatch = useDispatch();
  const [toastMessage, setToastMessage] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const [serverFailed, setServerFailed] = useState(false);

  useEffect(() => {
    let lastState: boolean | null = null;
    let hasBeenDisconnected = false;

    const unsubscribe = NetInfo.addEventListener(state => {
      const isConnected = !!state.isConnected;

      if (lastState !== null && lastState !== isConnected) {
        if (isConnected) {
          // connection established event should only fire after a network connection lost event
          if (hasBeenDisconnected) {
            setToastMessage('Connection established');
            setToastVisible(true);
          }
        } else {
          hasBeenDisconnected = true;
          setToastMessage('Network connection lost');
          setToastVisible(true);
        }
      }
      lastState = isConnected;
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const initialize = async () => {
      try {
        const userComponent = new UserComponent();
        const user = await userComponent.hydrateUser();

        // Perform first-launch HMAC authentication challenge to verify server integrity
        const bodyStr = '';
        const nonce = Math.random().toString(36).substring(7);
        const timestamp = Date.now().toString();
        const secret = 'test-secret'; // aligned with JWT_SECRET fallback
        const message = nonce + timestamp + bodyStr;
        const signature = CryptoJS.HmacSHA256(message, secret).toString();

        // Challenge check to server index/homepage
        const response = await fetch('http://localhost:3000/api/', {
          method: 'GET',
          headers: {
            'x-client-signature': signature,
            'x-client-nonce': nonce,
            'x-client-timestamp': timestamp,
          }
        });

        if (!response.ok && response.status !== 404) {
          throw new Error('HMAC authenticity challenge failed');
        }

        if (user) {
          // User exists, hydrate other components and go to Home
          const learningComponent = new LearningComponent();
          const engagementComponent = new EngagementComponent();

          await Promise.all([
              learningComponent.hydrate(dispatch),
              engagementComponent.hydrate(dispatch),
          ]);

          setInitialRoute('Home');
        } else {
          // No user found, go to Welcome screen
          setInitialRoute('Welcome');
        }
      } catch (err) {
        console.error('[Mediator] Initial launch authentication/connection failed:', err);
        setServerFailed(true);
      }
    };

    initialize();
  }, [dispatch]);

  if (serverFailed) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#fff' }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#E53E3E', marginBottom: 15, textAlign: 'center' }}>
          Server Connection Failed
        </Text>
        <Text style={{ fontSize: 16, color: '#666', textAlign: 'center', marginBottom: 25 }}>
          We were unable to verify authenticity or establish a connection with the server. For a genuine client, please visit our official upstream GitHub repository:
        </Text>
        <Text style={{ fontSize: 16, color: '#0070f3', fontWeight: 'bold', textAlign: 'center' }}>
          https://github.com/vikkyhawthorne-ops/dsa-mcq
        </Text>
      </View>
    );
  }

  if (!initialRoute) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <AppNavigator initialRouteName={initialRoute} />
      <Toaster
        message={toastMessage}
        visible={toastVisible}
        onHide={() => setToastVisible(false)}
      />
    </View>
  );
};

export default Mediator;
