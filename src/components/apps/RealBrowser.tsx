'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  RefreshCw,
  Home as HomeIcon,
  X,
  Lock,
  Search,
  MoreHorizontal,
  Minus,
  Square,
  Star,
  ExternalLink,
} from 'lucide-react';

interface RealBrowserProps {
  onClose: () => void;
}

export default function RealBrowser({ onClose }: RealBrowserProps) {
  const [currentUrl, setCurrentUrl] = useState('https://www.vmall.com');
  const [loading, setLoading] = useState(false);
  const [showTabs, setShowTabs] = useState(false);
  const [bookmarks, setBookmarks] = useState([
    { id: 1, title: '华为商城', url: 'https://www.vmall.com' },
    { id: 2, title: '哔哩哔哩', url: 'https://www.bilibili.com' },
    { id: 3, title: '华为官网', url: 'https://www.huawei.com' },
    { id: 4, title: 'HarmonyOS官网', url: 'https://www.harmonyos.com' },
  ]);
  const [history, setHistory] = useState<string[]>([]);

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const handleNavigate = (url: string) => {
    setCurrentUrl(url);
    setLoading(true);
    setTimeout(() => setLoading(false), 500);
    setHistory((prev) => [url, ...prev]);
    setHistoryIndex(-1);
  };

  const handleBack = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setCurrentUrl(history[newIndex]);
    }
  };

  const handleForward = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setCurrentUrl(history[newIndex]);
    }
  };

  const handleRefresh = () => {
    setLoading(true);
    iframeRef.current?.contentWindow?.location.reload();
    setTimeout(() => setLoading(false), 500);
  };

  const handleHome = () => {
    handleNavigate('https://www.vmall.com');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let url = currentUrl.trim();
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }
    handleNavigate(url);
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900">
      {/* 地址栏 */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        <button
          onClick={handleBack}
          disabled={historyIndex >= history.length - 1}
          className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </button>

        <button
          onClick={handleForward}
          disabled={historyIndex <= 0}
          className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <ArrowRight className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </button>

        <button
          onClick={handleRefresh}
          className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
        >
          <RefreshCw className={`w-5 h-5 text-gray-600 dark:text-gray-300 ${loading ? 'animate-spin' : ''}`} />
        </button>

        <button
          onClick={handleHome}
          className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
        >
          <HomeIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </button>

        <form onSubmit={handleSubmit} className="flex-1 flex items-center">
          <div className="flex-1 flex items-center bg-white dark:bg-gray-700 rounded-lg px-4 py-2.5 border border-gray-300 dark:border-gray-600 focus-within:border-orange-500 transition-all">
            <Lock className="w-4 h-4 text-green-500 mr-2" />
            <input
              type="text"
              value={currentUrl}
              onChange={(e) => setCurrentUrl(e.target.value)}
              className="flex-1 bg-transparent outline-none text-gray-800 dark:text-white"
              placeholder="输入网址或搜索内容"
              autoFocus
            />
            <button
              type="submit"
              disabled={!isValidUrl(currentUrl)}
              className="p-1.5 rounded-lg bg-orange-500 text-white hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>
        </form>

        <button
          onClick={onClose}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-all"
        >
          <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </button>
      </div>

      {/* 浏览器主体 */}
      <div className="flex-1 flex overflow-hidden">
        {/* 左侧边栏 */}
        <div className="w-56 border-r border-gray-200 dark:border-gray-700 flex flex-col bg-gray-50 dark:bg-gray-800">
          <button
            onClick={() => setShowTabs(!showTabs)}
            className="p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
          >
            <ExternalLink className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>

          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            <div className="text-xs text-gray-500 dark:text-gray-400 text-center mb-3">
              快捷访问
            </div>

            {bookmarks.map((bookmark) => (
              <button
                key={bookmark.id}
                onClick={() => handleNavigate(bookmark.url)}
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all text-left"
                title={bookmark.title}
              >
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-gray-700 dark:text-gray-300 truncate">
                    {bookmark.title}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 浏览器内容区 */}
        <div className="flex-1 flex flex-col">
          {/* 标签栏 */}
          <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
            <div className="flex-1 flex items-center gap-2">
              {history.slice(0, 5).map((url, index) => (
                <button
                  key={index}
                  onClick={() => handleNavigate(url)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all ${
                    currentUrl === url
                      ? 'bg-orange-100 dark:bg-orange-900/20'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <Lock className="w-3 h-3 text-green-500" />
                  <span className="text-xs text-gray-700 dark:text-gray-300 max-w-32 truncate">
                    {url}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setHistory((prev) => prev.filter((_, i) => i !== index));
                    }}
                    className="ml-2 p-0.5 hover:bg-gray-300 dark:hover:bg-gray-700 rounded transition-all"
                  >
                    <Minus className="w-3 h-3 text-gray-400" />
                  </button>
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowTabs(!showTabs)}
              className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
            >
              <Square className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            </button>
          </div>

          {/* Iframe 浏览器 */}
          <div className="flex-1 relative">
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-gray-900 z-10">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">正在加载页面...</p>
                </div>
              </div>
            )}

            <iframe
              ref={iframeRef}
              src={currentUrl}
              className="w-full h-full border-0 bg-white"
              title="HarmonyOS 浏览器"
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-modals allow-popups-to-escape-sandbox allow-presentation allow-top-navigation-by-user-activation"
            />
          </div>
        </div>
      </div>

      {/* 状态栏 */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all text-sm text-gray-700 dark:text-gray-300"
          >
            <X className="w-4 h-4" />
            关闭浏览器
          </button>

          <button
            onClick={() => setBookmarks([...bookmarks, {
              id: Date.now(),
              title: '当前页面',
              url: currentUrl,
            }])}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all text-sm text-gray-700 dark:text-gray-300"
          >
            <Star className="w-4 h-4 text-orange-500" />
            添加到书签
          </button>
        </div>

        <div className="text-xs text-gray-500 dark:text-gray-400">
          <span className="mr-4">已加载</span>
          <span className="mr-4">内存使用: {loading ? '加载中...' : '正常'}</span>
          <span>安全连接</span>
        </div>
      </div>
    </div>
  );
}
