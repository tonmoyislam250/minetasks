const bcrypt = require("bcrypt");
const userModel = require("./usermodel");
const Joi = require("joi");

const schemavalid = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().required(),
  district: Joi.string().required(),
  password: Joi.string().required().min(6),
});

module.exports = {
  signup: async (req, res) => {
    try {
      const { error } = schemavalid.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }
      const { name, phone, district, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await userModel.createUser({
        name,
        phone,
        district,
        password: hashedPassword,
      });
      res
        .status(201)
        .json({ message: "User created successfully", user: newUser });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  login: async (req, res) => {
    try {
      const { error } = schemavalid.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }
      const { phone, password } = req.body;
      const user = await userModel.getUserByPhone(phone);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      res.cookie(
        "user_cookie",
        JSON.stringify({
          id: user.id,
          name: user.name,
          phone: user.phone,
          district: user.district,
        }),
        {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
        }
      );

      res.status(200).json({ message: "Login successful", user: user });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  logout: async (req, res) => {
    try {
      res.clearCookie("user_cookie");
      res.status(200).json({ message: "Logout successful" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
