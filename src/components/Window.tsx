'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Minus, Square, X, Maximize2 } from 'lucide-react';
import { Window as WindowType } from '@/types/harmonyos';

interface WindowProps {
  window: WindowType;
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
  onMaximize: (id: string) => void;
  onFocus: (id: string) => void;
  onUpdatePosition: (id: string, x: number, y: number) => void;
  onUpdateSize: (id: string, width: number, height: number) => void;
  children: React.ReactNode;
}

export default function Window({
  window,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onUpdatePosition,
  onUpdateSize,
  children,
}: WindowProps) {
  const windowRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [resizeDirection, setResizeDirection] = useState('');

  useEffect(() => {
    if (isDragging || isResizing) {
      const handleMouseMove = (e: MouseEvent) => {
        if (isDragging && !window.state.includes('maximized')) {
          const newX = e.clientX - dragOffset.x;
          const newY = e.clientY - dragOffset.y;
          onUpdatePosition(window.id, newX, newY);
        } else if (isResizing) {
          const rect = windowRef.current?.getBoundingClientRect();
          if (!rect) return;

          let newWidth = window.width;
          let newHeight = window.height;

          if (resizeDirection.includes('e')) {
            newWidth = Math.max(400, e.clientX - window.x);
          }
          if (resizeDirection.includes('s')) {
            newHeight = Math.max(300, e.clientY - window.y);
          }
          if (resizeDirection.includes('w')) {
            newWidth = Math.max(400, rect.right - e.clientX);
            if (newWidth !== window.width) {
              onUpdatePosition(window.id, e.clientX, window.y);
            }
          }
          if (resizeDirection.includes('n')) {
            newHeight = Math.max(300, rect.bottom - e.clientY);
            if (newHeight !== window.height) {
              onUpdatePosition(window.id, window.x, e.clientY);
            }
          }

          onUpdateSize(window.id, newWidth, newHeight);
        }
      };

      const handleMouseUp = () => {
        setIsDragging(false);
        setIsResizing(false);
        setResizeDirection('');
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, isResizing, dragOffset, window, resizeDirection, onUpdatePosition, onUpdateSize]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (window.state.includes('maximized')) return;
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - window.x,
      y: e.clientY - window.y,
    });
    onFocus(window.id);
  };

  const handleResizeStart = (e: React.MouseEvent, direction: string) => {
    e.stopPropagation();
    setIsResizing(true);
    setResizeDirection(direction);
    onFocus(window.id);
  };

  const isMaximized = window.state.includes('maximized');

  return (
    <div
      ref={windowRef}
      className={`fixed bg-white dark:bg-gray-900 rounded-xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700 ${
        window.isMinimized ? 'hidden' : ''
      }`}
      style={{
        left: isMaximized ? 0 : window.x,
        top: isMaximized ? 0 : window.y,
        width: isMaximized ? '100%' : window.width,
        height: isMaximized ? 'calc(100% - 56px)' : window.height,
        zIndex: window.zIndex,
        transition: isDragging || isResizing ? 'none' : 'all 0.2s ease-in-out',
      }}
      onMouseDown={() => onFocus(window.id)}
    >
      {!isMaximized && (
        <>
          <div
            className="absolute top-0 left-0 w-2 h-full cursor-ew-resize hover:bg-orange-500/20"
            onMouseDown={(e) => handleResizeStart(e, 'w')}
          />
          <div
            className="absolute top-0 right-0 w-2 h-full cursor-ew-resize hover:bg-orange-500/20"
            onMouseDown={(e) => handleResizeStart(e, 'e')}
          />
          <div
            className="absolute top-0 left-0 w-full h-2 cursor-ns-resize hover:bg-orange-500/20"
            onMouseDown={(e) => handleResizeStart(e, 'n')}
          />
          <div
            className="absolute bottom-0 left-0 w-full h-2 cursor-ns-resize hover:bg-orange-500/20"
            onMouseDown={(e) => handleResizeStart(e, 's')}
          />
          <div
            className="absolute top-0 right-0 w-4 h-4 cursor-ne-resize hover:bg-orange-500/20"
            onMouseDown={(e) => handleResizeStart(e, 'ne')}
          />
          <div
            className="absolute top-0 left-0 w-4 h-4 cursor-nw-resize hover:bg-orange-500/20"
            onMouseDown={(e) => handleResizeStart(e, 'nw')}
          />
          <div
            className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize hover:bg-orange-500/20"
            onMouseDown={(e) => handleResizeStart(e, 'se')}
          />
          <div
            className="absolute bottom-0 left-0 w-4 h-4 cursor-sw-resize hover:bg-orange-500/20"
            onMouseDown={(e) => handleResizeStart(e, 'sw')}
          />
        </>
      )}

      <div
        className="flex items-center justify-between px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 cursor-move select-none"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500 cursor-pointer hover:bg-red-600" onClick={() => onClose(window.id)} />
          <div className="w-3 h-3 rounded-full bg-yellow-500 cursor-pointer hover:bg-yellow-600" onClick={() => onMinimize(window.id)} />
          <div className="w-3 h-3 rounded-full bg-green-500 cursor-pointer hover:bg-green-600" onClick={() => onMaximize(window.id)} />
        </div>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{window.title}</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onMinimize(window.id)}
            className="p-1 rounded hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
          >
            <Minus className="w-4 h-4 text-gray-600 dark:text-gray-300" />
          </button>
          <button
            onClick={() => onMaximize(window.id)}
            className="p-1 rounded hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
          >
            {isMaximized ? (
              <Square className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            ) : (
              <Maximize2 className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            )}
          </button>
          <button
            onClick={() => onClose(window.id)}
            className="p-1 rounded hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
          >
            <X className="w-4 h-4 text-gray-600 dark:text-gray-300" />
          </button>
        </div>
      </div>

      <div className="overflow-hidden" style={{ height: 'calc(100% - 40px)' }}>
        {children}
      </div>
    </div>
  );
}
