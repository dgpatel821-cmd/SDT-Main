import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const BASE_URL = window.API_BASE_URL;

export default function ImageSlider({ images }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;
    const interval = setInterval(() => {
      setI((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, [images]);

  if (!images?.length) return null;

  return (
    <div className="relative h-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.img
          key={i}
          src={images[i] || "https://placehold.co/600x400?text=No+Image"}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onError={(e) => {
            e.target.src = "https://placehold.co/600x400?text=No+Image";
          }}
        />
      </AnimatePresence>

      {images.length > 1 && (
        <>
          <button
            onClick={() => setI(i === 0 ? images.length - 1 : i - 1)}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-[#f46b12] p-1 rounded-full"
          >
            <ChevronLeft size={18} className="text-white"/>
          </button>

          <button
            onClick={() => setI(i === images.length - 1 ? 0 : i + 1)}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#f46b12] p-1 rounded-full"
          >
            <ChevronRight size={18} className="text-white" />
          </button>
        </>
      )}
    </div>
  );
}
