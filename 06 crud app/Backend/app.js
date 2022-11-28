require("dotenv").config()
const express = require("express")
require("./config/dbConnect").connectToDb()
const userRoutes = require("./routes/userRoutes")

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/", userRoutes)

module.exports = app
