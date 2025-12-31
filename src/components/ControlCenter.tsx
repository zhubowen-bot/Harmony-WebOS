'use client';

import React from 'react';
import {
  Wifi,
  Volume2,
  Sun,
  Moon,
  Bluetooth,
  Smartphone,
  Eye,
  RotateCw,
  Zap,
  Lock,
  X,
  Home,
  Search,
  Image as ImageIcon,
} from 'lucide-react';

interface ControlCenterProps {
  onClose: () => void;
  settings: {
    wifi: boolean;
    bluetooth: boolean;
    airplaneMode: boolean;
    brightness: number;
    volume: number;
    darkMode: boolean;
    eyeProtection: boolean;
    autoRotate: boolean;
    focusMode: boolean;
  };
  onToggle: (key: string) => void;
  onChangeSlider: (key: string, value: number) => void;
}

export default function ControlCenter({
  onClose,
  settings,
  onToggle,
  onChangeSlider,
}: ControlCenterProps) {
  const quickSettings = [
    { id: 'wifi', icon: Wifi, label: 'Wi-Fi', checked: settings.wifi },
    { id: 'bluetooth', icon: Bluetooth, label: '蓝牙', checked: settings.bluetooth },
    { id: 'airplaneMode', icon: Smartphone, label: '飞行模式', checked: settings.airplaneMode },
    { id: 'darkMode', icon: Moon, label: '深色模式', checked: settings.darkMode },
    { id: 'eyeProtection', icon: Eye, label: '护眼模式', checked: settings.eyeProtection },
    { id: 'autoRotate', icon: RotateCw, label: '自动旋转', checked: settings.autoRotate },
    { id: 'focusMode', icon: Lock, label: '专注模式', checked: settings.focusMode },
  ];

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[60] flex items-start justify-end pt-2 pr-2 p-4">
      <div
        className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-2xl shadow-2xl w-80 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">控制中心</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-all"
          >
            <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div className="grid grid-cols-4 gap-2">
            {quickSettings.map((item) => (
              <button
                key={item.id}
                onClick={() => onToggle(item.id)}
                className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-all ${
                  item.checked
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <item.icon className="w-6 h-6" />
                <span className="text-xs">{item.label}</span>
              </button>
            ))}
          </div>

          <div className="space-y-3 pt-2">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700 dark:text-gray-300">亮度</span>
                <Sun className="w-4 h-4 text-orange-500" />
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={settings.brightness}
                onChange={(e) => onChangeSlider('brightness', parseInt(e.target.value))}
                className="w-full accent-orange-500"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700 dark:text-gray-300">音量</span>
                <Volume2 className="w-4 h-4 text-orange-500" />
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={settings.volume}
                onChange={(e) => onChangeSlider('volume', parseInt(e.target.value))}
                className="w-full accent-orange-500"
              />
            </div>
          </div>

          <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-2 gap-2">
              <button className="flex items-center gap-2 p-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all">
                <Search className="w-5 h-5 text-orange-500" />
                <span className="text-sm text-gray-700 dark:text-gray-300">搜索</span>
              </button>
              <button className="flex items-center gap-2 p-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all">
                <Home className="w-5 h-5 text-orange-500" />
                <span className="text-sm text-gray-700 dark:text-gray-300">主页</span>
              </button>
              <button className="flex items-center gap-2 p-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all">
                <ImageIcon className="w-5 h-5 text-orange-500" />
                <span className="text-sm text-gray-700 dark:text-gray-300">壁纸</span>
              </button>
              <button className="flex items-center gap-2 p-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all">
                <Zap className="w-5 h-5 text-orange-500" />
                <span className="text-sm text-gray-700 dark:text-gray-300">省电</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
