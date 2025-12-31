'use client';

import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, RefreshCw, Home, Search, Lock, MoreHorizontal } from 'lucide-react';

export default function BrowserApp() {
  const [url, setUrl] = useState('https://www.huawei.com');
  const [loading, setLoading] = useState(false);

  const handleNavigate = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-gray-200 dark:border-gray-700">
        <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          <ArrowLeft className="w-4 h-4 text-gray-600 dark:text-gray-300" />
        </button>
        <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          <ArrowRight className="w-4 h-4 text-gray-600 dark:text-gray-300" />
        </button>
        <button
          onClick={handleNavigate}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <RefreshCw className={`w-4 h-4 text-gray-600 dark:text-gray-300 ${loading ? 'animate-spin' : ''}`} />
        </button>
        <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          <Home className="w-4 h-4 text-gray-600 dark:text-gray-300" />
        </button>

        <div className="flex-1 flex items-center gap-2 px-4 py-2 mx-2 bg-gray-100 dark:bg-gray-800 rounded-full">
          <Lock className="w-4 h-4 text-green-600" />
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleNavigate()}
            className="flex-1 bg-transparent text-sm text-gray-800 dark:text-white outline-none"
          />
          <button
            onClick={handleNavigate}
            className="p-1 bg-orange-500 rounded-full hover:bg-orange-600 transition-colors"
          >
            <Search className="w-4 h-4 text-white" />
          </button>
        </div>

        <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          <MoreHorizontal className="w-4 h-4 text-gray-600 dark:text-gray-300" />
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800">
        {loading ? (
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
            <p className="mt-4 text-gray-600 dark:text-gray-400">正在加载...</p>
          </div>
        ) : (
          <div className="text-center p-8">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Lock className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">浏览器</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">安全浏览体验</p>
            <div className="space-y-2">
              <div className="px-4 py-2 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
                <p className="text-sm text-gray-600 dark:text-gray-300">这是一个演示浏览器界面</p>
              </div>
              <div className="px-4 py-2 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
                <p className="text-sm text-gray-600 dark:text-gray-300">支持基本的导航功能</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
