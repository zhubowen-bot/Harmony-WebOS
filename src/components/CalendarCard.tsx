'use client';

import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface CalendarCardProps {
  onClose: () => void;
}

export default function CalendarCard({ onClose }: CalendarCardProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    return new Date(year, month + 1, 0).getDate();
  }, [currentDate]);

  const firstDayOfMonth = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    return new Date(year, month, 1).getDay();
  }, [currentDate]);

  const monthNames = [
    '一月', '二月', '三月', '四月', '五月', '六月',
    '七月', '八月', '九月', '十月', '十一月', '十二月'
  ];

  const dayNames = ['日', '一', '二', '三', '四', '五', '六'];

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const today = new Date();
  const isToday = (day: number) => {
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  const renderDays = () => {
    const days = [];
    const currentDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

    // 填充空白天
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="w-10 h-10" />);
    }

    // 填充日期
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(
        <div
          key={`day-${i}`}
          onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), i))}
          className={`w-10 h-10 flex items-center justify-center rounded-lg cursor-pointer transition-all hover:bg-orange-100 dark:hover:bg-gray-700 ${
            isToday(i)
              ? 'bg-orange-500 text-white font-bold'
              : 'text-gray-700 dark:text-gray-300'
          }`}
        >
          {i}
        </div>
      );
    }

    return days;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('zh-CN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[60] flex items-end justify-end pb-2 p-4">
      <div
        className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl w-80 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold text-gray-800 dark:text-white">
              {monthNames[currentDate.getMonth()]}
            </div>
            <div className="text-lg text-gray-600 dark:text-gray-400">
              {currentDate.getFullYear()}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-all"
          >
            <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        <div className="p-4">
          <div className="text-center mb-4 text-sm text-gray-600 dark:text-gray-400">
            {formatDate(currentDate)}
          </div>

          <div className="mb-4">
            <div className="flex items-center justify-between mb-3">
              <button
                onClick={prevMonth}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
              <button
                onClick={goToToday}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 transition-all"
              >
                今天
              </button>
              <button
                onClick={nextMonth}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
              >
                <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayNames.map((day) => (
              <div key={day} className="text-center text-xs font-medium text-gray-500 dark:text-gray-400 py-2">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {renderDays()}
          </div>
        </div>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
            <div>
              <span className="font-medium">农历</span>
              <span className="ml-2">无</span>
            </div>
            <div>
              <span className="font-medium">节气</span>
              <span className="ml-2">无</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
