const express = require('express');
const Router = express.Router();
const User = require('../model/user')


//Dang ki
//post /register
Router.post('/register', async (req,res)=>{
  console.log("hehe");
  const user = req.body;

  if(!user){
    return res.status(400).json({success:false, message: "Thất bại"})
  }
  try{

    const existUser = await User.findOne({username: user.username})
    if(existUser){
      return res.status(400).json({success:false, message: "Tài khoản đã tồn tại"})
    }
    
    const newUser = new User({...user});
    await newUser.save();
    res.json({success:true, message: "Tạo tài khoản thành công", data:user})
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