const express = require("express");
const Router = express.Router();
const User = require("../model/user");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/auth");
const dotenv = require("dotenv");
const user = require("../model/user");
dotenv.config();

//Dang ki
//post /register
Router.post("/register", async (req, res) => {
  const user = req.body;
  const { password } = user;

  if (!user) {
    return res.status(400).json({ success: false, message: "Thất bại" });
  }
  try {
    const existUser = await User.findOne({ username: user.username });
    if (existUser) {
      return res
        .status(400)
        .json({ success: false, message: "Tài khoản đã tồn tại" });
    }
    const hashPassword = await argon2.hash(password);
    const newUser = new User({ ...user, password: hashPassword });
    await newUser.save();

    //create accessToken
    const accessToken = jwt.sign(
      { userId: newUser._id, isAdmin: newUser.isAdmin },
      process.env.ACCESS_TOKEN_SECRET
    );

    res.json({
      success: true,
      message: "Tạo tài khoản thành công",
      accessToken: accessToken,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, message: "Thất bại" });
  }
});

//Dang nhap
// POST /loggin

Router.post("/loggin", async (req, res) => {
  const username = req.body.username;
  const checkPassword = req.body.password;

  try {
    const user = await User.findOne({ username: username });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Sai tên đăng nhập hoặc mật khẩu" });
    }

    const valid = await argon2.verify(user.password, checkPassword);
    if (!valid) {
      return res
        .status(400)
        .json({ success: false, message: "Sai tên đăng nhập hoặc mật khẩu" });
    }
    
    //create accessToken
    const accessToken = jwt.sign(
      { userId: user._id, isAdmin: user.isAdmin },
      process.env.ACCESS_TOKEN_SECRET
    );
    const { password, ...data } = user._doc;
    return res.json({
      success: true,
      message: "Đăng nhập thành công",
      data: data,
      accessToken: accessToken,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, message: "Đăng nhập thất bại" });
  }
});

//check user login
//GET /
Router.get("/", verifyToken, async (req, res) => {
  const userId = req.userId;
  try {
    const user = await User.findById(userId).select("-password");
    return res.json({ success: true, message: "Thành công", data: user });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, message: "Đăng nhập thất bại" });
  }
});

module.exports = Router;
