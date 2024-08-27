const Restaurant = require("../models/Restaurant");

// Create a new restaurant
exports.createRestaurant = async (req, res) => {
  try {
    const { name, description, latitude, longitude } = req.body;

    const newRestaurant = new Restaurant({
      name,
      description,
      location: {
        type: "Point",
        coordinates: [longitude, latitude],
      },
    });

    await newRestaurant.save();
    res.status(201).json(newRestaurant);
  } catch (error) {
    res.status(500).json({ message: "Error creating restaurant", error });
  }
};

// Get restaurants by location within a specified radius
exports.getRestaurantsByRadius = async (req, res) => {
  try {
    const { latitude, longitude, radius } = req.body;

    const restaurants = await Restaurant.find({
      location: {
        $geoWithin: {
          $centerSphere: [[longitude, latitude], radius / 6378.1],
        },
      },
    });

    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving restaurants", error });
  }
};

// Get restaurants by location within a specified distance range
exports.getRestaurantsByDistanceRange = async (req, res) => {
  try {
    const { latitude, longitude, minimumDistance, maximumDistance } = req.body;

    const restaurants = await Restaurant.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude],
          },
          $minDistance: minimumDistance,
          $maxDistance: maximumDistance,
        },
      },
    });

    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving restaurants", error });
  }
};

// Update a restaurant
exports.updateRestaurant = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    const updateData = req.body;

    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      restaurantId,
      updateData,
      { new: true }
    );

    if (!updatedRestaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    res.status(200).json(updatedRestaurant);
  } catch (error) {
    res.status(500).json({ message: "Error updating restaurant", error });
  }
};

// Delete a restaurant
exports.deleteRestaurant = async (req, res) => {
  try {
    const restaurantId = req.params.id;

    const deletedRestaurant = await Restaurant.findByIdAndDelete(restaurantId);

    if (!deletedRestaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    res.status(200).json({ message: "Restaurant deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting restaurant", error });
  }
};
