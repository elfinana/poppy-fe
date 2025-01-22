'use client';

import '../styles/globals.css';
import localFont from 'next/font/local';
import { ReactQueryProvider } from './ReactQueryProvider';
import { Toaster } from '@/src/shared/ui/toaster';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import React from 'react';

const pretendard = localFont({
  src: '../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const onMessageFCM = async () => {
    // 브라우저에 알림 권한 요청
    alert('before Nofitication');
    console.log('before Nofitication');
    const permission = await Notification.requestPermission();
    alert('after Nofitication');
    console.log('before Nofitication');
    if (permission !== 'granted') return;
    alert('after permission');
    console.log('before Nofitication');

    const firebaseApp = initializeApp({
      apiKey: 'AIzaSyBGXNBcviukgio0Njtui32shfJwYi2ps2A',
      authDomain: 'poppy-73a6b.firebaseapp.com',
      projectId: 'poppy-73a6b',
      storageBucket: 'poppy-73a6b.firebasestorage.app',
      messagingSenderId: '1062790020599',
      appId: '1:1062790020599:web:bda0f53b46901e554f82f2',
      measurementId: 'G-DVQ5EY1537',
    });

    const messaging = getMessaging(firebaseApp);

    // 인증서 키 값
    getToken(messaging, {
      vapidKey: 'BP2eU85OdewkPae1lpsyCbw3DKhPDT0Yzjj2yNtTIf3kXm3-nRDUQZF5y-wztFG95n4SHkJR_NnHlWgMhAkGNns',
    })
      .then(currentToken => {
        if (currentToken) {
          localStorage.setItem('device', currentToken);
        } else {
          console.error('No registration token available. Request permission to generate one.');
        }
      })
      .catch(err => {
        console.error('An error occurred while retrieving token. ', err);
        // router.refresh();
      });

    onMessage(messaging, payload => {
      console.log('Message received. ', payload);
    });
  };

  React.useEffect(() => {
    onMessageFCM();
  }, []);

  return (
    <ReactQueryProvider>
      <html lang="en">
        <body className={`min-w-[320px] h-screen max-w-[780px] ${pretendard.variable} font-pretendard`}>
          {children}
          <Toaster />
        </body>
      </html>
    </ReactQueryProvider>
  );
}
