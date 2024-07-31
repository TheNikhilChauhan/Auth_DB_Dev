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
    return res.status(error.statusCode).json({
      data: {},
      success: false,
      message: error.message,
      err: error.explanation,
    });
  }
};

const signin = async (req, res) => {
  try {
    const response = await userService.signin(
      req.body.email,
      req.body.password
    );
    return res.status(200).json({
      data: response,
      success: true,
      message: "User signed in successfully",
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

const isAuthenticated = async (req, res) => {
  try {
    const token = req.headers["x-access-token"];
    const response = await userService.isAuthenticated(token);
    return res.status(200).json({
      success: true,
      err: {},
      data: response,
      message: "user is authenticated and token is valid",
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "Something went wrong",
      err: error,
    });
  }
};

const isAdmin = async (req, res) => {
  try {
    const response = await userService.isAdmin(req.body.id);
    return res.status(200).json({
      success: true,
      err: {},
      data: response,
      message: "Successfully fetched whether user is admin or not",
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "Something went wrong",
      err: error,
    });
  }
};

module.exports = {
  createUser,
  signin,
  isAuthenticated,
  isAdmin,
};
