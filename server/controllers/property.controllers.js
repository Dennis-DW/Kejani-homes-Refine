import mongoose from "mongoose";
import Property from "../mongodb/models/property.js";
import User from "../mongodb/models/user.js";
import { v2 as cloudinary } from "cloudinary";
import * as dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Function to fetch all properties with pagination, sorting, and filtering capabilities
const getAllProperties = async (req, res) => {
  // Destructuring query parameters from the request
  const {
    _start,
    _end,
    _sort,
    _order,
    title_like = "",
    propertyType = "",
  } = req.query;

  // Initializing the query object to filter properties
  const query = {};

  // Adding propertyType filter if it's provided
  if (propertyType !== "") {
    query.propertyType = propertyType;
  }

  // Adding title filter if title_like is provided
  if (title_like) {
    query.title = { $regex: title_like, $options: "i" }; // Case-insensitive search
  }

  try {
    // Counting the total number of documents that match the query
    const count = await Property.countDocuments(query);

    // Fetching properties based on the query, with pagination and sorting
    const properties = await Property.find(query)
      .limit(parseInt(_end)) // Limiting the number of results
      .skip(parseInt(_start)) // Skipping the initial results
      .sort({ [_sort]: _order === "asc" ? 1 : -1 }); // Sorting the results

    // Setting headers for pagination information
    res.header("X-Total-Count", count);
    res.header("Access-Control-Expose-Headers", "X-Total-Count");

    // Sending the fetched properties as a response
    res.status(200).json(properties);
  } catch (error) {
    // Logging the error and sending a 500 response
    console.error("Error getting all properties:", error);
    res
      .status(500)
      .json({ message: "Error getting all properties", error: error.message });
  }
};

const createProperty = async (req, res) => {
  const { title, description, propertyType, price, location, photo, email } =
    req.body;
  if (
    !title ||
    !description ||
    !propertyType ||
    !price ||
    !location ||
    !photo ||
    !email
  ) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  // Start a new session
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Find the user within the transaction
    const user = await User.findOne({ email }).session(session);
    if (!user) {
      throw new Error("User not found");
    }

    // Upload photo to Cloudinary
    const photoUrl = await cloudinary.uploader.upload(photo);

    // Create the new property
    const newProperty = await Property.create({
      title,
      description,
      propertyType,
      price,
      location,
      photo: photoUrl.url,
      creatorID: user._id,
    });

    // Add the new property ID to the user's properties array
    user.allProperties.push(newProperty._id);
    await user.save({ session });

    // Commit the transaction
    await session.commitTransaction();

    // Send a success response
    res.status(200).json({
      message: "Property created successfully",
    });
  } catch (error) {
    // Log the error and send an error response
    console.error("Error creating property:", error);
    res
      .status(500)
      .json({ message: "Error creating property", error: error.message });
  }
}; // End of createProperty

const getPropertyDetail = async (req, res) => {
  const { id } = req.params;

  try {
    const propertyExists = await Property.findOne({ _id: id }).populate(
      "creatorID"
    );

    if (!propertyExists) {
      return res.status(404).json({ message: "Property not found" });
    }

    return res.status(200).json(propertyExists);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching property details");
  }
};

const updateProperty = async (req, res) => {};
const deleteProperty = async (req, res) => {};

export {
  getAllProperties,
  createProperty,
  getPropertyDetail,
  updateProperty,
  deleteProperty,
};
