import { useNavigate } from "react-router-dom";
import ImageSlider from "./ImageSlider";
import {
  Wifi, Users, IndianRupee, Snowflake, Bluetooth,
  MapPin, Music, BatteryCharging, Luggage, Car,
  Coffee, Shield, Info, ArrowRight, Fuel,
  Tv, Mic, Armchair, Eye, LogOut, Disc,
  Usb, GlassWater, Baby, Lightbulb, Layers, Bed, Video, DoorOpen, Compass, ShieldAlert, HeartPulse, ShieldCheck, Flame
} from "lucide-react";
import { motion } from "framer-motion";

/* ── ICON HELPER ── */
const getCarIcon = (name) => {
  if (!name) return Info;
  const n = name.toLowerCase();
  
  if (n.includes("ac") || n.includes("cool")) return Snowflake;
  if (n.includes("gps") || n.includes("nav") || n.includes("track")) return MapPin;
  if (n.includes("blue") || n.includes("tooth")) return Bluetooth;
  if (n.includes("music") || n.includes("song") || n.includes("audio") || n.includes("sound") || n.includes("speaker")) return Music;
  if (n.includes("usb")) return Usb;
  if (n.includes("charg") || n.includes("plug") || n.includes("point")) return BatteryCharging;
  if (n.includes("luggage") || n.includes("bag") || n.includes("boot") || n.includes("space") || n.includes("carrier")) return Luggage;
  if (n.includes("wifi") || n.includes("internet")) return Wifi;
  if (n.includes("water") || n.includes("bottle")) return GlassWater;
  if (n.includes("food") || n.includes("drink")) return Coffee;
  if (n.includes("fuel") || n.includes("petrol") || n.includes("diesel")) return Fuel;
  if (n.includes("airbag")) return ShieldAlert;
  if (n.includes("abs") || n.includes("brake")) return ShieldAlert;
  if (n.includes("first aid")) return HeartPulse;
  if (n.includes("extinguisher")) return Flame;
  if (n.includes("safe") || n.includes("secur")) return ShieldCheck;
  if (n.includes("tv") || n.includes("led") || n.includes("screen")) return Tv;
  if (n.includes("mic") || n.includes("speak") || n.includes("voice")) return Mic;
  if (n.includes("child") || n.includes("baby")) return Baby;
  if (n.includes("light")) return Lightbulb;
  if (n.includes("blanket")) return Layers;
  if (n.includes("pillow")) return Bed;
  if (n.includes("pushback") || n.includes("reclin") || n.includes("seat")) return Armchair;
  if (n.includes("cctv") || n.includes("camera") || n.includes("eye")) return Video;
  if (n.includes("exit") || n.includes("emerg")) return DoorOpen;
  if (n.includes("steer") || n.includes("wheel")) return Compass;
  
  return Info;
};

const BASE_URL = window.API_BASE_URL;

export default function CarCard({ car }) {
  const navigate = useNavigate();

  const images = car.images?.length > 0
    ? car.images.map(img => img.startsWith("http") ? img : `${BASE_URL}${img}`)
    : [];

  return (
    <motion.div
      whileHover={{ y: -6, boxShadow: "0 20px 48px -12px rgba(244,97,43,0.18)" }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-md group cursor-pointer"
      onClick={() => navigate(`/car-book/${car._id}`)}
    >
      {/* ── IMAGE ── */}
      <div className="relative h-48 w-full bg-gray-50 overflow-hidden">
        {images.length > 0 ? (
          <ImageSlider images={images} />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Car size={56} className="text-gray-200" />
          </div>
        )}

        {/* type badge */}
        <span className="absolute top-3 left-3 flex items-center gap-1.5
                          bg-[#F4612B] text-white text-xs font-bold
                          px-3 py-1.5 rounded-full capitalize shadow-md">
          <Car size={12} />
          {car.type || "Vehicle"}
        </span>

        {/* price badge */}
        <span className="absolute top-3 right-3 flex items-center gap-1
                          bg-white/90 backdrop-blur-sm text-[#F4612B] text-xs font-bold
                          px-3 py-1.5 rounded-full shadow-sm border border-orange-100">
          <IndianRupee size={11} />
          {car.pricePerKm}/km
        </span>
      </div>

      {/* ── CONTENT ── */}
      <div className="p-4 space-y-3">

        {/* name + seats */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-bold text-gray-900 text-lg leading-tight group-hover:text-[#F4612B] transition-colors">
            {car.name}
          </h3>
          <span className="shrink-0 flex items-center gap-1 bg-orange-50 text-orange-700 text-xs font-semibold px-2.5 py-1 rounded-lg border border-orange-100">
            <Users size={12} />
            {car.seats} Seats
          </span>
        </div>

        {/* features chips */}
        {car.features?.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {car.features.slice(0, 4).map(f => {
              const Icon = getCarIcon(f);
              return (
                <span
                  key={f}
                  className="flex items-center gap-1 bg-gray-50 border border-gray-100
                             text-gray-600 text-xs font-medium px-2.5 py-1 rounded-lg capitalize"
                >
                  <Icon size={11} className="text-[#F4612B]" />
                  {f}
                </span>
              );
            })}
            {car.features.length > 4 && (
              <span className="text-xs text-gray-400 self-center">+{car.features.length - 4}</span>
            )}
          </div>
        )}

        {/* CTA */}
        <button
          onClick={e => { e.stopPropagation(); navigate(`/car-book/${car._id}`); }}
          className="w-full py-3 flex items-center justify-center gap-2
                     bg-[#F4612B] text-white text-sm font-bold rounded-xl
                     hover:bg-[#e65a0f] active:scale-[0.98] transition-all
                     shadow-sm shadow-orange-200"
        >
          Book Now
          <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
}
