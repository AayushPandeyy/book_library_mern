import User from "../model/User.js";

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

  async destroy(req,res){
    let id = req.params.id;
    await User.findByIdAndDelete(id);
    return res.status(201).json({ status: true, message: "Success"});    
  }
}

export default UserController;
