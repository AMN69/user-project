/**
 * User controller : All business logic goes here
 */
const User = require("../models/user_model");
const bcrypt = require("bcryptjs");
/**
 * this method is to create the user
 */
exports.create = async (req, res) => {
  /**
   * validation request
   */
  if (!req.body.email || !req.body.password || !req.body.name) {
    return res.status(400).send({
      message: "Required field can not be empty",
    });
  }
  /**
   * Create a user
   */
  const user = new User({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
    name: req.body.name,
    age: req.body.age,
    gender: req.body.gender,
    isActive: req.body.isActive,
    userType: req.body.userType,
  });
  /**
   * Save user to database
   */
  try {
    const newUser = await user.save();
    res.send(newUser);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while creating the User.",
    });
  }
};

/**
 * Find all Users
 */
exports.findAll = async (req, res) => {
  try {
    const users = await User.find().sort({ name: -1 });

    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Error Occured",
    });
  }
};

/**
 * Find one User
 */
exports.findOne = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send({
        message: "User not found with id " + req.params.id,
      });
    }
    res.status(200).send(user);
    //console.log(user);
  } catch (error) {
    return res.status(500).send({
      message: "Error retrieving user with id " + req.params.id,
    });
  }
};

/**
 * Delete a user with the specified id in the request
 */
exports.delete = async (req, res) => {
  try {
    const user = await User.findByIdAndRemove(req.params.id);
    if (!user) {
      return res.status(404).send({
        message: "User not found ",
      });
    }
    res.send({ message: "User deleted successfully!" });
  } catch (error) {
    return res.status(500).send({
      message: "Could not delete user ",
    });
  }
};

/**
 * Update a user with the specified id in the request
 */
exports.UpdateUser = async (req, res) => {
  if (!req.body.email || !req.body.password || !req.body.name) {
    res.status(400).send({
      message: "required fields cannot be empty",
    });
  }

  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) {
      return res.status(404).send({
        message: "no user found",
      });
    }
    res.status(200).send(user);
  } catch (error) {
    return res.status(404).send({
      message: "error while updating the post",
    });
  }
};
