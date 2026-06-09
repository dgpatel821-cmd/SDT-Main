const Car = require("../model/CarSchema");
const deleteFile = require("../utils/deleteFiles");

/* ================= ADD CAR ================= */
exports.addCar = async (req, res) => {
  try {
    const images = req.files
      ? req.files.map(file => `/uploads/cars/${file.filename}`)
      : [];

    const {
      name,
      type,
      seats,
      pricePerKm,
      fuelType,
      features
    } = req.body;

    if (!name || !type || !seats || !pricePerKm || !fuelType) {
      return res.status(400).json({
        message: "All required fields missing"
      });
    }

    const car = await Car.create({
      name,
      type,
      seats,
      pricePerKm,
      fuelType,
      features: Array.isArray(features) ? features : [features],
      images
    });

    res.status(201).json(car);
  } catch (error) {
    console.error("ADD CAR ERROR:", error);
    res.status(500).json({ message: "Failed to add car" });
  }
};


/* ================= GET ALL CARS ================= */
exports.getCars = async (req, res) => {
  try {
    const cars = await Car.find().sort({ createdAt: -1 });
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch cars" });
  }
};

/* ================= GET SINGLE CAR ================= */
exports.getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.json(car);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch car" });
  }
};

/* ================= UPDATE CAR ================= */
exports.updateCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    /* 🔥 SELECTIVE DELETION & MERGING OF IMAGES */
    let existingImages = [];
    if (req.body.existingImages) {
      if (Array.isArray(req.body.existingImages)) {
        existingImages = req.body.existingImages;
      } else {
        existingImages = [req.body.existingImages];
      }
    }

    // Delete any old images that were removed in the UI
    car.images.forEach(img => {
      if (!existingImages.includes(img)) {
        deleteFile(img);
      }
    });

    // Add newly uploaded files
    let newImages = [];
    if (req.files && req.files.length > 0) {
      newImages = req.files.map(
        file => `/uploads/cars/${file.filename}`
      );
    }

    const images = [...existingImages, ...newImages];

    const updatedCar = await Car.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        images,
        features: Array.isArray(req.body.features)
          ? req.body.features
          : [req.body.features]
      },
      { new: true }
    );

    res.json(updatedCar);
  } catch (error) {
    console.error("UPDATE CAR ERROR:", error);
    res.status(500).json({ message: "Failed to update car" });
  }
};


/* ================= DELETE CAR ================= */
exports.deleteCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    /* 🔥 DELETE ALL IMAGES FROM DISK */
    car.images.forEach(img => deleteFile(img));

    await car.deleteOne();

    res.json({ success: true, message: "Car deleted" });
  } catch (error) {
    console.error("DELETE CAR ERROR:", error);
    res.status(500).json({ message: "Failed to delete car" });
  }
};

