'use client';

import React, { useState } from 'react';
import { Wifi, WifiOff, Lock, X, RefreshCw } from 'lucide-react';

interface WiFiCardProps {
  onClose: () => void;
}

export default function WiFiCard({ onClose }: WiFiCardProps) {
  const [wifiEnabled, setWifiEnabled] = useState(true);

  const networks = [
    { name: 'MyHome-WiFi-5G', signal: 'strong', secured: true, connected: true },
    { name: 'Neighbor-WiFi', signal: 'medium', secured: true, connected: false },
    { name: 'Guest-Network', signal: 'weak', secured: false, connected: false },
    { name: 'Office-WiFi', signal: 'strong', secured: true, connected: false },
    { name: 'Starbucks-WiFi', signal: 'medium', secured: true, connected: false },
  ];

  const getSignalIcon = (signal: string) => {
    switch (signal) {
      case 'strong':
        return <Wifi className="w-4 h-4 text-green-500" />;
      case 'medium':
        return <Wifi className="w-4 h-4 text-yellow-500" />;
      case 'weak':
        return <Wifi className="w-4 h-4 text-orange-500" />;
      default:
        return <WifiOff className="w-4 h-4 text-gray-400" />;
    }
  };

  const handleRefresh = () => {
    console.log('刷新 Wi-Fi 网络');
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
      <div
        className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl w-[400px] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-xl transition-all ${
              wifiEnabled ? 'bg-green-500' : 'bg-gray-400'
            }`}>
              <Wifi className={`w-5 h-5 text-white`} />
            </div>
            <span className="text-lg font-semibold text-gray-800 dark:text-white">
              Wi-Fi
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-all"
          >
            <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">Wi-Fi 开关</span>
            <button
              onClick={() => setWifiEnabled(!wifiEnabled)}
              className={`relative w-12 h-7 rounded-full transition-all ${
                wifiEnabled ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
              }`}
            >
              <div
                className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-md transition-all ${
                  wifiEnabled ? 'left-6' : 'left-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={handleRefresh}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
            >
              <RefreshCw className="w-4 h-4 text-gray-600 dark:text-gray-300" />
              <span className="text-sm text-gray-700 dark:text-gray-300">刷新</span>
            </button>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              已找到 {networks.length} 个网络
            </span>
          </div>
        </div>

        <div className="max-h-80 overflow-y-auto">
          {networks.map((network, index) => (
            <div
              key={index}
              onClick={() => {
                if (!network.connected) {
                  console.log('连接到:', network.name);
                }
              }}
              className={`flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-all border-b border-gray-100 dark:border-gray-800 ${
                network.connected ? 'bg-orange-50 dark:bg-orange-900/20' : ''
              }`}
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  {getSignalIcon(network.signal)}
                  <span className="text-sm font-medium text-gray-800 dark:text-white">
                    {network.name}
                  </span>
                  {network.secured && (
                    <Lock className="w-3 h-3 text-gray-500 dark:text-gray-400" />
                  )}
                </div>
                {network.connected && (
                  <span className="text-xs text-green-600 dark:text-green-400">已连接</span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <div className="text-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              添加网络
            </span>
            <button className="ml-4 px-4 py-1.5 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 transition-all">
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
