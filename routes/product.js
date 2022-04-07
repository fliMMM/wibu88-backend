const express = require('express');
const Product = require('../model/product');
const Router = express.Router();

//creatt product 
// POST /
Router.post('/create', async (req,res)=>{
  const product = req.body;
  if(!product){
    return res.status(400).json({success:false, message: "Hãy nhập đầy đủ thông tin sản phẩm"})
  }
  try{
    const newProduct = new Product({...product})
    await newProduct.save();
    res.json({success:true, message:"Thêm sản phẩm thành công", data: newProduct})
  }catch(err){
    console.log(err);
    res.status(400).json({success:false, message:"Thất bại"})
  }
})

//delete product
// DELETE /delete
Router.delete('/delete/:id', async (req,res)=>{
  const id = req.params.id;

  try{
    const deletedProduct = await Product.findByIdAndUpdate(id,{isDelete: true});
    res.json({success:true, message:"Xóa sản phẩm thành công", deleted: deletedProduct})
  }catch(err){
    console.log(err);
    res.status(400).json({success:false, message:"Thất bại"})
  }
})

//get product
// GET /
Router.get('/', async (req, res)=>{
  try{
    const productList = await Product.find({isDelete:false});
    res.json({success:true, message:"thành công", data: productList})
  }catch(err){
    console.log(err);
    res.status(400).json({success:false, message:"Thất bại"})
  }
})

//chinh sua
//put /update
Router.put('/update/:id', async (req,res)=>{
  const id = req.params.id;
  const product = req.body;

  try{
    await Product.findByIdAndUpdate(id, {...product})
    res.json({success:true, message: "Cập nhật thành công"})
  }catch(err){
    console.log(err);
    res.status(400).json({success:false, message:"Thất bại"})
  }
})


module.exports = Router;