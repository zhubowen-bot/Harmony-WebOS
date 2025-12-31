'use client';

import React, { useState } from 'react';
import { Search, X, Settings, Clock, Star, Folder, Image as ImageIcon, Music, Video, FileText, Calculator, Globe, MapPin, Phone, Mail, Wifi, Bluetooth, Volume2, Sun } from 'lucide-react';

interface StartMenuProps {
  onClose: () => void;
  onOpenApp: (appId: string) => void;
}

export default function StartMenu({ onClose, onOpenApp }: StartMenuProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const apps = [
    { id: 'settings', name: '设置', icon: '⚙️', category: '系统' },
    { id: 'notepad', name: '记事本', icon: '📝', category: '工具' },
    { id: 'calculator', name: '计算器', icon: '🔢', category: '工具' },
    { id: 'filemanager', name: '文件管理器', icon: '📁', category: '工具' },
    { id: 'browser', name: '浏览器', icon: '🌐', category: '网络' },
    { id: 'imageviewer', name: '图片查看器', icon: '🖼️', category: '媒体' },
  ];

  const recentApps = [
    { id: 'notepad', name: '记事本', icon: '📝', time: '5分钟前' },
    { id: 'filemanager', name: '文件管理器', icon: '📁', time: '10分钟前' },
    { id: 'browser', name: '浏览器', icon: '🌐', time: '1小时前' },
  ];

  const quickActions = [
    { icon: Globe, label: '网络设置', action: 'open-settings' },
    { icon: Wifi, label: 'Wi-Fi', action: 'open-settings' },
    { icon: Bluetooth, label: '蓝牙', action: 'open-settings' },
    { icon: Volume2, label: '声音', action: 'open-settings' },
    { icon: Sun, label: '亮度', action: 'open-settings' },
    { icon: Settings, label: '设置', action: 'open-settings' },
  ];

  const filteredApps = apps.filter(app =>
    app.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[60] flex items-start justify-start pt-2 pl-2 p-4">
      <div
        className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-2xl shadow-2xl w-[600px] h-[80vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="搜索应用、文件和设置"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent text-gray-800 dark:text-white outline-none"
              autoFocus
            />
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-all"
            >
              <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        </div>

        <div className="flex h-[calc(100%-60px)]">
          <div className="w-64 border-r border-gray-200 dark:border-gray-700 p-4 overflow-y-auto">
            {recentApps.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3 text-gray-600 dark:text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-medium">最近使用</span>
                </div>
                <div className="space-y-2">
                  {recentApps.map((app) => (
                    <button
                      key={app.id}
                      onClick={() => {
                        onOpenApp(app.id);
                        onClose();
                      }}
                      className="flex items-center gap-3 w-full p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                    >
                      <span className="text-2xl">{app.icon}</span>
                      <div className="text-left">
                        <div className="text-sm font-medium text-gray-800 dark:text-white">
                          {app.name}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {app.time}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div>
              <div className="flex items-center gap-2 mb-3 text-gray-600 dark:text-gray-400">
                <Star className="w-4 h-4" />
                <span className="text-sm font-medium">固定应用</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (action.action === 'open-settings') {
                        onOpenApp('settings');
                        onClose();
                      }
                    }}
                    className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                  >
                    <action.icon className="w-8 h-8 text-orange-500" />
                    <span className="text-xs text-gray-700 dark:text-gray-300 text-center">
                      {action.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1 p-4 overflow-y-auto">
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3">
                所有应用
              </h3>
              <div className="grid grid-cols-4 gap-3">
                {filteredApps.map((app) => (
                  <button
                    key={app.id}
                    onClick={() => {
                      onOpenApp(app.id);
                      onClose();
                    }}
                    className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-orange-100 dark:hover:bg-gray-800 transition-all group"
                  >
                    <span className="text-4xl group-hover:scale-110 transition-transform">
                      {app.icon}
                    </span>
                    <span className="text-sm font-medium text-gray-800 dark:text-white">
                      {app.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 p-4 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl">
              <h4 className="text-lg font-semibold text-white mb-2">
                HarmonyOS
              </h4>
              <p className="text-sm text-white/90 mb-3">
                体验全新鸿蒙系统，万物互联，智慧生活
              </p>
              <button className="px-4 py-2 bg-white text-orange-600 rounded-lg text-sm font-medium hover:bg-gray-100 transition-all">
                了解更多
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
