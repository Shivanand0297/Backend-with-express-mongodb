// WE NEED TO LOAD .env file here
require("dotenv").config()   //.env is in the root directry
// require("dotenv").config() to configure the .env file
// require("dotenv").config({}) is means that .env is not in the root directry it is present somwhere else
const express = require("express")
const app = express();
const user = require("./model/user")

app.get("/", (req, res)=>{
    res.send("<h1>hi there</h1>");
})

app.post("/signup", async (req, res)=>{
    // const firstName = req.body.firstname
    // const lastName = req.body.lastname
    // have to do this for all variables so best approch will be

    const { firstname, lastname, email, password} = req.body;

    // checking for required field

    if (!(firstname && lastname && email && password)){
        res.status(400).send("there are mandatory")
    }

    // checking for unique email id of the user, so for that we need to import the user above

    const existingUser =  await user.findOne(email)    // this will look for one unique email id, so it will take time
    if(existingUser){
        res.status(400).send("User already exists")
    }

})





module.exports = app;   