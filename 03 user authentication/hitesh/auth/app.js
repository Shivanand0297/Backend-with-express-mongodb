// getting the db url
require('dotenv').config()

//TODO: 1 connecting database at the starting of the app which will start my application
require("./config/databaseConnect").dbConnect()

// TODO: 2 for creating routes we need express
const express = require("express")

//  for creating tokens
const jwt = require("jsonwebtoken")

// for crypting password
const bcrypt = require("bcryptjs")

// import models - user
const User = require("./models/user")   //"User" good practice
// const user = require("./models/user")

// for accessing user cookies
const cookieParser = require('cookie-parser')

// custom middleware
const Auth = require("./middleware/auth")

const app = express()
app.use(express.json()) // will come back to this later on, this is a middleware, whenever we want to extrate some inforamtion from req.body we have to use app.use(express.json()), some data is coming in the json so we need to accept it as middleware
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded for getting values from form
app.use(cookieParser())     // TODO: automatically takes the cookies from the user browser and inject it into the req object so that for 1000no of files we dont need to import cookie-parser again and again for example in auth.js file we don't need to import cookie parser again

// creating route
app.get("/",(req, res) => {
    res.send("hello auth system")
})

// for /register route
// 1 . first we need to collect all the information form the fronend and look for req.body

app.post("/register", async (req, res)=>{
   // console.log(req.body);  // we cannot goahead wiht the req.body because that will give us the whole information
   // const {firstname, lastname, email, password} = req.body // still database is in another continent we need to wait for it
    // and also before getting data there might be possiblity that data is undefined, so its always good to check it before hand

    try {
        // 1. collect all information
        const {firstname, lastname, email, password} = req.body // we are not connecting with database here or touching database, all the information is comming from req.body. so we dont need to use await here and by default its value is undefined so we will use try

        // 2. validate data
        if(!(firstname && lastname && email && password)){
            res.status(401).send("all fields are required") //401 is a server code client side error
        }
        
        // 3. check if user exists or not and since it is a database call we use await here
        const existingUser = await User.findOne({email: email})  //since user.findOne will return someting if it find it in the database so we need to store it in database

        // const existingUser = await User.findOne({email}) // if both the varable are same

        // check if email is in correct format

        if(existingUser){
            res.status(401).send("User already exists in database") //401 is a server code
        }

        // 4. encrypt the password
        const encryptedPassword = await bcrypt.hash(password, 10)

        // 5. create a new entry to database and send a key(token)
        const newUser = await User.create({
            firstname: firstname,   // left firstname is from model and right firstname is form req.body variable
            lastname: lastname,
            email: email, 
            password: encryptedPassword
        })

        // can also use this
        /* await User.create({   
            firstname, 
            lastname,
            email, 
            password: encryptedPassword
        }) */

        // 6. create a token and send it to user
        const token = jwt.sign({
            id: newUser._id,
            email //optional
        }, "shhhh", {expiresIn: "2h"})

        newUser.token = token  // we are sending it to frontend not the backend

        // we dont want to send the password
        newUser.password = null    // or undefined

        res.status(201).json(newUser)  //sent to frontend
    } catch (error) {
        console.log(error);
        console.log("error in register response route");
    }
})


app.post("/login", async (req, res)=>{
    try {
        // 1. collect all information from frontend
        const {email, password} = req.body

        // 2. validate, if no info, send a note
        if (!(email && password)) {
            res.status(401).send("Both email and password are required")

        }
        // 3. check if user exists in DB or not
        const user = await User.findOne({email})  // User.findOne({email: email})
        
        // if user doesnot exists - assingment TODO:
        if (!user){
            res.status(401).send("user not found")
        }

        // 4. match the password- if exists
        if (user && (await bcrypt.compare(password, user.password))){    // first password is what user has just entered and second one is from database user{} object to compare
            
            const token = jwt.sign({id: user._id, email}, "shhhh", {expiresIn: "2h"})        // this secret and expiresIn should be same so it is better to store it in some variable

            user.password = undefined
            user.token = token
            
            // cookies options
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 *1000),  // mili seconds
                httpOnly: true
            }
            res.status(200).cookie("token", token, options).json({
                success: true, 
                token, 
                user, 
            })
        }

        res.sendStatus(400).send("email or password is incorrect")

        // 5. create a key for user and send it        
    } catch (error) {
        console.log(error);
    }
})

// /dashboard

// assuming the user is successfully logged in
//varify the cookies and allow to login to dashboard

app.get("/dashboard", Auth, (req, res)=>{      //Auth is a middleware
/* 
    // we don't have anything to access cookies for that we need cookies parser
    console.log("req.cookies:",req.cookies);
    const token = req.cookies.token     //since we saved cookies with the key named token
    // also const {token, something} = req.cookies
    //  const token = req.cookies

    // checking if token is missing
    if (!token) {
        res.status(403).send("access denied")
    }

    // if present varify the token by jwt since it takes time we will run it in the try catch block
    try {
        const decodeToken = jwt.verify(token, "shhhh")  // we will get {id: user._id, email} object
        console.log("decodeToken:", decodeToken);
        //creating another property in the req object as user and adding decodeToken value
        req.user = decodeToken;

        // extract id from the decodeToken and query the db (will do in the maga project)
    } catch (error) {   
        console.log(error);
    } */
    res.send("welcome to dashboard")
})

//we need to check for the token for every route
/* 
app.get("/settings",(req, res)=>{
    
})
app.get("/about",(req, res)=>{

})
so for this we need middleware 
*/

app.get("/profile", Auth, (req, res )=>{
    //access to req.user = id, email

    // based on id query the database and get all the information of user - findOne({id})

    // send a json response with all data
})

module.exports = app