import { useState, useCallback } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import TheCraft from './components/TheCraft';
import Collections from './components/Collections';
import Mosaic from './components/Mosaic';
import PreFooter from './components/PreFooter';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import CursorSparkle from './components/CursorSparkle';
import LuxuryLoader from './components/LuxuryLoader';
import { GoldDivider } from './components/GoldDecorations';
import { motion, AnimatePresence } from 'motion/react';

export default function App()
{
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoadComplete = useCallback(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      {/* Luxury loading screen */}
      <LuxuryLoader onComplete={handleLoadComplete} />

      {/* Cursor sparkle trail (desktop only) */}
      <CursorSparkle />

      {/* Film grain noise overlay */}
      <div className="noise-overlay" />

      <AnimatePresence>
        {isLoaded && (
          <motion.main
            className="bg-theme-light min-h-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            <ScrollProgress />
            <Header />
            <Hero />

            <Philosophy />

            <GoldDivider />

            <TheCraft />

            <GoldDivider />

            <Collections />

            <GoldDivider />

            <Mosaic />

            <PreFooter />
            <Footer />
          </motion.main>
        )}
      </AnimatePresence>
    </>
  );
}
