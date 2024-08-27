const express = require("express");
const router = express.Router();
const {
  createRestaurant,
  getRestaurantsByRadius,
  getRestaurantsByDistanceRange,
  updateRestaurant,
  deleteRestaurant,
} = require("../controllers/restaurantController");
const { protect } = require("../middleware/authMiddleware");

// Apply middleware to protect routes
router.post("/", protect, createRestaurant);
router.post("/radius", protect, getRestaurantsByRadius);
router.post("/distance-range", protect, getRestaurantsByDistanceRange);
router.put("/:id", protect, updateRestaurant);
router.delete("/:id", protect, deleteRestaurant);

module.exports = router;
