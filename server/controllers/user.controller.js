import User from "../mongodb/models/user.js";

const getAllUsers = async (req, res) => {};
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

const getUserInfoByID = async (req, res) => {};

export { getAllUsers, createUser, getUserInfoByID };
