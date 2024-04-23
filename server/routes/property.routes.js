import express from "express";
import {
  getAllProperties,
  createProperty,
  getPropertyDetail,
  updateProperty,
  deleteProperty,
} from "../controllers/property.controllers.js";

const router = express.Router();

// Route for getting all properties
router.route("/").get(getAllProperties);

// Route for creating a new property
router.route("/").post(createProperty);

// Route for getting property details by ID with a "show" parameter
router.route("/:id").get(getPropertyDetail);

// Route for updating a property by ID
router.route("/:id").put(updateProperty);

// Route for deleting a property by ID
router.route("/:id").delete(deleteProperty);

// Error handling middleware
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

export default router;
