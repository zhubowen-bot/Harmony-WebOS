'use client';

import React, { useState } from 'react';

export default function CalculatorApp() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const handleNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleOperation = (op: string) => {
    const current = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(current);
    } else if (operation) {
      const result = calculate(previousValue, current, operation);
      setDisplay(String(result));
      setPreviousValue(result);
    }

    setOperation(op);
    setWaitingForOperand(true);
  };

  const calculate = (a: number, b: number, op: string): number => {
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '×': return a * b;
      case '÷': return b !== 0 ? a / b : 0;
      default: return b;
    }
  };

  const handleEqual = () => {
    if (operation && previousValue !== null) {
      const result = calculate(previousValue, parseFloat(display), operation);
      setDisplay(String(result));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const buttons = [
    { label: 'C', type: 'function', action: handleClear },
    { label: '±', type: 'function', action: () => setDisplay(String(-parseFloat(display))) },
    { label: '%', type: 'function', action: () => setDisplay(String(parseFloat(display) / 100)) },
    { label: '÷', type: 'operator', action: () => handleOperation('÷') },
    { label: '7', type: 'number', action: () => handleNumber('7') },
    { label: '8', type: 'number', action: () => handleNumber('8') },
    { label: '9', type: 'number', action: () => handleNumber('9') },
    { label: '×', type: 'operator', action: () => handleOperation('×') },
    { label: '4', type: 'number', action: () => handleNumber('4') },
    { label: '5', type: 'number', action: () => handleNumber('5') },
    { label: '6', type: 'number', action: () => handleNumber('6') },
    { label: '-', type: 'operator', action: () => handleOperation('-') },
    { label: '1', type: 'number', action: () => handleNumber('1') },
    { label: '2', type: 'number', action: () => handleNumber('2') },
    { label: '3', type: 'number', action: () => handleNumber('3') },
    { label: '+', type: 'operator', action: () => handleOperation('+') },
    { label: '0', type: 'zero', action: () => handleNumber('0') },
    { label: '.', type: 'decimal', action: handleDecimal },
    { label: '=', type: 'equals', action: handleEqual },
  ];

  const getButtonClass = (type: string) => {
    const baseClass = 'text-2xl font-semibold rounded-2xl transition-all active:scale-95';
    switch (type) {
      case 'number':
      case 'zero':
      case 'decimal':
        return `${baseClass} bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600`;
      case 'operator':
      case 'equals':
        return `${baseClass} bg-orange-500 text-white hover:bg-orange-600`;
      case 'function':
        return `${baseClass} bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-500`;
      default:
        return baseClass;
    }
  };

  return (
    <div className="flex flex-col h-full p-4 bg-white dark:bg-gray-900">
      <div className="mb-4 p-4 text-right text-5xl font-light text-gray-800 dark:text-white bg-gray-50 dark:bg-gray-800 rounded-2xl">
        {display}
      </div>
      <div className="grid grid-cols-4 gap-3 flex-1">
        {buttons.map((btn, index) => (
          <button
            key={index}
            onClick={btn.action}
            className={getButtonClass(btn.type)}
            style={btn.type === 'zero' ? { gridColumn: 'span 2' } : undefined}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
}
