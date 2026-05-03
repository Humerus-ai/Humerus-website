import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustBar } from './components/TrustBar';
import { Verticals } from './components/Verticals';
import { PlatformSpine } from './components/PlatformSpine';
import { AISecurity } from './components/AISecurity';
import { Pricing } from './components/Pricing';
import { DemoForm } from './components/DemoForm';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <Verticals />
        <PlatformSpine />
        <AISecurity />
        <Pricing />
        <DemoForm />
      </main>
      <Footer />
    </>
  );
}
