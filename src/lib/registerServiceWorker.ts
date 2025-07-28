/**
 * Service Worker Registration for Progressive Web App functionality
 * 
 * This module provides functions to register and manage the service worker
 * for offline capabilities, caching, and app installation
 */

export function registerServiceWorker() {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    });
  }
}

// Check if the app can be installed (PWA installation prompt)
export function checkAppInstallation(setCanInstall: (canInstall: boolean) => void) {
  if (typeof window !== 'undefined') {
    // Track installation prompt event
    // Using BeforeInstallPromptEvent type for the installation prompt
    interface BeforeInstallPromptEvent extends Event {
      readonly platforms: string[];
      readonly userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
      prompt(): Promise<void>;
    }
    
    let deferredPrompt: BeforeInstallPromptEvent | null = null;
    
    window.addEventListener('beforeinstallprompt', (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later
      deferredPrompt = e as BeforeInstallPromptEvent;
      // Update UI to notify the user they can install the PWA
      setCanInstall(true);
    });
    
    // When the app is successfully installed
    window.addEventListener('appinstalled', () => {
      // Log install to analytics
      console.log('PWA was installed');
      // Clear the deferredPrompt
      deferredPrompt = null;
      // Update UI
      setCanInstall(false);
    });
    
    // Return function to trigger installation
    return () => {
      if (deferredPrompt) {
        // Show the install prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice.then((choiceResult: {outcome: string}) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the install prompt');
          } else {
            console.log('User dismissed the install prompt');
          }
          // Clear the deferredPrompt
          deferredPrompt = null;
        });
      }
    };
  }
  return () => {};
}
