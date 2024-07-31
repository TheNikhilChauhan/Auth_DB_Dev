const { User, Role } = require("../models/index");
const ValidationError = require("../utils/validation-error");

class UserRepository {
  async create(data) {
    try {
      const user = await User.create(data);
      return user;
    } catch (error) {
      if (error.name == "SequelizeValidationError") {
        throw new ValidationError(error);
      }
      console.log("Something went wrong on create repo layer");
      throw error;
    }
  }

  async destroy(userId) {
    try {
      const user = await User.destroy({
        where: {
          id: userId,
        },
      });
      return user;
    } catch (error) {
      console.log("Something went wrong on repository layer destroy");
      throw error;
    }
  }

  async getById(userId) {
    try {
      const user = await User.findByPk(userId, {
        attributes: ["email", "id"],
      });

      return user;
    } catch (error) {
      console.log("Something went wrong on get id layer");
      throw error;
    }
  }

  async getByEmail(userEmail) {
    try {
      const user = await User.findOne({
        where: {
          email: userEmail,
        },
      });
      return user;
    } catch (error) {
      console.log("Something went wrong on get email layer");
      throw error;
    }
  }

  async isAdmin(userId) {
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        throw new Error("User not found");
      }

      const adminRole = await Role.findOne({
        where: {
          name: "ADMIN",
        },
      });
      if (!adminRole) {
        throw new Error("Admin role not found");
      }

      const hasRole = await user.hasRole(adminRole);
      return hasRole;
    } catch (error) {
      console.error("Something went wrong in repository isAdmin:", error);
      throw error;
    }
  }
}

module.exports = UserRepository;
