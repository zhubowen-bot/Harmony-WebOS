'use client';

import React from 'react';

interface DesktopProps {
  icons: { id: string; name: string; icon: string; appId: string }[];
  onIconClick: (appId: string) => void;
  onIconDoubleClick: (appId: string) => void;
}

export default function Desktop({ icons, onIconClick, onIconDoubleClick }: DesktopProps) {
  return (
    <div className="flex-1 p-4 pb-16 overflow-hidden">
      <div className="h-full grid grid-cols-1 gap-2 content-start">
        {icons.map((icon, index) => (
          <div
            key={icon.id}
            onClick={() => onIconClick(icon.appId)}
            onDoubleClick={() => onIconDoubleClick(icon.appId)}
            className="flex flex-col items-center justify-center w-20 h-20 rounded-xl hover:bg-orange-500/20 cursor-pointer transition-all select-none group"
          >
            <div className="text-4xl mb-1 group-hover:scale-110 transition-transform">
              {icon.icon}
            </div>
            <span className="text-xs text-center text-white font-medium drop-shadow-lg px-2">
              {icon.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
