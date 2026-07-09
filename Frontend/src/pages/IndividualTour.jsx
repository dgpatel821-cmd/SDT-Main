import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import { motion } from "framer-motion";
import TourCard from "../component/TourCard";
import TourCardSkeleton from "../component/TourCardSkeleton";

const IndividualTour = () => {
  const [tours, setTours] = useState([]);
   const [loading, setLoading] = useState(true);
   const BASE_URL = window.API_BASE_URL;

  useEffect(() => {
  const fetchTours = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/individual-tours`);
      setTours(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  fetchTours();
}, []);

  return (
    <div className="w-full">
      <Helmet>
        <title>Custom Individual Tour Packages Gujarat 2026 – Saurashtra Darshan Tours</title>
        <meta name="description" content="Plan your perfect Gujarat trip with our custom individual tour packages 2026. Personalized itineraries for Somnath, Dwarka, Gir Safari, Rann of Kutch & more. Travel your way with Saurashtra Darshan Tours!" />
        <meta name="keywords" content="individual tour Gujarat, custom Gujarat tour package, private tour Gujarat, personalized Gujarat travel, Gujarat honeymoon tour, Gujarat solo tour, Gujarat trip planning, customized Saurashtra tour, Gujarat holiday package for couple" />
        <link rel="canonical" href="https://www.saurashtradarshantour.com/tours/indivisual" />
        <meta property="og:title" content="Custom Individual Tour Packages Gujarat 2026 – Saurashtra Darshan Tours" />
        <meta property="og:description" content="Personalized Gujarat tour packages for solo, couples & families. Explore Somnath, Dwarka, Gir, Kutch your way. Book your custom tour today!" />
        <meta property="og:url" content="https://www.saurashtradarshantour.com/tours/indivisual" />
        <meta property="og:image" content="https://www.saurashtradarshantour.com/IndividualTour.webp" />
      </Helmet>

      {/* ================= HERO SECTION ================= */}
      <div className="relative w-full h-[60vh] md:h-[75vh] overflow-hidden">
        {/* HERO IMAGE */}
        <img
          src="/IndividualTour.webp"  // 👈 place image in public folder
          alt="Individual Tours"
          className="absolute inset-0 w-full h-full object-cenetr"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/55" />

        {/* HERO CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="relative z-10 h-full flex flex-col
                     items-center justify-center text-center px-4"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-3xl md:text-5xl lg:text-6xl
                       font-extrabold text-[#f4612b] tracking-wide"
          >
            Explore Individual Tour
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-4 max-w-2xl text-sm md:text-lg
                       text-gray-200"
          >
            Personalized journeys crafted just for you.
            Travel at your pace,<br></br> your comfort, your way.
          </motion.p>

          {/* <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-6 px-8 py-3 rounded-full
                       bg-[#F4612B] text-white font-semibold
                       hover:bg-white hover:text-[#F4612B]
                       transition-all"
          >
            Explore Trips
          </motion.button> */}
        </motion.div>
      </div>

      {/* ================= TOUR CARDS ================= */}
      <div className="w-full py-14">
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-3xl md:text-4xl
                     font-bold mb-10 text-[#F4612B]"
        >
          Personalized Tour Packages
        </motion.h2>

        <div className="
  grid
  grid-cols-1
  sm:grid-cols-2
  lg:grid-cols-3
  gap-8
  px-6 md:px-16 lg:px-12
  items-stretch
">{/* ================= SKELETON ================= */}
          {loading &&
            Array.from({ length: 6 }).map((_, i) => (
              <TourCardSkeleton key={i} />
            ))}

          {/* ================= TOUR CARDS ================= */}
          {!loading &&
            tours.map(tour => (
              <TourCard key={tour._id} tour={tour} type="individual" />
            ))}
        </div>
      </div>
    </div>
  );
};

export default IndividualTour;
