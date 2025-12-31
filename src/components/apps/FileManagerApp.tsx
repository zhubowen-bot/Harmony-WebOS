'use client';

import React, { useState, useMemo } from 'react';
import {
  Folder,
  File,
  FileText,
  Image as ImageIcon,
  Music,
  Video,
  Archive,
  FileCode,
  FilePlus,
  Search,
  Grid,
  List,
  SortAsc,
  Home,
  HardDrive,
  Download,
  MoreHorizontal,
  Clock,
} from 'lucide-react';

interface FileItem {
  id: string;
  name: string;
  type: 'folder' | 'file';
  subtype?: 'image' | 'video' | 'audio' | 'document' | 'archive' | 'code';
  size: string;
  modified: string;
}

export default function FileManagerApp() {
  const [currentPath, setCurrentPath] = useState('/home/Documents');
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'size'>('name');

  const files: FileItem[] = [
    { id: 'f1', name: '文档', type: 'folder', size: '-', modified: '2024-01-15', path: '/home/Documents/文档' },
    { id: 'f2', name: '图片', type: 'folder', size: '-', modified: '2024-01-14', path: '/home/Documents/图片' },
    { id: 'f3', name: '视频', type: 'folder', size: '-', modified: '2024-01-13', path: '/home/Documents/视频' },
    { id: 'f4', name: '音乐', type: 'folder', size: '-', modified: '2024-01-12', path: '/home/Documents/音乐' },
    { id: 'i1', name: '风景照片.jpg', type: 'file', subtype: 'image', size: '2.3 MB', modified: '2024-01-10' },
    { id: 'i2', name: '自拍.png', type: 'file', subtype: 'image', size: '856 KB', modified: '2024-01-09' },
    { id: 'v1', name: '会议记录.mp4', type: 'file', subtype: 'video', size: '234 MB', modified: '2024-01-15' },
    { id: 'a1', name: '背景音乐.mp3', type: 'file', subtype: 'audio', size: '4.2 MB', modified: '2024-01-12' },
    { id: 'd1', name: '项目计划.docx', type: 'file', subtype: 'document', size: '45 KB', modified: '2024-01-15' },
    { id: 'd2', name: '工作报告.pdf', type: 'file', subtype: 'document', size: '2.3 MB', modified: '2024-01-14' },
    { id: 'z1', name: '备份文件.zip', type: 'file', subtype: 'archive', size: '156 MB', modified: '2024-01-10' },
    { id: 'c1', name: 'index.html', type: 'file', subtype: 'code', size: '4 KB', modified: '2024-01-15' },
  ];

  const sidebarItems = [
    { icon: Home, label: '首页', path: '/home' },
    { icon: Download, label: '下载', path: '/home/Downloads' },
    { icon: HardDrive, label: '本地磁盘', path: '/disk' },
  ];

  const filteredFiles = useMemo(() => {
    let result = files.filter(file => {
      if (searchQuery) {
        return file.name.toLowerCase().includes(searchQuery.toLowerCase());
      }
      return true;
    });

    switch (sortBy) {
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'date':
        result.sort((a, b) => new Date(b.modified).getTime() - new Date(a.modified).getTime());
        break;
      case 'size':
        result.sort((a, b) => {
          const sizeA = parseFloat(a.size) || 0;
          const sizeB = parseFloat(b.size) || 0;
          return sizeA - sizeB;
        });
        break;
    }

    return result;
  }, [files, searchQuery, sortBy]);

  const currentFolder = files.filter(f => f.type === 'folder');
  const currentFolderFiles = files.filter(f => f.type === 'file');

  const getFileIcon = (item: FileItem) => {
    if (item.type === 'folder') {
      return <Folder className="w-10 h-10 text-orange-500" />;
    }

    switch (item.subtype) {
      case 'image':
        return <ImageIcon className="w-10 h-10 text-green-500" />;
      case 'video':
        return <Video className="w-10 h-10 text-purple-500" />;
      case 'audio':
        return <Music className="w-10 h-10 text-pink-500" />;
      case 'document':
        return <FileText className="w-10 h-10 text-blue-500" />;
      case 'archive':
        return <Archive className="w-10 h-10 text-yellow-500" />;
      case 'code':
        return <FileCode className="w-10 h-10 text-cyan-500" />;
      default:
        return <File className="w-10 h-10 text-gray-500" />;
    }
  };

  const handleItemClick = (e: React.MouseEvent, item: FileItem) => {
    if (e.ctrlKey || e.metaKey) {
      if (selectedItems.has(item.id)) {
        setSelectedItems(prev => {
          const newSet = new Set(prev);
          newSet.delete(item.id);
          return newSet;
        });
      } else {
        setSelectedItems(prev => new Set(prev).add(item.id));
      }
    } else {
      setSelectedItems(new Set([item.id]));
    }
  };

  const handleItemDoubleClick = (item: FileItem) => {
    if (item.type === 'folder') {
      setCurrentPath(item.path);
    }
  };

  const handleSelectAll = () => {
    if (selectedItems.size === currentFolderFiles.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(currentFolderFiles.map(f => f.id)));
    }
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <Home className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {currentPath.split('/').filter(Boolean).join(' / ')}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={handleSelectAll} className="text-sm text-blue-500 hover:text-blue-600">
            {selectedItems.size === currentFolderFiles.length ? '取消选择' : '全选'}
          </button>
          <button className="p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800">
            <MoreHorizontal className="w-4 h-4 text-gray-600 dark:text-gray-300" />
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-48 border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 flex flex-col">
          <div className="p-3 space-y-2">
            {sidebarItems.map((item, index) => (
              <button
                key={index}
                onClick={() => setCurrentPath(item.path)}
                className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg hover:bg-orange-100 dark:hover:bg-gray-700 transition-all text-left"
              >
                <item.icon className="w-5 h-5 text-orange-500" />
                <span className="text-sm text-gray-700 dark:text-gray-300">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="搜索文件..."
                  className="pl-10 pr-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-orange-500 w-64"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex bg-white dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600">
                <button onClick={() => setSortBy('name')} className={`p-2 text-sm ${sortBy === 'name' ? 'text-orange-500' : 'text-gray-600 dark:text-gray-300'}`}>
                  名称
                </button>
                <div className="w-px h-4 bg-gray-300 dark:bg-gray-600" />
                <button onClick={() => setSortBy('date')} className={`p-2 text-sm ${sortBy === 'date' ? 'text-orange-500' : 'text-gray-600 dark:text-gray-300'}`}>
                  日期
                </button>
                <div className="w-px h-4 bg-gray-300 dark:bg-gray-600" />
                <button onClick={() => setSortBy('size')} className={`p-2 text-sm ${sortBy === 'size' ? 'text-orange-500' : 'text-gray-600 dark:text-gray-300'}`}>
                  大小
                </button>
              </div>

              <div className="flex bg-white dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600">
                <button onClick={() => setViewMode('grid')} className={`p-2 ${viewMode === 'grid' ? 'text-orange-500' : 'text-gray-600 dark:text-gray-300'}`}>
                  <Grid className="w-4 h-4" />
                </button>
                <button onClick={() => setViewMode('list')} className={`p-2 ${viewMode === 'list' ? 'text-orange-500' : 'text-gray-600 dark:text-gray-300'}`}>
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex-1 p-4 overflow-y-auto">
            <div className="mb-6">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-3 flex items-center gap-2">
                <Folder className="w-4 h-4 text-orange-500" />
                <span className="font-medium">文件夹 ({currentFolder.length})</span>
              </div>

              {viewMode === 'grid' ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                  {currentFolder.map((folder) => (
                    <div
                      key={folder.id}
                      onDoubleClick={() => handleItemDoubleClick(folder)}
                      onClick={(e) => handleItemClick(e, folder)}
                      className={`flex flex-col items-center p-4 rounded-xl cursor-pointer transition-all ${
                        selectedItems.has(folder.id)
                          ? 'bg-orange-500 text-white ring-2 ring-orange-300'
                          : 'bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-sm'
                      }`}
                    >
                      <div className="mb-2">{getFileIcon(folder)}</div>
                      <span className="text-xs text-center text-black dark:text-gray-200 truncate w-full">
                        {folder.name}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {currentFolder.map((folder) => (
                    <div
                      key={folder.id}
                      onDoubleClick={() => handleItemDoubleClick(folder)}
                      onClick={(e) => handleItemClick(e, folder)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all ${
                        selectedItems.has(folder.id)
                          ? 'bg-orange-500 text-white ring-2 ring-orange-300'
                          : 'bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      {getFileIcon(folder)}
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-black dark:text-gray-200 truncate">
                          {folder.name}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mb-4">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-3 flex items-center gap-2">
                <File className="w-4 h-4 text-orange-500" />
                <span className="font-medium">文件 ({filteredFiles.length})</span>
              </div>

              {viewMode === 'grid' ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                  {filteredFiles.map((file) => (
                    <div
                      key={file.id}
                      onClick={(e) => handleItemClick(e, file)}
                      className={`flex flex-col items-center p-4 rounded-xl cursor-pointer transition-all ${
                        selectedItems.has(file.id)
                          ? 'bg-orange-500 text-white ring-2 ring-orange-300'
                          : 'bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-sm'
                      }`}
                    >
                      <div className="mb-2">{getFileIcon(file)}</div>
                      <span className="text-xs text-center mt-1 text-black dark:text-gray-200 truncate w-full">
                        {file.name}
                      </span>
                      <div className="flex items-center justify-between mt-1 px-1 text-orange-200 dark:text-orange-300">
                        <span className="text-xs">{file.size}</span>
                        <span className="text-xs">{file.modified}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredFiles.map((file) => (
                    <div
                      key={file.id}
                      onClick={(e) => handleItemClick(e, file)}
                      className={`flex items-center gap-4 px-4 py-3 rounded-lg cursor-pointer transition-all ${
                        selectedItems.has(file.id)
                          ? 'bg-orange-500 text-white ring-2 ring-orange-300'
                          : 'bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      {getFileIcon(file)}
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-black dark:text-gray-200 truncate">
                          {file.name}
                        </div>
                        <div className="flex items-center gap-4 text-gray-500 dark:text-gray-300 text-xs">
                          <span>{file.size}</span>
                          <span>{file.modified}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {filteredFiles.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-gray-500">
                <Search className="w-12 h-12 mb-4 text-gray-300" />
                <p className="text-sm">未找到文件</p>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between px-4 py-2 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-4">
              <span>共 {files.length} 个项目</span>
              <span>已选择 {selectedItems.size} 项</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-3 h-3" />
              <span>最后更新: 刚刚</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
