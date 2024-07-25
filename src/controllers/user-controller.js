const UserService = require("../services/user-service");

const userService = new UserService();

const createUser = async (req, res) => {
  try {
    const response = await userService.create({
      email: req.body.email,
      password: req.body.password,
    });
    return res.status(201).json({
      data: response,
      success: true,
      message: "New User created successfully",
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "Something went wrong in controller layer",
      err: error,
    });
  }
};

module.exports = {
  createUser,
};
