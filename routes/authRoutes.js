const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

router.post("/login", async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const isMatch = password === user.password;

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successfully completed",
      token,
      user
    });

  } catch (error) {

    console.log(error);

    res.status(500).json(error);
  }

})

router.put('/change-password/:id',async(req,res)=>{
  try{
    const{currentPassword,newPassword} = req.body;

    // Find the user
    const user = await User.findById(req.params.id)

    if(!user){
      return res.status(404).json({message:"User not found"})
    }

    // old vs new
    const isMatch = await bcrypt.compare(currentPassword,user.password);
    if(!ismatch){
      return res.status(400).json({message:"Current password is invalid"})
    }
    // Hashpassword
    const Hashpassword = await bcrypt.hash(newPassword,10);
    await User.save()
    res.status(200).json({message:"Password updated successfully"})

  }catch(err){
    console.log(err);
    
    res.status(500).json({
      message:"server error"
    })
  }
})
module.exports = router