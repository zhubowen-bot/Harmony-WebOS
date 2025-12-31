export type WindowState = 'normal' | 'maximized' | 'minimized';

export interface Window {
  id: string;
  title: string;
  appId: string;
  x: number;
  y: number;
  width: number;
  height: number;
  state: WindowState;
  zIndex: number;
  isMinimized: boolean;
}

export interface App {
  id: string;
  name: string;
  icon: string;
  component: React.ComponentType<any>;
  defaultWidth: number;
  defaultHeight: number;
  resizable: boolean;
  minimizable: boolean;
}

export interface DesktopIcon {
  id: string;
  name: string;
  icon: string;
  appId: string;
}

export interface SystemSettings {
  wallpaper: string;
  brightness: number;
  volume: number;
  wifi: boolean;
  bluetooth: boolean;
  airplaneMode: boolean;
  darkMode: boolean;
  theme: string;
  language: string;
  fontSize: string;
  autoUpdate: boolean;
  notifications: boolean;
  focusMode: boolean;
}
