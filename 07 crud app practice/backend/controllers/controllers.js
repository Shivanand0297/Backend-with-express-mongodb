const User = require("../models/user")

exports.home = (req, res)=>{
    res.status(200).send("Welcome to Crud")
}

exports.createUser = async (req, res)=>{
    try {
        const {name, email} = req.body
        // validating the input
        if(!name || !email){
            res.status(401).send("both name and email is required")
        }
        // checking for already existing user
        const existingUser = await User.findOne({email})
        if(existingUser){
            res.status(401).send("user already present with this email id")
        }

        // creating the entry in the database
        const user = await User.create({name, email})
        res.status(201).json({
            success: true, 
            message: "user created successfully",
            user,
        })
    
    } catch (error) {
        console.log(error);
    }
}

exports.getUsers = async (req, res)=>{
    try {
        const users = await User.find()
        res.status(201).json({
            success: true,
            users,
        })
    } catch (error) {
        console.log(error);
    }
}

exports.editUser = async (req, res)=>{
    try {
        const editedUser = await User.findByIdAndUpdate(req.params.id, req.body)
        res.status(201).json({
            success: true, 
            message: "user updated successfully",
            editedUser
        })
    } catch (error) {
        console.log(error);
        res.status(401).json({
            success: false, 
            message: error.message,
        })
    }
}

exports.deleteUser = async (req, res)=>{
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id)
        res.status(201).json({
            success: true, 
            message: "user deleted Successfully",
            deletedUser,
        })
    } catch (error) {
        res.status(401).json({
            success: false, 
            message: error.message,
        })
    }
}