'use client';

import React, { useState, useEffect } from 'react';
import {
  Home,
  Wifi,
  Volume2,
  Battery,
  Calendar,
  Search,
  Grid,
  Sliders,
} from 'lucide-react';

interface TaskbarProps {
  activeApps: { id: string; name: string; icon: string }[];
  onOpenStartMenu: () => void;
  onSwitchApp: (id: string) => void;
  onOpenCard: (cardType: 'wifi' | 'volume' | 'battery' | 'calendar' | 'control') => void;
}

export default function Taskbar({
  activeApps,
  onOpenStartMenu,
  onSwitchApp,
  onOpenCard,
}: TaskbarProps) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('zh-CN', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('zh-CN', {
      month: 'short',
      day: 'numeric',
      weekday: 'short',
    });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 h-14 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-t border-gray-200 dark:border-gray-700 flex items-center justify-between px-4 z-50">
      <div className="flex items-center gap-1">
        <button
          onClick={onOpenStartMenu}
          className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-orange-100 dark:hover:bg-gray-800 transition-all"
        >
          <span className="text-orange-500 font-bold text-2xl">O</span>
        </button>

        <div className="w-px h-6 bg-gray-300 dark:bg-gray-700 mx-2" />

        <div className="flex items-center gap-1">
          {activeApps.map((app) => (
            <button
              key={app.id}
              onClick={() => onSwitchApp(app.id)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-orange-100 dark:hover:bg-gray-800 transition-all group"
            >
              <span className="text-2xl">{app.icon}</span>
              <span className="text-xs text-gray-700 dark:text-gray-300 max-w-20 truncate group-hover:block hidden">
                {app.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="p-2 rounded-full hover:bg-orange-100 dark:hover:bg-gray-800 transition-all">
          <Search className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </button>

        <div className="w-px h-6 bg-gray-300 dark:bg-gray-700" />

        <button
          onClick={() => onOpenCard('wifi')}
          className="flex items-center gap-1 px-3 py-2 rounded-xl hover:bg-orange-100 dark:hover:bg-gray-800 transition-all"
        >
          <Wifi className="w-5 h-5 text-green-600" />
        </button>

        <button
          onClick={() => onOpenCard('volume')}
          className="flex items-center gap-1 px-3 py-2 rounded-xl hover:bg-orange-100 dark:hover:bg-gray-800 transition-all"
        >
          <Volume2 className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </button>

        <button
          onClick={() => onOpenCard('battery')}
          className="flex items-center gap-1 px-3 py-2 rounded-xl hover:bg-orange-100 dark:hover:bg-gray-800 transition-all"
        >
          <Battery className="w-5 h-5 text-green-600" />
        </button>

        <button
          onClick={() => onOpenCard('calendar')}
          className="flex items-center gap-1 px-3 py-2 rounded-xl hover:bg-orange-100 dark:hover:bg-gray-800 transition-all"
        >
          <Calendar className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          <div className="text-right">
            <div className="text-sm font-medium text-gray-800 dark:text-white leading-tight">
              {formatTime(currentTime)}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 leading-tight">
              {formatDate(currentTime)}
            </div>
          </div>
        </button>

        <button
          onClick={() => onOpenCard('control')}
          className="p-2 rounded-full hover:bg-orange-100 dark:hover:bg-gray-800 transition-all"
        >
          <Sliders className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </button>
      </div>
    </div>
  );
}
