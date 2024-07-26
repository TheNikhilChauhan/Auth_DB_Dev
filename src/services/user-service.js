const UserRepository = require("../repository/user-repository");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { JWT_KEY } = require("../config/config.json");

class UserService {
  constructor() {
    this.userRepo = new UserRepository();
  }

  async create(data) {
    try {
      const user = await this.userRepo.create(data);
      return user;
    } catch (error) {
      console.log("Something went wrong in the service layer");
      throw error;
    }
  }

  createToken(user) {
    try {
      const result = jwt.sign(user, JWT_KEY, { expires: "7d" });
      return result;
    } catch (error) {
      console.log("Something went wrong in token creation");
      throw error;
    }
  }

  verifyToken(token) {
    try {
      const response = jwt.verify(token, JWT_KEY);
      return response;
    } catch (error) {
      console.log("Something went wrong in token creation");
      throw error;
    }
  }

  checkPassword(userPlainPassword, encryptedPassword) {
    try {
      return bcrypt.compareSync(userPlainPassword, encryptedPassword);
    } catch (error) {
      console.log("Something went wrong in token creation");
      throw error;
    }
  }
}

module.exports = UserService;
