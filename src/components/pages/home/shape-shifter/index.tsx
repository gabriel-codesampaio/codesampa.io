'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState, useEffect, useRef, useCallback } from 'react';

import useIsMobile from '@/utils/hooks/use-mobile';
import { useHomeStore } from '@/utils/stores/home-store';

import { FeatureType } from './components';
import { ShapeShifterControls } from './controls';
import { LandingPageDesktopMock } from './landing-page-desktop-mock';
import { LandingPageMobileMock } from './landing-page-mobile-mock';
import { PriorityNotification } from './priority-notification';
import { SystemDesktopMock } from './system-desktop-mock';
import { SystemMobileMock } from './system-mobile-mock';

export function ShapeShifterSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const { mode } = useHomeStore();

  // --- Estados de Controle ---
  const [hasPlayed, setHasPlayed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [replayKey, setReplayKey] = useState(0);

  // Estado persistente para os controles
  const [controlsVisible, setControlsVisible] = useState(false);

  // --- Controle da Notificação ---
  const [showNotification, setShowNotification] = useState(false);

  // --- Refs ---
  const sequenceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const notificationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // --- Feature Slider (Systems) ---
  const [activeFeature, setActiveFeature] = useState<FeatureType>('analytics');
  const [isInteractionPaused, setIsInteractionPaused] = useState(false);

  // --- Lógica da Animação ---
  const triggerCinematicSequence = useCallback(() => {
    if (sequenceTimeoutRef.current) clearTimeout(sequenceTimeoutRef.current);
    if (notificationTimeoutRef.current)
      clearTimeout(notificationTimeoutRef.current);

    setIsPlaying(true);
    setShowNotification(false);
    setActiveFeature('analytics');

    sequenceTimeoutRef.current = setTimeout(() => {
      setIsPlaying(false);
      setHasPlayed(true);
      setControlsVisible(true);

      notificationTimeoutRef.current = setTimeout(() => {
        setShowNotification(true);
      }, 2000);
    }, 1500);
  }, []);

  // --- Efeitos ---

  // 1. Reset ViewMode apenas no início ou Replay completo
  useEffect(() => {
    if (!hasPlayed && replayKey === 0) {
      setViewMode('desktop');
    }
  }, [hasPlayed, replayKey]);

  // 2. Intersection Observer (Gatilho da Animação ao Scrollar)
  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (
          entry.isIntersecting &&
          !hasPlayed &&
          !isPlaying &&
          replayKey === 0
        ) {
          triggerCinematicSequence();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [hasPlayed, isPlaying, replayKey, triggerCinematicSequence]);

  // 3. Auto-Play Features
  useEffect(() => {
    if (mode === 'landing' || viewMode === 'mobile') return;
    if (!hasPlayed || isPlaying || isInteractionPaused) return;

    const features: FeatureType[] = ['analytics', 'crm', 'chat'];
    const startAutoPlay = () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
      autoPlayRef.current = setInterval(() => {
        setActiveFeature((current) => {
          const nextIndex = (features.indexOf(current) + 1) % features.length;
          return features[nextIndex];
        });
      }, 4000);
    };
    startAutoPlay();
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [hasPlayed, isPlaying, isInteractionPaused, mode, viewMode]);

  // --- Handlers ---
  const handleManualFeatureChange = (feature: FeatureType) => {
    setActiveFeature(feature);
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
  };

  const handleReplay = () => {
    setReplayKey((prev) => prev + 1);
    setHasPlayed(false);
    setIsPlaying(false);
    setShowNotification(false);
    setTimeout(() => triggerCinematicSequence(), 50);
  };

  // --- Render Helpers ---
  const renderMock = () => {
    if (mode === 'systems') {
      return viewMode === 'desktop' ? (
        <SystemDesktopMock
          startAnimation={isPlaying || hasPlayed}
          activeFeature={activeFeature}
          setFeature={handleManualFeatureChange}
          setIsInteractionPaused={setIsInteractionPaused}
        />
      ) : (
        <SystemMobileMock
          startAnimation={isPlaying || hasPlayed}
          activeFeature={activeFeature}
          setFeature={handleManualFeatureChange}
        />
      );
    } else {
      return viewMode === 'desktop' ? (
        <LandingPageDesktopMock />
      ) : (
        <LandingPageMobileMock />
      );
    }
  };

  const shouldBeVisible = isPlaying || hasPlayed;

  return (
    <section
      id="shape-shifter"
      ref={containerRef}
      className="hidden relative lg:flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-background"
    >
      <div className="relative z-10 flex w-full flex-col items-center justify-center">
        <PriorityNotification
          isVisible={showNotification}
          onDismiss={() => setShowNotification(false)}
          mode={mode}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={`${viewMode}-${replayKey}`}
            initial={{ opacity: 0, scale: 0.9, y: 30, filter: 'blur(10px)' }}
            animate={
              shouldBeVisible
                ? { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }
                : { opacity: 0, scale: 0.9, y: 30, filter: 'blur(10px)' }
            }
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex items-center justify-center aspect-16/10 w-[95vw] max-w-6xl perspective-1000"
          >
            {renderMock()}
          </motion.div>
        </AnimatePresence>

        <ShapeShifterControls
          currentMode={viewMode}
          setMode={setViewMode}
          onReplay={handleReplay}
          isMobileDevice={false}
          isVisible={controlsVisible}
        />
      </div>
    </section>
  );
}
