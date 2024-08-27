const Restaurant = require("../models/Restaurant");

// Create a new restaurant
const createRestaurant = async (req, res) => {
  try {
    const { name, description, latitude, longitude, ratings } = req.body;

    const newRestaurant = new Restaurant({
      name,
      description,
      location: {
        type: "Point",
        coordinates: [longitude, latitude],
      },
      ratings: ratings || [], // Ensure ratings are included
    });

    await newRestaurant.save();
    res.status(201).json(newRestaurant);
  } catch (error) {
    res.status(500).json({ message: "Error creating restaurant", error });
  }
};

// Get restaurants by location within a specified radius
const getRestaurantsByRadius = async (req, res) => {
  try {
    const { latitude, longitude, radius } = req.body;

    const restaurants = await Restaurant.find({
      location: {
        $geoWithin: {
          $centerSphere: [[longitude, latitude], radius / 6378.1],
        },
      },
    });
    // Transform the restaurant data to include average rating and number of ratings
    const transformedRestaurants = restaurants.map((restaurant) => {
      const { name, description, location, ratings } = restaurant;

      // Compute average rating and number of ratings
      const averageRating = ratings.length > 0
        ? ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length
        : 0;
      const numberOfRatings = ratings.length;

      return {
        name,
        description,
        location: {
          latitude: location.coordinates[1],
          longitude: location.coordinates[0],
        },
        averageRating,
        numberOfRatings,
      };
    });

    res.status(200).json(transformedRestaurants);
    } catch (error) {
    res.status(500).json({ message: "Error retrieving restaurants", error });
  }
};

// Get restaurants by location within a specified distance range
const getRestaurantsByDistanceRange = async (req, res) => {
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

    // Transform the restaurant data to include average rating and number of ratings
    const transformedRestaurants = restaurants.map((restaurant) => {
      const { name, description, location, ratings } = restaurant;

      // Compute average rating and number of ratings
      const averageRating = ratings.length > 0
        ? ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length
        : 0;
      const numberOfRatings = ratings.length;

      return {
        name,
        description,
        location: {
          latitude: location.coordinates[1],
          longitude: location.coordinates[0],
        },
        averageRating,
        numberOfRatings,
      };
    });

    res.status(200).json(transformedRestaurants);
    } catch (error) {
    res.status(500).json({ message: "Error retrieving restaurants", error });
  }
};

const updateRestaurant = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    const { name, description, latitude, longitude, ratings } = req.body;

    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      restaurantId,
      {
        name,
        description,
        location: {
          type: "Point",
          coordinates: [longitude, latitude],
        },
        ratings: ratings || [], // Ensure ratings are updated
      },
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
const deleteRestaurant = async (req, res) => {
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

module.exports = { createRestaurant, getRestaurantsByDistanceRange, getRestaurantsByRadius, updateRestaurant, deleteRestaurant};