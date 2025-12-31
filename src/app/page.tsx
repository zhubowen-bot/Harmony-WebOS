'use client';

import React, { useState, useCallback, useEffect } from 'react';
import BootScreen from '@/components/BootScreen';
import Desktop from '@/components/Desktop';
import Taskbar from '@/components/Taskbar';
import StartMenu from '@/components/StartMenu';
import ControlCenter from '@/components/ControlCenter';
import CalendarCard from '@/components/CalendarCard';
import WiFiCard from '@/components/WiFiCard';
import VolumeCard from '@/components/VolumeCard';
import BatteryCard from '@/components/BatteryCard';
import Window from '@/components/Window';
import NotepadApp from '@/components/apps/NotepadApp';
import CalculatorApp from '@/components/apps/CalculatorApp';
import FileManagerApp from '@/components/apps/FileManagerApp';
import RealBrowser from '@/components/apps/RealBrowser';
import ImageViewerApp from '@/components/apps/ImageViewerApp';
import SettingsApp from '@/components/apps/SettingsApp';

export default function HarmonyOSPage() {
  const [bootComplete, setBootComplete] = useState(false);
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [showControlCenter, setShowControlCenter] = useState(false);
  const [showCalendarCard, setShowCalendarCard] = useState(false);
  const [showWiFiCard, setShowWiFiCard] = useState(false);
  const [showVolumeCard, setShowVolumeCard] = useState(false);
  const [showBatteryCard, setShowBatteryCard] = useState(false);
  const [windows, setWindows] = useState<any[]>([]);
  const [maxZIndex, setMaxZIndex] = useState(100);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);

  const [systemSettings, setSystemSettings] = useState({
    wifi: true,
    bluetooth: true,
    airplaneMode: false,
    brightness: 70,
    volume: 80,
    darkMode: false,
    eyeProtection: false,
    autoRotate: true,
    focusMode: false,
  });

  const desktopIcons = [
    { id: '1', name: '设置', icon: '⚙️', appId: 'settings' },
    { id: '2', name: '记事本', icon: '📝', appId: 'notepad' },
    { id: '3', name: '计算器', icon: '🔢', appId: 'calculator' },
    { id: '4', name: '文件管理器', icon: '📁', appId: 'filemanager' },
    { id: '5', name: '浏览器', icon: '🌐', appId: 'browser' },
    { id: '6', name: '图片查看器', icon: '🖼️', appId: 'imageviewer' },
  ];

  const appConfigs = {
    settings: {
      name: '设置',
      icon: '⚙️',
      component: SettingsApp,
      defaultWidth: 900,
      defaultHeight: 600,
    },
    notepad: {
      name: '记事本',
      icon: '📝',
      component: NotepadApp,
      defaultWidth: 600,
      defaultHeight: 400,
    },
    calculator: {
      name: '计算器',
      icon: '🔢',
      component: CalculatorApp,
      defaultWidth: 320,
      defaultHeight: 480,
    },
    filemanager: {
      name: '文件管理器',
      icon: '📁',
      component: FileManagerApp,
      defaultWidth: 800,
      defaultHeight: 500,
    },
    browser: {
      name: '浏览器',
      icon: '🌐',
      component: RealBrowser,
      defaultWidth: 1200,
      defaultHeight: 800,
    },
    imageviewer: {
      name: '图片查看器',
      icon: '🖼️',
      component: ImageViewerApp,
      defaultWidth: 700,
      defaultHeight: 500,
    },
  };

  const openApp = useCallback(
    (appId: string) => {
      const config = appConfigs[appId as keyof typeof appConfigs];
      if (!config) return;

      const existingWindow = windows.find((w) => w.appId === appId);
      if (existingWindow) {
        setWindows((prev) =>
          prev.map((w) =>
            w.id === existingWindow.id
              ? { ...w, isMinimized: false, zIndex: maxZIndex + 1 }
              : w
          )
        );
        setActiveWindowId(existingWindow.id);
        setMaxZIndex((prev) => prev + 1);
        return;
      }

      const newWindow = {
        id: `window-${Date.now()}`,
        title: config.name,
        appId,
        x: 100 + windows.length * 50,
        y: 100 + windows.length * 30,
        width: config.defaultWidth,
        height: config.defaultHeight,
        state: 'normal' as const,
        zIndex: maxZIndex + 1,
        isMinimized: false,
      };

      setWindows((prev) => [...prev, newWindow]);
      setActiveWindowId(newWindow.id);
      setMaxZIndex((prev) => prev + 1);
    },
    [windows, maxZIndex, appConfigs]
  );

  const closeWindow = useCallback((windowId: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== windowId));
  }, []);

  const minimizeWindow = useCallback((windowId: string) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.id === windowId ? { ...w, isMinimized: true } : w
      )
    );
  }, []);

  const maximizeWindow = useCallback((windowId: string) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.id === windowId
          ? {
              ...w,
              state: w.state === 'maximized' ? 'normal' : 'maximized',
            }
          : w
      )
    );
  }, []);

  const focusWindow = useCallback((windowId: string) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.id === windowId ? { ...w, zIndex: maxZIndex + 1, isMinimized: false } : w
      )
    );
    setActiveWindowId(windowId);
    setMaxZIndex((prev) => prev + 1);
  }, [maxZIndex]);

  const updateWindowPosition = useCallback((windowId: string, x: number, y: number) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === windowId ? { ...w, x, y } : w))
    );
  }, []);

  const updateWindowSize = useCallback((windowId: string, width: number, height: number) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === windowId ? { ...w, width, height } : w))
    );
  }, []);

  const getActiveApps = () => {
    return windows.map((w) => {
      const config = appConfigs[w.appId as keyof typeof appConfigs];
      return {
        id: w.id,
        name: config.name,
        icon: config.icon,
      };
    });
  };

  const handleToggleSetting = (key: string) => {
    setSystemSettings((prev) => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev],
    }));
  };

  const handleChangeSlider = (key: string, value: number) => {
    setSystemSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleOpenCard = (cardType: 'wifi' | 'volume' | 'battery' | 'calendar' | 'control') => {
    // 关闭所有卡片
    setShowCalendarCard(false);
    setShowWiFiCard(false);
    setShowVolumeCard(false);
    setShowBatteryCard(false);
    setShowControlCenter(false);

    // 打开对应卡片
    switch (cardType) {
      case 'calendar':
        setShowCalendarCard(true);
        break;
      case 'wifi':
        setShowWiFiCard(true);
        break;
      case 'volume':
        setShowVolumeCard(true);
        break;
      case 'battery':
        setShowBatteryCard(true);
        break;
      case 'control':
        setShowControlCenter(true);
        break;
    }
  };

  if (!bootComplete) {
    return <BootScreen onComplete={() => setBootComplete(true)} />;
  }

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      {showStartMenu && (
        <StartMenu
          onClose={() => setShowStartMenu(false)}
          onOpenApp={openApp}
        />
      )}

      {showControlCenter && (
        <ControlCenter
          onClose={() => setShowControlCenter(false)}
          settings={systemSettings}
          onToggle={handleToggleSetting}
          onChangeSlider={handleChangeSlider}
        />
      )}

      {showCalendarCard && (
        <CalendarCard
          onClose={() => setShowCalendarCard(false)}
        />
      )}

      {showWiFiCard && (
        <WiFiCard
          onClose={() => setShowWiFiCard(false)}
        />
      )}

      {showVolumeCard && (
        <VolumeCard
          onClose={() => setShowVolumeCard(false)}
          volume={systemSettings.volume}
          onChangeVolume={(value) => setSystemSettings(prev => ({ ...prev, volume: value }))}
        />
      )}

      {showBatteryCard && (
        <BatteryCard
          onClose={() => setShowBatteryCard(false)}
        />
      )}

      <Desktop
        icons={desktopIcons}
        onIconClick={(appId) => {}}
        onIconDoubleClick={openApp}
      />

      {windows.map((window) => {
        const config = appConfigs[window.appId as keyof typeof appConfigs];
        const AppComponent = config.component;

        return (
          <Window
            key={window.id}
            window={window}
            onClose={closeWindow}
            onMinimize={minimizeWindow}
            onMaximize={maximizeWindow}
            onFocus={focusWindow}
            onUpdatePosition={updateWindowPosition}
            onUpdateSize={updateWindowSize}
          >
            <AppComponent />
          </Window>
        );
      })}

      <Taskbar
        activeApps={getActiveApps()}
        onOpenStartMenu={() => setShowStartMenu(true)}
        onSwitchApp={(appId) => {
          const window = windows.find((w) => w.appId === appId);
          if (window) {
            if (window.isMinimized) {
              focusWindow(window.id);
            } else if (activeWindowId === window.id) {
              minimizeWindow(window.id);
            } else {
              focusWindow(window.id);
            }
          } else {
            openApp(appId);
          }
        }}
        onOpenCard={handleOpenCard}
      />
    </div>
  );
}
