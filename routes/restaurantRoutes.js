const express = require("express");
const router = express.Router();
const {
  createRestaurant,
  getRestaurantsByRadius,
  getRestaurantsByDistanceRange,
  updateRestaurant,
  deleteRestaurant,
} = require("../controllers/restaurantController");
const auth = require("../middleware/authMiddleware"); // Middleware for user authentication

// Create a new restaurant
router.post("/", auth, createRestaurant);

// Get restaurants within a specified radius
router.post("/radius", auth, getRestaurantsByRadius);

// Get restaurants within a specified distance range
router.post("/distance-range", auth, getRestaurantsByDistanceRange);

// Update a restaurant
router.put("/:id", auth, updateRestaurant);

// Delete a restaurant
router.delete("/:id", auth, deleteRestaurant);

module.exports = router;
