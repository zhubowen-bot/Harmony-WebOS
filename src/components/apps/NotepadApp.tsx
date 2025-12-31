'use client';

import React, { useState, useEffect } from 'react';
import { Save, FileText } from 'lucide-react';

export default function NotepadApp() {
  const [content, setContent] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setSaved(false), 2000);
    return () => clearTimeout(timer);
  }, [saved]);

  const handleSave = () => {
    localStorage.setItem('notepad-content', content);
    setSaved(true);
  };

  useEffect(() => {
    const savedContent = localStorage.getItem('notepad-content');
    if (savedContent) setContent(savedContent);
  }, []);

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900">
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          <span className="font-medium text-gray-800 dark:text-white">记事本</span>
        </div>
        <button
          onClick={handleSave}
          className="px-4 py-1.5 text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all"
        >
          {saved ? '已保存 ✓' : '保存'}
        </button>
      </div>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="flex-1 w-full p-4 resize-none border-none outline-none text-gray-800 dark:text-white bg-transparent"
        placeholder="在此输入文本..."
      />
    </div>
  );
}
