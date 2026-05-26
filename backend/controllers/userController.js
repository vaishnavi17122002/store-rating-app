const User = require("../models/User");

const bcrypt =
  require("bcryptjs");

// =========================
// Get Users
// =========================

exports.getUsers =
  async (req, res) => {

    try {

      const users =
        await User.findAll({

          attributes: [

            "id",

            "name",

            "email",

            "address",

            "role",

          ],

        });

      res.status(200).json(users);

    } catch (error) {

      res.status(500).json({

        message: error.message,

      });

    }

  };

// =========================
// Update Password
// =========================

exports.updatePassword =
  async (req, res) => {

    try {

      const { password } = req.body;

      const user = await User.findOne({
        where: { id: req.user.id },
      });

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      const passwordRegex =
        /^(?=.*[A-Z])(?=.*[!@#$%^&*])/;

      if (password.length < 8 || password.length > 16) {
        return res.status(400).json({
          message: "Password must be 8-16 characters",
        });
      }

      if (!passwordRegex.test(password)) {
        return res.status(400).json({
          message: "Password must contain one uppercase and one special character",
        });
      }

      // Hash Password
      const hashedPassword = await bcrypt.hash(password, 10);

      user.password = hashedPassword;
      await user.save();

      return res.status(200).json({
        message: "Password Updated Successfully",
      });

    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }

  };

