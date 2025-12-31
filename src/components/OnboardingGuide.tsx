'use client';

import React, { useState } from 'react';
import { ChevronRight, ArrowRight, Sparkles, Rocket, Code2, Smartphone, Layers } from 'lucide-react';

interface OnboardingGuideProps {
  onComplete: () => void;
}

export default function OnboardingGuide({ onComplete }: OnboardingGuideProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const pages = [
    {
      title: '欢迎使用',
      subtitle: 'Harmony WebOS 预览版',
      icon: <Smartphone className="w-20 h-20" />,
      description: '',
      buttonText: '继续',
    },
    {
      title: '系统简介',
      subtitle: '基于 Web 技术构建',
      icon: <Code2 className="w-20 h-20" />,
      description: '这是一个基于 JavaScript 和 OpenHarmony OS 6.0 开发的网页版模拟电脑，目前仅具备基础的交互功能',
      buttonText: '继续',
    },
    {
      title: '未来愿景',
      subtitle: '开放生态',
      icon: <Sparkles className="w-20 h-20" />,
      description: '我们正在努力利用 ArkTS 和 JavaScript 的相似性将开源鸿蒙的设计逻辑迁移到 Web 上来，欢迎体验！',
      buttonText: '立即体验',
    },
  ];

  const handleNext = () => {
    setIsAnimating(true);
    setTimeout(() => {
      if (currentPage < pages.length - 1) {
        setCurrentPage(prev => prev + 1);
      } else {
        onComplete();
      }
      setIsAnimating(false);
    }, 300);
  };

  return (
    <div
      onClick={() => !isAnimating && handleNext()}
      className="fixed inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex flex-col items-center justify-center cursor-pointer transition-all duration-500"
    >
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-bl from-pink-200/30 to-purple-200/30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-blue-100/40 to-purple-100/40 rounded-full blur-2xl"></div>
      </div>

      {/* 内容卡片 */}
      <div className={`relative z-10 max-w-2xl w-full mx-4 transition-all duration-500 ${isAnimating ? 'scale-95 opacity-80' : 'scale-100 opacity-100'}`}>
        <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 md:p-12 border border-white/50 dark:border-gray-700/50">
          <div className="flex flex-col items-center text-center">
            {/* 图标 */}
            <div className="mb-8 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl animate-pulse"></div>
              <div className="relative z-10 text-blue-600 dark:text-blue-400 transition-all duration-500 hover:scale-110">
                {pages[currentPage].icon}
              </div>
            </div>

            {/* 标题 */}
            <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 mb-3 animate-in">
              {pages[currentPage].title}
            </h1>

            {/* 副标题 */}
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-6 font-medium">
              {pages[currentPage].subtitle}
            </p>

            {/* 描述文字 */}
            {pages[currentPage].description && (
              <p className="text-base md:text-lg text-gray-500 dark:text-gray-500 max-w-xl leading-relaxed mb-8">
                {pages[currentPage].description}
              </p>
            )}

            {/* 按钮组 */}
            <div className="flex items-center gap-3">
              {/* 页码指示器 */}
              <div className="flex gap-2">
                {pages.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 w-2 rounded-full transition-all duration-300 ${
                      index === currentPage
                        ? 'bg-blue-600 dark:bg-blue-400 scale-125'
                        : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  ></div>
                ))}
              </div>

              {/* 继续/立即体验按钮 */}
              <button
                className={`group relative px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-500 dark:via-purple-500 dark:to-pink-500 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 ${
                  isAnimating ? 'opacity-50' : 'opacity-100'
                }`}
              >
                <span className="flex items-center gap-2">
                  {pages[currentPage].buttonText}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 底部装饰 */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 pointer-events-none">
        <div className="w-1.5 h-1.5 bg-blue-400/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-1.5 h-1.5 bg-purple-400/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-1.5 h-1.5 bg-pink-400/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>

      {/* 顶部装饰 */}
      <div className="absolute top-8 right-8 pointer-events-none">
        <Layers className="w-6 h-6 text-gray-400/50" />
      </div>
    </div>
  );
}
