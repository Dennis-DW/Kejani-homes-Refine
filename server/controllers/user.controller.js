import User from "../mongodb/models/user.js";

const getAllUsers = async (req, res) => {
  try {
    // Set a default limit if _end query parameter is not provided or is invalid
    const limit = parseInt(req.query._end) || 10;

    // Fetch users with the specified limit
    const users = await User.find({}).limit(limit);

    // Send the users data in the response
    res.status(200).json(users);
  } catch (error) {
    // Handle any errors that occur during the process
    res.status(500).json({ message: "Failed to fetch users.", error: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, avatar } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(200).json(userExists);
    }

    const newUser = await User.create({
      name,
      email,
      avatar,
    });

    // Send a response with the newly created user
    res.status(200).json(newUser);
  } catch (error) {
    // Use a 500 Internal Server Error status code for server errors
    res.status(500).json({ message: error.message });
  }
};
const getUserInfoByID = async (req, res) => {
  try {
    const { id } = req.params; // Ensure this line correctly extracts the id
    if (!id) {
      return res.status(400).json({ message: "User ID is required." });
    }
    const user = await User.findOne({ _id: id }).populate("allProperties");
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export { getAllUsers, createUser, getUserInfoByID };
