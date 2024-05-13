import User from "../model/User.js";

import TokenVerify from "../middleware/TokenVerify.js";
import dotenv from "dotenv";

class UserController {
  async index(req, res) {
    const userData = await User.find({});
    res.json(userData);
  }

  async store(req, res) {
    const userData = await User.create({ ...req.body });
    res.status(201).json({ status: true, message: "Success" });
  }

  async destroy(req, res) {
    let id = req.params.id;
    await User.findByIdAndDelete(id);
    return res.status(201).json({ status: true, message: "Success" });
  }

  async update(req, res) {
    let id = req.params.id;
    const { name, email, gender } = req.body;

    try {
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { name, email, gender },
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).send("User not found");
      }

      return res.status(201).json({ status: true, message: "Success" });
    } catch (error) {
      console.log(error);
    }
  }

  async getById(req, res) {
    let id = req.params.id;
    const user = await User.findById(id);
    return res.json(user);
  }
}

export default UserController;
