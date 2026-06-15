import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import DayAccordion from "../component/DayAccordian";
import WhyChooseUs from "../component/WhyChooseUs";
import { motion } from "framer-motion";

const BASE_URL = window.API_BASE_URL;

const isValidObjectId = (id) =>
  /^[0-9a-fA-F]{24}$/.test(id);

const GroupTourDetail = () => {
  const { id } = useParams();
  const [tour, setTour] = useState(null);
  const [itinerary, setItinerary] = useState([]);

  useEffect(() => {
    if (!isValidObjectId(id)) return;
    fetchTour();
    fetchItinerary();
  }, [id]);

  const fetchTour = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/group-tours/${id}`
      );
      setTour(res.data);
    } catch (err) {
      console.error("Tour fetch error", err);
    }
  };

  const fetchItinerary = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/group-tours/${id}/itinerary`);
      // Backend now returns just the array [...]
      const daysData = res.data?.itinerary || res.data;
      setItinerary(Array.isArray(daysData) ? daysData : []);
    } catch (err) {
      console.error("Group itinerary fetch error", err);
      setItinerary([]);
    }
  };

  const getDaysNights = (startDate, endDate) => {
    if (!startDate || !endDate) return "";
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days =
      Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
    return `${days} Days / ${days - 1} Nights`;
  };

  if (!tour) {
    return (
      <div className="py-20 text-center text-gray-500">
        Loading tour details...
      </div>
    );
  }

  

  return (
    <div className="w-full">

      {/* HERO */}
      <div className="relative h-[65vh]">
        <img
          src={tour.images?.length > 0 ? `${BASE_URL}${tour.images[0]}` : "/grouptourbooking2.webp"}
          alt={tour.title}
          className="absolute inset-0 w-full h-full object-cover object-center"
          onError={(e) => {
             e.target.src = "/grouptourbooking2.webp";
          }}
        />
        <div className="absolute inset-0 bg-black/60" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 h-full flex items-center justify-center text-center"
        >
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#f4612b]">
              {tour.title}
            </h1>
            <p className="mt-3 text-gray-200">
              {getDaysNights(tour.startDate, tour.endDate)}
              {tour.location && ` • ${tour.location}`}
            </p>
          </div>
        </motion.div>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-4 py-14 grid lg:grid-cols-3 gap-10">

        {/* LEFT – OVERVIEW & ITINERARY */}
        <div className="lg:col-span-2 space-y-8">
          {/* Tour Overview */}
          {tour.description && (
            <div className="bg-orange-50/20 border border-orange-100/50 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Tour Overview</h3>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed whitespace-pre-line">
                {tour.description}
              </p>
            </div>
          )}

          <div>
            <h2 className="text-2xl font-bold text-[#F4612B] mb-2">
              Tour Itinerary
            </h2>
            <p className="text-gray-500 mb-6">
              Day-wise detailed schedule with sightseeing & stay
            </p>

            <DayAccordion data={itinerary} />
          </div>
        </div>

        {/* RIGHT – PRICE, TICKETS & WHY CHOOSE US */}
        <div className="space-y-6 lg:sticky lg:top-24 h-fit">
          {/* Price & Tickets Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-orange-50">
            <div className="mb-4">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block">Starting from</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-black text-[#F4612B]">
                  ₹{Number(tour.finalPrice || (tour.oldPrice - (tour.oldPrice * (tour.discount || 0)) / 100)).toLocaleString("en-IN")}
                </span>
                <span className="text-xs font-bold text-gray-500">/ Person</span>
              </div>
              {tour.oldPrice > (tour.finalPrice || (tour.oldPrice - (tour.oldPrice * (tour.discount || 0)) / 100)) && (
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-sm text-gray-400 line-through">
                    ₹{Number(tour.oldPrice).toLocaleString("en-IN")}
                  </span>
                  <span className="bg-orange-100 text-orange-700 text-[10px] font-black px-2 py-0.5 rounded-full">
                    {tour.discount}% OFF
                  </span>
                </div>
              )}
            </div>

            {tour.includedTickets?.length > 0 && (
              <div className="border-t border-dashed border-gray-100 pt-4 mt-4">
                <h4 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Included Tickets</h4>
                <div className="flex flex-wrap gap-1.5">
                  {tour.includedTickets.map((ticket, i) => (
                    <span key={i} className="bg-green-50 border border-green-200 text-green-700 text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-tight">
                      🎫 {ticket}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <WhyChooseUs tourId={tour._id} type="group" />
        </div>
      </div>
    </div>
  );
};

export default GroupTourDetail;
