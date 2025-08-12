'use client';

import { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import Image from 'next/image';

const images = [
  { src: '/portfolio/deck1.jpg', alt: 'Custom deck with railing' },
  { src: '/portfolio/deck2.jpg', alt: 'Patio with pergola' },
  { src: '/portfolio/deck3.jpg', alt: 'Backyard composite deck' },
  { src: '/portfolio/deck4.jpg', alt: 'Outdoor kitchen with bar seating' },
  { src: '/portfolio/deck5.jpg', alt: 'Covered deck with lighting' },
  { src: '/portfolio/deck6.jpg', alt: 'Stone patio with firepit' },
];

export default function Portfolio() {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setCurrentIndex(index);
  const closeLightbox = () => setCurrentIndex(null);

  const prevImage = () => {
    if (currentIndex === null) return;
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  };

  const nextImage = () => {
    if (currentIndex === null) return;
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  // Keyboard navigation effect
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (currentIndex === null) return;

      if (e.key === 'ArrowLeft') {
        prevImage();
      } else if (e.key === 'ArrowRight') {
        nextImage();
      } else if (e.key === 'Escape') {
        closeLightbox();
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex]);

  // Swipe handlers
  const handlers = useSwipeable({
    onSwipedLeft: () => nextImage(),
    onSwipedRight: () => prevImage(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <section className="py-16 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-white italic">Our Portfolio</h2>
          <p className="mt-4 text-2xl text-white">
            Explore some of our recent outdoor living projects, crafted with precision and care.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative aspect-w-4 aspect-h-3 rounded-lg overflow-hidden shadow hover:shadow-lg transition cursor-pointer h-48"
              onClick={() => openLightbox(index)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {currentIndex !== null && (
        <div
          {...handlers}
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          <div
            className="relative max-w-4xl w-full flex items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={prevImage}
              className="text-white text-4xl px-4 select-none hover:text-gray-400"
              aria-label="Previous image"
            >
              ‹
            </button>

            <div className="relative flex-1 max-h-[80vh]">
              <Image
                src={images[currentIndex].src}
                alt={images[currentIndex].alt}
                width={1600}
                height={900}
                className="rounded-lg object-contain mx-auto max-h-[80vh]"
              />
            </div>

            <button
              onClick={nextImage}
              className="text-white text-4xl px-4 select-none hover:text-gray-400"
              aria-label="Next image"
            >
              ›
            </button>

            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white text-3xl font-bold hover:text-gray-400"
              aria-label="Close lightbox"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

