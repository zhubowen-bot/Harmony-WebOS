'use client';

import React, { useState } from 'react';
import { Volume2, Volume1, VolumeX, X } from 'lucide-react';

interface VolumeCardProps {
  onClose: () => void;
  volume: number;
  onChangeVolume: (value: number) => void;
}

export default function VolumeCard({ onClose, volume, onChangeVolume }: VolumeCardProps) {
  const [muted, setMuted] = useState(false);
  const [mediaVolume, setMediaVolume] = useState(volume);
  const [ringVolume, setRingVolume] = useState(60);
  const [notificationVolume, setNotificationVolume] = useState(80);

  const getVolumeIcon = () => {
    if (muted) return <VolumeX className="w-8 h-8 text-gray-400" />;
    if (mediaVolume > 66) return <Volume2 className="w-8 h-8 text-orange-500" />;
    if (mediaVolume > 33) return <Volume1 className="w-8 h-8 text-orange-500" />;
    return <Volume1 className="w-8 h-8 text-orange-500" />;
  };

  const toggleMute = () => {
    setMuted(!muted);
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
      <div
        className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl w-[400px] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-orange-500">
              {getVolumeIcon()}
            </div>
            <span className="text-lg font-semibold text-gray-800 dark:text-white">
              声音设置
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-all"
          >
            <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                  <Volume2 className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-800 dark:text-white">媒体音量</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">音乐、视频等</div>
                </div>
              </div>
              <span className="text-lg font-semibold text-orange-500">{muted ? '静音' : `${mediaVolume}%`}</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={muted ? 0 : mediaVolume}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                setMediaVolume(value);
                setMuted(false);
                onChangeVolume(value);
              }}
              disabled={muted}
              className="w-full accent-orange-500"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                  <Volume2 className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-800 dark:text-white">铃声音量</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">来电、短信等</div>
                </div>
              </div>
              <span className="text-lg font-semibold text-orange-500">{ringVolume}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={ringVolume}
              onChange={(e) => setRingVolume(parseInt(e.target.value))}
              className="w-full accent-orange-500"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                  <Volume2 className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-800 dark:text-white">通知音量</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">系统通知等</div>
                </div>
              </div>
              <span className="text-lg font-semibold text-orange-500">{notificationVolume}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={notificationVolume}
              onChange={(e) => setNotificationVolume(parseInt(e.target.value))}
              className="w-full accent-orange-500"
            />
          </div>
        </div>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={toggleMute}
              className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-all ${
                muted
                  ? 'bg-gray-600 text-white hover:bg-gray-700'
                  : 'bg-orange-500 text-white hover:bg-orange-600'
              }`}
            >
              {muted ? '取消静音' : '静音'}
            </button>
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-xl text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
            >
              完成
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
