import Header from './components/Header';
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import TheCraft from './components/TheCraft';
import Collections from './components/Collections';
import AtelierNote from './components/AtelierNote';
import Mosaic from './components/Mosaic';
import PreFooter from './components/PreFooter';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import { GoldDivider } from './components/GoldDecorations';

export default function App() {
  return (
    <main className="min-h-screen bg-theme-light">
      <ScrollProgress />
      <Header />
      <Hero />
      <Philosophy />
      <GoldDivider />
      <TheCraft />
      <GoldDivider dark />
      <Collections />
      <AtelierNote />
      <Mosaic />
      <PreFooter />
      <Footer />
    </main>
  );
}
