import { MotionConfig } from 'motion/react';
import Header from './components/Header';
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import TheCraft from './components/TheCraft';
import Collections from './components/Collections';
import GoldMarquee from './components/GoldMarquee';
import AtelierNote from './components/AtelierNote';
import Mosaic from './components/Mosaic';
import PreFooter from './components/PreFooter';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import ErrorBoundary from './components/ErrorBoundary';
import CursorSparkle from './components/CursorSparkle';
import LuxParticles from './components/LuxParticles';
import { GoldDivider, GoldFloaters, ParallaxLines } from './components/GoldDecorations';

export default function App() {
  return (
    <ErrorBoundary>
      <MotionConfig reducedMotion="user">
        <LuxParticles />
        <ParallaxLines />
        <GoldFloaters />
        <CursorSparkle />
        <main className="min-h-screen bg-theme-light">
          <ScrollProgress />
          <Header />
          <Hero />
          <Philosophy />
          <GoldDivider />
          <TheCraft />
          <GoldDivider dark />
          <Collections />
          <GoldMarquee />
          <AtelierNote />
          <Mosaic />
          <PreFooter />
          <Footer />
        </main>
      </MotionConfig>
    </ErrorBoundary>
  );
}
