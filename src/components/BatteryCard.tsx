'use client';

import React from 'react';
import { BatteryCharging, BatteryFull, BatteryMedium, BatteryLow, Battery, X, Zap, Power } from 'lucide-react';

interface BatteryCardProps {
  onClose: () => void;
}

export default function BatteryCard({ onClose }: BatteryCardProps) {
  const batteryInfo = {
    level: 75,
    status: 'discharging',
    health: '良好',
    cycleCount: 243,
    temperature: 35,
  };

  const getBatteryIcon = () => {
    const { level, status } = batteryInfo;
    if (status === 'charging') {
      return <BatteryCharging className="w-12 h-12 text-green-500" />;
    }
    if (level > 75) return <BatteryFull className="w-12 h-12 text-green-500" />;
    if (level > 50) return <BatteryMedium className="w-12 h-12 text-yellow-500" />;
    if (level > 25) return <BatteryLow className="w-12 h-12 text-orange-500" />;
    return <Battery className="w-12 h-12 text-red-500" />;
  };

  const getBatteryColor = () => {
    const { level } = batteryInfo;
    if (level > 75) return 'text-green-500';
    if (level > 50) return 'text-yellow-500';
    if (level > 25) return 'text-orange-500';
    return 'text-red-500';
  };

  const getBatteryClass = () => {
    const { level } = batteryInfo;
    if (level > 75) return 'bg-green-500';
    if (level > 50) return 'bg-yellow-500';
    if (level > 25) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
      <div
        className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl w-[400px] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-green-500">
              {getBatteryIcon()}
            </div>
            <div>
              <span className="text-lg font-semibold text-gray-800 dark:text-white block">
                电池设置
              </span>
              <span className={`text-sm ${getBatteryColor()} block`}>
                {batteryInfo.status === 'charging' ? '充电中' : '使用中'}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-all"
          >
            <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="text-center mb-6">
            <div className={`text-6xl font-bold ${getBatteryColor()} mb-2`}>
              {batteryInfo.level}%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {batteryInfo.health} · {batteryInfo.cycleCount} 次循环
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <div className="flex items-center gap-3">
                <Zap className="w-5 h-5 text-yellow-500" />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  省电模式
                </span>
              </div>
              <button className="relative w-12 h-7 bg-gray-300 dark:bg-gray-600 rounded-full transition-all">
                <div className="absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-md" />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <div className="flex items-center gap-3">
                <Zap className="w-5 h-5 text-orange-500" />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  超级省电
                </span>
              </div>
              <button className="relative w-12 h-7 bg-gray-300 dark:bg-gray-600 rounded-full transition-all">
                <div className="absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-md" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                温度
              </div>
              <div className="text-lg font-semibold text-gray-800 dark:text-white">
                {batteryInfo.temperature}°C
              </div>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                电压
              </div>
              <div className="text-lg font-semibold text-gray-800 dark:text-white">
                3.8V
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
              电池使用情况
            </span>
            <button className="text-sm text-orange-500 font-medium hover:text-orange-600 transition-all">
              查看详情
            </button>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded bg-blue-500" />
                <span className="text-sm text-gray-700 dark:text-gray-300">屏幕</span>
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">35%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded bg-purple-500" />
                <span className="text-sm text-gray-700 dark:text-gray-300">系统</span>
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">25%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded bg-green-500" />
                <span className="text-sm text-gray-700 dark:text-gray-300">其他</span>
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">40%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
