'use client';

import React, { useState } from 'react';
import {
  Monitor,
  Wifi,
  Volume2,
  Bell,
  Lock,
  Globe,
  Palette,
  Accessibility,
  Battery,
  HardDrive,
  Smartphone,
  Shield,
  Info,
  ChevronRight,
  Search,
  Moon,
  Sun,
  User,
  Network,
  Bluetooth,
  Phone,
  Zap,
  RefreshCw,
  Keyboard,
  Eye,
  Hand,
  EyeOff,
  MessageSquare,
  Calendar,
  MapPin,
  Mail,
  Clock,
  Database,
  Wallet,
  Sparkles,
  Users,
  Router,
  Headphones,
  Mouse as MouseIcon,
  Radio,
  Share2,
  Terminal,
  Airplay,
  ShieldCheck,
  Car,
  Scan,
  Power,
  Signal,
  Check,
  Monitor as DesktopIcon,
  X,
  AlertTriangle,
} from 'lucide-react';

export default function SettingsApp() {
  const [activeSection, setActiveSection] = useState('general');
  const [searchQuery, setSearchQuery] = useState('');
  const [showErrorDialog, setShowErrorDialog] = useState(false);

  // 管理所有开关状态
  const [toggleStates, setToggleStates] = useState({
    wifi: true,
    bluetooth: true,
    mobileNetwork: false,
    airplaneMode: false,
    darkMode: false,
    autoRotate: true,
    eyeProtection: false,
    notificationSound: true,
    touchFeedback: true,
    allowNotification: true,
    lockScreenNotification: true,
    doNotDisturb: false,
    locationService: true,
    cameraPermission: true,
    microphonePermission: true,
    findDevice: true,
    starflash: true,
    huaweiShare: true,
    crossDeviceInteroperability: true,
    keyboardMouseShare: true,
    multiDeviceCommunication: true,
    superTerminal: true,
    superRelay: true,
    wirelessCast: true,
    superDesktop: true,
    nfc: true,
    screenReader: false,
    magnifyGesture: false,
    highContrast: false,
    textToSpeech: false,
    powerSaving: false,
    superPowerSaving: false,
  });

  const toggleSwitch = (key: string) => {
    setToggleStates(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev],
    }));
  };

  const handleItemClick = (item: any) => {
    // 如果不是开关或滑块类型，显示错误提示
    if (item.type !== 'toggle' && item.type !== 'slider') {
      setShowErrorDialog(true);
    }
  };

  const settings = {
    general: {
      icon: Monitor,
      title: '通用',
      items: [
        { label: '关于本机', value: 'Harmony WebOS', icon: Info, type: 'info' },
        { label: '系统版本', value: '1.0', icon: Smartphone, type: 'info' },
        { label: 'OpenHarmony版本', value: '6.0', icon: Zap, type: 'info' },
        { label: '设备名称', value: '我的设备', icon: User, type: 'info' },
        { label: '存储空间', value: '128 GB / 512 GB', icon: HardDrive, type: 'info' },
      ],
    },
    network: {
      icon: Wifi,
      title: '网络',
      items: [
        { label: 'Wi-Fi', value: '已连接', icon: Wifi, type: 'toggle', checked: true, toggleKey: 'wifi' },
        { label: '蓝牙', value: '已开启', icon: Bluetooth, type: 'toggle', checked: true, toggleKey: 'bluetooth' },
        { label: '移动网络', value: '已启用', icon: Smartphone, type: 'toggle', checked: false, toggleKey: 'mobileNetwork' },
        { label: '飞行模式', value: '关闭', icon: Phone, type: 'toggle', checked: false, toggleKey: 'airplaneMode' },
        { label: '网络和共享', value: '', icon: Network, type: 'info' },
      ],
    },
    display: {
      icon: Palette,
      title: '显示',
      items: [
        { label: '深色模式', value: '关闭', icon: Moon, type: 'toggle', checked: false, toggleKey: 'darkMode' },
        { label: '自动旋转', value: '开启', icon: RefreshCw, type: 'toggle', checked: true, toggleKey: 'autoRotate' },
        { label: '亮度', value: '70%', icon: Sun, type: 'slider', sliderValue: 70 },
        { label: '字体大小', value: '中等', icon: Accessibility, type: 'info' },
        { label: '屏幕分辨率', value: '1920 × 1080', icon: Monitor, type: 'info' },
        { label: '护眼模式', value: '关闭', icon: Eye, type: 'toggle', checked: false, toggleKey: 'eyeProtection' },
      ],
    },
    sound: {
      icon: Volume2,
      title: '声音',
      items: [
        { label: '铃声音量', value: '60%', icon: Volume2, type: 'slider', sliderValue: 60 },
        { label: '媒体音量', value: '80%', icon: Volume2, type: 'slider', sliderValue: 80 },
        { label: '通知声音', value: '开启', icon: Bell, type: 'toggle', checked: true, toggleKey: 'notificationSound' },
        { label: '触屏反馈', value: '开启', icon: Smartphone, type: 'toggle', checked: true, toggleKey: 'touchFeedback' },
      ],
    },
    notifications: {
      icon: Bell,
      title: '通知',
      items: [
        { label: '允许通知', value: '开启', icon: Bell, type: 'toggle', checked: true, toggleKey: 'allowNotification' },
        { label: '锁屏通知', value: '显示', icon: Lock, type: 'toggle', checked: true, toggleKey: 'lockScreenNotification' },
        { label: '应用通知', value: '', icon: MessageSquare, type: 'info' },
        { label: '勿扰模式', value: '关闭', icon: Moon, type: 'toggle', checked: false, toggleKey: 'doNotDisturb' },
        { label: '免打扰时间', value: '22:00 - 08:00', icon: Clock, type: 'info' },
      ],
    },
    privacy: {
      icon: Lock,
      title: '隐私',
      items: [
        { label: '位置服务', value: '开启', icon: MapPin, type: 'toggle', checked: true, toggleKey: 'locationService' },
        { label: '相机权限', value: '开启', icon: Eye, type: 'toggle', checked: true, toggleKey: 'cameraPermission' },
        { label: '麦克风权限', value: '开启', icon: MessageSquare, type: 'toggle', checked: true, toggleKey: 'microphonePermission' },
        { label: '应用权限', value: '', icon: Shield, type: 'info' },
        { label: '隐私保护', value: '标准', icon: Shield, type: 'info' },
      ],
    },
    security: {
      icon: Shield,
      title: '安全',
      items: [
        { label: '密码', value: '已设置', icon: Lock, type: 'info' },
        { label: '指纹', value: '未设置', icon: Hand, type: 'info' },
        { label: '面部识别', value: '未设置', icon: Eye, type: 'info' },
        { label: '查找设备', value: '开启', icon: Smartphone, type: 'toggle', checked: true, toggleKey: 'findDevice' },
        { label: '系统更新', value: '检查更新', icon: RefreshCw, type: 'info' },
      ],
    },
    starflash: {
      icon: Sparkles,
      title: '星闪',
      items: [
        { label: '星闪开关', value: '已开启', icon: Radio, type: 'toggle', checked: true, toggleKey: 'starflash' },
        { label: '星闪音频连接', value: 'freebuds pro 5', icon: Headphones, type: 'info' },
        { label: '星闪外设连接', value: '华为星闪鼠标', icon: MouseIcon, type: 'info' },
        { label: '星闪网关连接', value: '华为路由 X6', icon: Router, type: 'info' },
      ],
    },
    multiDevice: {
      icon: Users,
      title: '多设备协同',
      items: [
        { label: '华为分享', value: '已开启', icon: Share2, type: 'toggle', checked: true, toggleKey: 'huaweiShare' },
        { label: '跨设备互通', value: '已开启', icon: Network, type: 'toggle', checked: true, toggleKey: 'crossDeviceInteroperability' },
        { label: '键鼠共享', value: '已连接', icon: Keyboard, type: 'toggle', checked: true, toggleKey: 'keyboardMouseShare' },
        { label: '多设备通信共享', value: '已开启', icon: Wifi, type: 'toggle', checked: true, toggleKey: 'multiDeviceCommunication' },
        { label: '超级终端', value: '已连接', icon: Terminal, type: 'toggle', checked: true, toggleKey: 'superTerminal' },
        { label: '超级接力', value: '已开启', icon: Power, type: 'toggle', checked: true, toggleKey: 'superRelay' },
        { label: '无线投屏', value: '已开启', icon: Monitor, type: 'toggle', checked: true, toggleKey: 'wirelessCast' },
        { label: '超级桌面', value: '已开启', icon: DesktopIcon, type: 'toggle', checked: true, toggleKey: 'superDesktop' },
        { label: 'VPN', value: '未连接', icon: ShieldCheck, type: 'info' },
        { label: '华为 HiCar', value: '已连接', icon: Car, type: 'info' },
        { label: 'NFC', value: '已开启', icon: Scan, type: 'toggle', checked: true, toggleKey: 'nfc' },
      ],
    },
    accessibility: {
      icon: Accessibility,
      title: '辅助功能',
      items: [
        { label: '屏幕阅读器', value: '关闭', icon: Eye, type: 'toggle', checked: false, toggleKey: 'screenReader' },
        { label: '放大手势', value: '关闭', icon: Hand, type: 'toggle', checked: false, toggleKey: 'magnifyGesture' },
        { label: '高对比度', value: '关闭', icon: EyeOff, type: 'toggle', checked: false, toggleKey: 'highContrast' },
        { label: '文字转语音', value: '关闭', icon: Volume2, type: 'toggle', checked: false, toggleKey: 'textToSpeech' },
        { label: '键盘设置', value: '', icon: Keyboard, type: 'info' },
        { label: '鼠标设置', value: '', icon: MouseIcon, type: 'info' },
      ],
    },
    account: {
      icon: User,
      title: '账户',
      items: [
        { label: '华为账号', value: 'user@example.com', icon: Mail, type: 'info' },
        { label: '云服务', value: '已连接', icon: Database, type: 'info' },
        { label: '支付方式', value: '', icon: Wallet, type: 'info' },
        { label: '账户安全', value: '', icon: Shield, type: 'info' },
      ],
    },
    battery: {
      icon: Battery,
      title: '电池',
      items: [
        { label: '电池健康', value: '良好', icon: Battery, type: 'info' },
        { label: '省电模式', value: '关闭', icon: Zap, type: 'toggle', checked: false, toggleKey: 'powerSaving' },
        { label: '超级省电', value: '关闭', icon: Zap, type: 'toggle', checked: false, toggleKey: 'superPowerSaving' },
        { label: '电池使用情况', value: '', icon: Battery, type: 'info' },
      ],
    },
  };

  const sectionKeys = Object.keys(settings);

  return (
    <div className="flex h-full bg-white dark:bg-gray-900">
      <div className="w-64 border-r border-gray-200 dark:border-gray-700 flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="搜索设置"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm text-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-2">
          {sectionKeys.map((key) => {
            const section = settings[key as keyof typeof settings];
            const Icon = section.icon;
            return (
              <button
                key={key}
                onClick={() => setActiveSection(key)}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl mb-1 transition-all ${
                  activeSection === key
                    ? 'bg-orange-500 text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{section.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          {React.createElement(settings[activeSection as keyof typeof settings].icon, {
            className: 'w-6 h-6 text-orange-500',
          })}
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            {settings[activeSection as keyof typeof settings].title}
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-3 max-w-2xl">
            {settings[activeSection as keyof typeof settings].items.map((item, index) => (
              <div
                key={index}
                onClick={() => handleItemClick(item)}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
              >
                <div className="flex items-center gap-3 flex-1">
                  {React.createElement(item.icon, {
                    className: 'w-5 h-5 text-orange-500',
                  })}
                  <span className="text-gray-800 dark:text-white font-medium">{item.label}</span>
                </div>

                <div className="flex items-center gap-3">
                  {item.type === 'toggle' && item.toggleKey ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSwitch(item.toggleKey);
                      }}
                      className="relative w-16 h-8 rounded-full transition-all cursor-pointer"
                      style={{
                        backgroundColor: toggleStates[item.toggleKey as keyof typeof toggleStates]
                          ? '#f97316'
                          : '#d1d5db',
                      }}
                    >
                      <div
                        className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-all"
                        style={{
                          right: toggleStates[item.toggleKey as keyof typeof toggleStates]
                            ? '4px'
                            : '4px',
                          left: toggleStates[item.toggleKey as keyof typeof toggleStates]
                            ? 'auto'
                            : '4px',
                        }}
                      />
                    </button>
                  ) : item.type === 'slider' ? (
                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        defaultValue={item.sliderValue || 50}
                        className="w-24 accent-orange-500"
                      />
                      <span className="text-sm text-gray-600 dark:text-gray-400 w-12 text-right">
                        {item.value}
                      </span>
                    </div>
                  ) : (
                    <>
                      {item.value && (
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {item.value}
                        </span>
                      )}
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 错误提示对话框 */}
      {showErrorDialog && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setShowErrorDialog(false)}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 md:p-8 max-w-md w-full mx-4 animate-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 错误图标 */}
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-red-500/10 rounded-full animate-pulse"></div>
                <AlertTriangle className="w-16 h-16 text-red-500 relative z-10" />
              </div>
            </div>

            {/* 错误标题 */}
            <h3 className="text-2xl font-bold text-red-500 text-center mb-4">
              错误！
            </h3>

            {/* 错误内容 */}
            <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4 mb-4 border border-red-200 dark:border-red-800">
              <p className="text-gray-800 dark:text-gray-200 text-center font-mono text-sm md:text-base">
                未检测到内核层(60X748 error)
              </p>
            </div>

            {/* 注释 */}
            <p className="text-gray-600 dark:text-gray-400 text-center text-sm leading-relaxed">
              当前Harmony WebOS系统只含OpenHarmony基础应用层，请将应用层接入内核层并部署到设备后使用设置功能
            </p>

            {/* 关闭按钮 */}
            <div className="flex justify-center mt-6">
              <button
                onClick={() => setShowErrorDialog(false)}
                className="px-8 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-all shadow-lg active:scale-95"
              >
                确定
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
