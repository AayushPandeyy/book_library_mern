import User from "../model/User.js";

import dotenv from "dotenv";

class UserController {
  async index(req, res) {
    const userData = await User.find({});
    res.json(userData);
  }

  async store(req, res) {
    const userData = await User.create({ ...req.body });
    res.json(userData);
  }
}

export default UserController;
