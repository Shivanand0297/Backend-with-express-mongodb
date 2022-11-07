require("./config/DBconnect").DBconnect()
const express = express();
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

// importing model Users
const User = require("./models/user");

// creating routes
const app = express()

app.get("/",(req, res)=>{
    res.send("database connected")
})


// for register
app.post("/register", async (req, res)=>{
    // all information is in req.body
    try {
        // 1. collecting all the information
        const {firstname, lastname, email, password} = req.body

        // 2. validate if no information
        if(!(firstname && lastname && email && password)){
            res.status(401).send("all fields are required")
        }

        // 3. check if already exists
        const existingUser = await User.findOne({email: email})
        if(existingUser){
            res.send("alredy exists")
        }

        // 4. encrypt the password
        const encryptedPassword = await bcrypt.hash(password, 10)

        // 5. save to db 
        const user = await User.create({
            firstname, 
            lastname, 
            email, 
            password: encryptedPassword,
        })

        // 6. create a token and send it to user

        const token = jwt.sign({
            id: user._id,
            email,
        },"secret",{expiresIn: "2h"} )

        // appending the user to create
        user.token = token
        user.password = undefined   //or null

        res.status(201).json(user)

    } catch (error) {
        console.log(error);
    }
})


// for login
app.post("/login", async (req, res)=>{
    
    try {
        // 1. get all the information
        const {email, password} = req.body

        // 2. validate all information
        if(!(email && password)){
            res.status(401).send("both email and password are required")
        }

        // 3. check if user exists in database
        const user = await User.findOne({email: email})
        
        // 4. match the password
        if(user && ( await bcrypt.compare(password, user.password))){
        
            // 5. create a token and send it to user
            const token = jwt.sign({
               id: user._id,
               email 
            }, "secret", {expiresIn: "2h"})

            user.password = null
            user.token = token


            // cookies options
            const options = {
                expires: new Date(Date().now + 3*24*60*60*1000),
                httpOnly: true
            }
            res.status(201).cookie("token", token, options).json({
                token, 
                user,
            })
        }

        res.status(401).send("email and password doesnt match")

    } catch (error) {
        console.log(error);
    }

})