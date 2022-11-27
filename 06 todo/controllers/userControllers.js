const User = require("../models/userModel")

exports.home = (req, res)=>{
    res.status(201).send("welcome to todo app")
}


exports.createUser = async(req, res)=>{
    try {
        const {name, email} = req.body

        //validate
        if(!(name && email)){
            // res.send("both email and password is required")
            throw new Error("both email and password is required")
        } 
        const existingUser = await User.findOne({email: email})
        if(existingUser){
            throw new Error("user already exists")
        }
        // inserting into database
        const user = await User.create({name, email})
        res.status(201).json({
            success: true, 
            message: "user created successfully", 
            user,
        })
    } catch (error) {
        console.log(error.message);
    }
}

/* const home = (req, res)=>{
    res.status(201).send("welcome to todo app")
}

module.exports = {home} because controller can be many so we are destructuring it here */

exports.getUsers = async (req, res)=>{
    try {
        const users = await User.find()
        res.json({
            success: true, 
            users,
        })

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

exports.editUser = async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body);
      res.status(200).json({
        success: true,
        message: "User updated Successfully",
        user
      });
    } catch (error) {
      console.log(error);
      res.status(401).json({
        success: false,
        message: error.message,
      });
    }
  };
  
  exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        res.status(200).json({
          success: true,
          message: "User deleted Successfully",
          user
        });
      } catch (error) {
        console.log(error);
        res.status(401).json({
          success: false,
          message: error.message,
        });
      }
  };