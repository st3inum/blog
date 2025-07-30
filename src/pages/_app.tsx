import "@/styles/globals.css";
import "@/styles/spoilers.css";
import "@/styles/nested-lists.css";
import "@/styles/collapsible-code.css";
import "@/styles/syntax-highlighting.css";
import type { AppProps } from "next/app";
import { CssBaseline, Box } from "@mui/material";
import { ColorModeProvider } from "@/components/ColorModeContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { registerServiceWorker } from "@/lib/registerServiceWorker";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import ReportBugButton from "@/components/ReportBugButton";
import { useRouter } from "next/router";
import CookieConsent from "@/components/CookieConsent";
import { initGA, pageview, isAnalyticsEnabled } from "@/lib/analytics";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [analyticsInitialized, setAnalyticsInitialized] = useState(false);
  
  // Register service worker for PWA functionality
  useEffect(() => {
    registerServiceWorker();
  }, []);

  // Initialize Google Analytics if consent was previously given
  useEffect(() => {
    if (isAnalyticsEnabled() && !analyticsInitialized) {
      initGA();
      setAnalyticsInitialized(true);
    }
  }, [analyticsInitialized]);

  // Track page views
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (analyticsInitialized) {
        pageview(url);
      }
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events, analyticsInitialized]);

  // Handle cookie consent
  const handleAcceptCookies = () => {
    if (!analyticsInitialized) {
      initGA();
      setAnalyticsInitialized(true);
      // Track initial page view after consent
      pageview(window.location.pathname);
    }
  };

  const handleDeclineCookies = () => {
    // No action needed, analytics won't be initialized
  };

  return (
    <ColorModeProvider>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <Box component="main" sx={{ flex: 1, py: 2 }}>
          <Component {...pageProps} />
        </Box>
        <Footer />
        <ReportBugButton />
        <ScrollToTopButton />
        <CookieConsent 
          onAccept={handleAcceptCookies}
          onDecline={handleDeclineCookies}
        />
      </Box>
    </ColorModeProvider>
  );
}
