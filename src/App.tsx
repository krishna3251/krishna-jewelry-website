import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import TheCraft from './components/TheCraft';
import Collections from './components/Collections';
import Mosaic from './components/Mosaic';
import PreFooter from './components/PreFooter';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import { GoldDivider } from './components/GoldDecorations';

export default function App() {
  const [heroReady, setHeroReady] = useState(false);

  return (
    <main className="min-h-screen bg-theme-light">
      <ScrollProgress />
      <Header />
      <Hero onReady={() => setHeroReady(true)} />
      <div className={heroReady ? '' : 'opacity-0'}>
        <Philosophy />
        <GoldDivider />
        <TheCraft />
        <GoldDivider dark />
        <Collections />
        <GoldDivider />
        <Mosaic />
        <PreFooter />
        <Footer />
      </div>
    </main>
  );
}
