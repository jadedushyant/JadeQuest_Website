import React, { useState } from 'react';
import { SmoothScrollProvider } from './providers/SmoothScrollProvider';
import { AnimationProvider } from './providers/AnimationProvider';
import { Preloader } from '../components/ui/Preloader';
import { CustomCursor } from '../components/interaction/CustomCursor';
import { NoiseOverlay } from '../components/ui/NoiseOverlay';
import { Navbar } from '../components/layout/Navbar/Navbar';
import { Footer } from '../components/layout/Footer/Footer';
import { Home } from '../pages/Home/Home';
import { useSoundEffects } from '../hooks/useSoundEffects';

export function App() {
  const [preloaderFinished, setPreloaderFinished] = useState<boolean>(false);
  const [isInquiryOpen, setIsInquiryOpen] = useState<boolean>(false);
  const { isMuted, toggleSound, playModalOpen } = useSoundEffects();

  const handleOpenInquiry = () => {
    playModalOpen();
    setIsInquiryOpen(true);
  };

  const handleCloseInquiry = () => {
    setIsInquiryOpen(false);
  };

  return (
    <AnimationProvider>
      <SmoothScrollProvider>
        {/* Preloader Sequence (1.2s) */}
        <Preloader onComplete={() => setPreloaderFinished(true)} />

        {/* Global Micro-Interactions */}
        <CustomCursor />
        <NoiseOverlay />

        {/* Top Floating Glass Navigation */}
        <Navbar
          onOpenInquiry={handleOpenInquiry}
          isMuted={isMuted}
          onToggleSound={toggleSound}
        />

        {/* Main Continuous Visual Journey */}
        <Home
          onOpenInquiry={handleOpenInquiry}
          isInquiryOpen={isInquiryOpen}
          onCloseInquiry={handleCloseInquiry}
          preloaderFinished={preloaderFinished}
        />

        {/* Architectural Footer */}
        <Footer onOpenInquiry={handleOpenInquiry} />
      </SmoothScrollProvider>
    </AnimationProvider>
  );
}

export default App;
