'use client';

import { useEffect } from 'react';

export default function ServiceWorkerCleanup() {
    useEffect(() => {
        const cleanup = async () => {
            try {
                if ('serviceWorker' in navigator) {
                    const registrations = await navigator.serviceWorker.getRegistrations();
                    await Promise.all(registrations.map((registration) => registration.unregister()));
                }

                if ('caches' in window) {
                    const cacheKeys = await caches.keys();
                    await Promise.all(cacheKeys.map((cacheKey) => caches.delete(cacheKey)));
                }
            } catch (error) {
                console.warn('Service worker cleanup failed:', error);
            }
        };

        cleanup();
    }, []);

    return null;
}
