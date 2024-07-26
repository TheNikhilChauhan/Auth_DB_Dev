const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const UserRepository = require("../repository/user-repository");
const { JWT_KEY } = require("../config/serverConfig");

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

  async signin(email, signinPassword) {
    try {
      const user = await this.userRepo.getByEmail(email);

      const verifyPassword = this.checkPassword(signinPassword, user.password);

      if (!verifyPassword) {
        console.log("Password doesn't match");
        throw { error: "Incorrect Password" };
      }

      //if password match create a token and it to the user
      const newJwt = this.createToken({ email: user.email, id: user.id });
      return newJwt;
    } catch (error) {
      console.log("Something went wrong in signin process");
      throw error;
    }
  }

  createToken(user) {
    try {
      const result = jwt.sign(user, JWT_KEY, { expiresIn: "7d" });
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
      console.log("Something went wrong in verify token");
      throw error;
    }
  }

  checkPassword(userPlainPassword, encryptedPassword) {
    try {
      return bcrypt.compareSync(userPlainPassword, encryptedPassword);
    } catch (error) {
      console.log("Something went wrong in password check");
      throw error;
    }
  }
}

module.exports = UserService;
