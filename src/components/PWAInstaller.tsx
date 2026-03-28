'use client';
import { useEffect } from 'react';

export function PWAInstaller() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/fitness-app/service-worker.js')
        .then(reg => console.log('SW registered', reg))
        .catch(err => console.error('SW registration failed', err));
    }
  }, []);
  return null;
}
