'use client';

import React, { useState } from 'react';
import { ZoomIn, ZoomOut, RotateCw, Download, ChevronLeft, ChevronRight } from 'lucide-react';

export default function ImageViewerApp() {
  const [currentImage, setCurrentImage] = useState(0);
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);

  const images = [
    { id: 1, name: '风景1.jpg', src: '/wallpaper.jpg' },
    { id: 2, name: '风景2.jpg', src: '/wallpaper.jpg' },
    { id: 3, name: '风景3.jpg', src: '/wallpaper.jpg' },
    { id: 4, name: '风景4.jpg', src: '/wallpaper.jpg' },
  ];

  const handleZoomIn = () => setZoom(Math.min(zoom + 25, 200));
  const handleZoomOut = () => setZoom(Math.max(zoom - 25, 50));
  const handleRotate = () => setRotation((rotation + 90) % 360);

  const nextImage = () => setCurrentImage((currentImage + 1) % images.length);
  const prevImage = () => setCurrentImage((currentImage - 1 + images.length) % images.length);

  return (
    <div className="flex flex-col h-full bg-black">
      <div className="flex items-center justify-between px-4 py-3 bg-gray-900">
        <div className="flex items-center gap-2">
          <span className="text-white font-medium">{images[currentImage].name}</span>
          <span className="text-gray-400 text-sm">
            {currentImage + 1} / {images.length}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleZoomOut}
            className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <ZoomOut className="w-5 h-5 text-white" />
          </button>
          <span className="text-white text-sm font-medium w-16 text-center">{zoom}%</span>
          <button
            onClick={handleZoomIn}
            className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <ZoomIn className="w-5 h-5 text-white" />
          </button>
          <button
            onClick={handleRotate}
            className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <RotateCw className="w-5 h-5 text-white" />
          </button>
          <div className="w-px h-6 bg-gray-700 mx-2" />
          <button className="p-2 rounded-lg hover:bg-gray-800 transition-colors">
            <Download className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center relative overflow-hidden">
        <button
          onClick={prevImage}
          className="absolute left-4 z-10 p-3 bg-black/50 hover:bg-black/70 rounded-full transition-all"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>

        <div
          className="relative transition-all duration-300"
          style={{
            transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
          }}
        >
          <div className="w-96 h-72 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg shadow-2xl flex items-center justify-center">
            <div className="text-center text-white">
              <div className="text-6xl mb-4">🖼️</div>
              <p className="text-xl font-medium">{images[currentImage].name}</p>
            </div>
          </div>
        </div>

        <button
          onClick={nextImage}
          className="absolute right-4 z-10 p-3 bg-black/50 hover:bg-black/70 rounded-full transition-all"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>

      <div className="flex items-center justify-center gap-3 p-4 bg-gray-900">
        {images.map((image, index) => (
          <button
            key={image.id}
            onClick={() => setCurrentImage(index)}
            className={`w-16 h-16 rounded-lg overflow-hidden transition-all ${
              index === currentImage
                ? 'ring-2 ring-orange-500 ring-offset-2 ring-offset-gray-900'
                : 'opacity-60 hover:opacity-100'
            }`}
          >
            <div className="w-full h-full bg-gradient-to-br from-orange-400 to-orange-600" />
          </button>
        ))}
      </div>
    </div>
  );
}
