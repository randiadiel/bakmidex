"use client";

import { useState } from "react";
import Image from "next/image";

interface ImageCarouselProps {
  images: string[];
}

export default function ImageCarousel({ images }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstImage = currentIndex === 0;
    const newIndex = isFirstImage ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastImage = currentIndex === images.length - 1;
    const newIndex = isLastImage ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  if (!images || images.length === 0) {
    return <div className="carousel-container bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">No images available</div>;
  }

  return (
    <div className="carousel-container">
      <div className="carousel-image-container">
        <Image
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="carousel-image"
          fill
          priority={currentIndex === 0} // Prioritize loading the first image
        />
      </div>
      {images.length > 1 && (
        <>
          <button onClick={goToPrevious} className="carousel-button prev">
            &#10094;
          </button>
          <button onClick={goToNext} className="carousel-button next">
            &#10095;
          </button>
        </>
      )}
    </div>
  );
}