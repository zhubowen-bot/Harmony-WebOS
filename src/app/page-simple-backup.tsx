'use client';

import React, { useState } from 'react';

export default function HarmonyOSPage() {
  const [count, setCount] = useState(0);

  return (
    <div className="w-full h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-orange-400 flex flex-col items-center justify-center">
      <div className="text-center text-white">
        <h1 className="text-6xl font-bold mb-8">鸿蒙电脑网页版</h1>
        <p className="text-2xl mb-8">HarmonyOS Web</p>
        <div className="space-y-4">
          <p className="text-xl">点击计数器: {count}</p>
          <button
            onClick={() => setCount(count + 1)}
            className="px-8 py-4 bg-white text-purple-600 text-xl font-bold rounded-lg hover:bg-gray-100 transition-all"
          >
            点击我
          </button>
        </div>
      </div>
    </div>
  );
}
