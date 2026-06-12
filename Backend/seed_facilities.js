const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const mongoose = require("mongoose");
const CarFacility = require("./model/CarFacilitySchema");

const facilities = [
  { name: "AC", iconName: "ac" },
  { name: "Airbag", iconName: "firstaid" },
  { name: "ABS Brakes", iconName: "steer" },
  { name: "Power Steering", iconName: "steer" },
  { name: "GPS Navigation", iconName: "map" },
  { name: "Mobile Charging Point", iconName: "charger" },
  { name: "USB Charger", iconName: "charger" },
  { name: "Bluetooth Music", iconName: "music" },
  { name: "Music System", iconName: "music" },
  { name: "WiFi", iconName: "wifi" },
  { name: "First Aid Kit", iconName: "firstaid" },
  { name: "Fire Extinguisher", iconName: "firstaid" },
  { name: "Bottled Water", iconName: "water" },
  { name: "Luggage Space", iconName: "carrier" },
  { name: "Pushback Seats", iconName: "seat" },
  { name: "Reclining Seats", iconName: "seat" },
  { name: "Child Seat (Optional)", iconName: "seat" },
  { name: "Recliner Seats", iconName: "seat" },
  { name: "LED TV", iconName: "tv" },
  { name: "Microphone (Mic)", iconName: "mic" },
  { name: "USB Charging", iconName: "charger" },
  { name: "Reading Light", iconName: "info" },
  { name: "Blanket", iconName: "seat" },
  { name: "Pillow", iconName: "seat" },
  { name: "Ice Box / Mini Cooler", iconName: "ac" },
  { name: "CCTV Camera", iconName: "cctv" },
  { name: "GPS Tracking", iconName: "map" },
  { name: "Luggage Carrier", iconName: "carrier" },
  { name: "Water Bottle", iconName: "water" },
  { name: "Emergency Exit", iconName: "exit" }
];

async function seed() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI not found in environment variables");
    }
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB...");
    
    for (const f of facilities) {
      await CarFacility.updateOne(
        { name: f.name },
        { $set: f },
        { upsert: true }
      );
      console.log(`Seeded: ${f.name}`);
    }
    
    console.log("All facilities seeded successfully! 🌱");
    process.exit(0);
  } catch (err) {
    console.error("Error seeding facilities:", err);
    process.exit(1);
  }
}

seed();
