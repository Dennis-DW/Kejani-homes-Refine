import express from "express";

// Import all the controllers
import {
 getAllUsers,
 createUser,
 getUserInfoByID,
} from "../controllers/user.controller.js";

const router = express.Router();

// Route for getting all users
router.route("/").get(getAllUsers);

// Route for creating a new user
router.route("/").post(createUser);

// Route for getting user information by ID
router.route("/:id").get(getUserInfoByID);

// Error handling middleware
router.use((err, req, res, next) => {
 console.error(err.stack);
 res.status(500).send('Something broke!');
});

export default router;
