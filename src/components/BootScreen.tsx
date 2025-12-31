'use client';

import React, { useEffect, useState } from 'react';
import OnboardingGuide from './OnboardingGuide';

interface BootScreenProps {
  onComplete: () => void;
}

export default function BootScreen({ onComplete }: BootScreenProps) {
  const [progress, setProgress] = useState(0);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setShowOnboarding(true);
          }, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    return () => clearInterval(interval);
  }, []);

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    setTimeout(() => {
      onComplete();
    }, 300);
  };

  return (
    <div className="fixed inset-0 bg-black">
      {/* 开机动画 */}
      <div
        onClick={() => {
          if (progress >= 100 && !showOnboarding) {
            setShowOnboarding(true);
          } else if (showOnboarding) {
            handleOnboardingComplete();
          } else {
            // 快速跳过
            setProgress(100);
            setTimeout(() => setShowOnboarding(true), 500);
          }
        }}
        className={`fixed inset-0 bg-black flex flex-col items-center justify-center transition-all duration-1000 cursor-pointer ${
          showOnboarding ? 'opacity-0 pointer-events-none scale-150' : 'opacity-100 scale-100'
        }`}
      >
        <div className="flex flex-col items-center justify-center flex-1 w-full">
          {/* 主标题 */}
          <h1 className="text-white font-bold text-6xl md:text-7xl tracking-wider animate-pulse">
            Harmony WebOS
          </h1>

          {/* 横线 */}
          <div className="w-64 md:w-80 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent mt-8 mb-8">
          </div>
        </div>

        {/* 底部文字 */}
        <div className="absolute bottom-16 text-center px-4">
          <p className="text-white text-xl md:text-2xl font-semibold tracking-wide opacity-90">
            Powered by OpenHarmony
          </p>
        </div>
      </div>

      {/* 新手引导 */}
      {showOnboarding && (
        <div
          className="fixed inset-0 z-50 transition-all duration-500"
          style={{ animation: 'fadeIn 0.5s ease-out' }}
        >
          <OnboardingGuide onComplete={handleOnboardingComplete} />
        </div>
      )}
    </div>
  );
}
