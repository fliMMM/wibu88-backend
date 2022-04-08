const express = require('express');
const Router = express.Router();
const User = require('../model/user');
const argon2 = require('argon2');


//Dang ki
//post /register
Router.post('/register', async (req,res)=>{
  const user = req.body;
  const {password} = user;

  if(!user){
    return res.status(400).json({success:false, message: "Thất bại"})
  }
  try{
    const existUser = await User.findOne({username: user.username})
    if(existUser){
      return res.status(400).json({success:false, message: "Tài khoản đã tồn tại"})
    }
    const hashPassword = await argon2.hash(password);
    const newUser = new User({...user, password:hashPassword});
    await newUser.save();
    res.json({success:true, message: "Tạo tài khoản thành công", data:newUser})
  }catch(err){
    console.log(err);
    res.status(400).json({success: false, message: "Thất bại"})
  }
})

//Dang nhap
// POST /loggin

Router.post('/loggin', async (req,res)=>{
  const {username, password} = req.body;

  try{
    const user = await User.findOne({username:username, password:password})
    if(user){
     return res.json({success:true, message: "Đăng nhập thành công"})
    }
    res.status(400).json({success:false, message: "Đăng nhập thất bại"})
  }catch(err){
    console.log(err);
    res.status(400).json({success:false, message: "Đăng nhập thất bại"})
  }
})




module.exports = Router;