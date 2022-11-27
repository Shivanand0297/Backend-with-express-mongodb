require("dotenv").config()
const express = require("express")
require("./config/dbConnect").connectToDb()
const userRoutes = require("./routes/userRoutes")

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/", userRoutes)
//app.get("/routes", (callback)=>{})
// app.use("/createUser", userRoutes)
// app.get("/getUsers", userRoutes)
// app.post("/editUser", userRoutes)
// app.post("/deleteUser", userRoutes)

module.exports = app
