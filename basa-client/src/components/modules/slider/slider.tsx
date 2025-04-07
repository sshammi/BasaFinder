import { useState } from "react";

export const ImageSlider = ({ images }: { images: string[] }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
  
    const handlePrev = () => {
      setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };
  
    const handleNext = () => {
      setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };
  
    return (
      <div className="relative">
        <img
          src={images[currentIndex]}
          alt="House"
          className="w-full h-40 object-cover rounded"
        />
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-opacity-50 text-white p-2 rounded-full"
          onClick={handlePrev}
        >
          &lt;
        </button>
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-opacity-50 text-white p-2 rounded-full"
          onClick={handleNext}
        >
          &gt;
        </button>
      </div>
    );
  };