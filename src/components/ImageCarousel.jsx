import React, { useState } from "react";

export default function ImageCarousel({ images }) {
  const [current, setCurrent] = useState(0);
  if (!images || images.length === 0) return null;

  const prev = () => setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));

  return (
    <div className="mt-8 relative w-full max-w-md mx-auto select-none">
      <img
        src={images[current]}
        alt={`Image ${current + 1}`}
        className="w-full h-64 object-cover rounded-md"
      />
      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute top-1/2 left-2 -translate-y-1/2 bg-black bg-opacity-50 text-white px-2 py-1 rounded"
          >
            ‹
          </button>
          <button
            onClick={next}
            className="absolute top-1/2 right-2 -translate-y-1/2 bg-black bg-opacity-50 text-white px-2 py-1 rounded"
          >
            ›
          </button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1">
            {images.map((_, i) => (
              <span
                key={i}
                className={`w-2 h-2 rounded-full ${
                  i === current ? "bg-white" : "bg-gray-400"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
