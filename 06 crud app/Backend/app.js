require("dotenv").config()
const express = require("express")
const cors = require("cors")
require("./config/dbConnect").connectToDb()
const userRoutes = require("./routes/userRoutes")

const corsOptions ={
    origin:'http://localhost:3000'
}

const app = express()
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use("/", userRoutes)

module.exports = app
