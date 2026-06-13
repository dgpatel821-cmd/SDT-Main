import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ImageSlider({ images }) {
  const [i, setI] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!images || images.length <= 1 || isDragging) return;
    const interval = setInterval(() => {
      setI((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3500);
    return () => clearInterval(interval);
  }, [images, isDragging]);

  if (!images?.length) return null;

  return (
    <div
      className="relative h-full overflow-hidden select-none touch-pan-y"
      onClick={(e) => {
        if (isDragging) {
          e.stopPropagation();
          e.preventDefault();
        }
      }}
      onClickCapture={(e) => {
        if (isDragging) {
          e.stopPropagation();
          e.preventDefault();
        }
      }}
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={i}
          src={images[i] || "https://placehold.co/600x400?text=No+Image"}
          className="absolute inset-0 w-full h-full object-cover cursor-grab active:cursor-grabbing"
          initial={{ opacity: 0.6 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.6}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={(event, info) => {
            const swipeThreshold = 50; // pixels
            if (info.offset.x < -swipeThreshold) {
              // Swiped left -> Next image
              setI((prev) => (prev === images.length - 1 ? 0 : prev + 1));
            } else if (info.offset.x > swipeThreshold) {
              // Swiped right -> Previous image
              setI((prev) => (prev === 0 ? images.length - 1 : prev - 1));
            }
            // Small timeout to allow the click event to fire and be intercepted
            setTimeout(() => setIsDragging(false), 50);
          }}
          onError={(e) => {
            e.target.src = "https://placehold.co/600x400?text=No+Image";
          }}
        />
      </AnimatePresence>

      {/* Premium Pagination Dots */}
      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10 bg-black/20 px-2 py-1 rounded-full backdrop-blur-sm pointer-events-none">
          {images.map((_, idx) => (
            <div
              key={idx}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                idx === i ? "bg-[#F4612B] scale-125" : "bg-white/60"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
