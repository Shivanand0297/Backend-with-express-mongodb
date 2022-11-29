// bring all the envirement variables
require("dotenv").config()
// connecting to db
require("./config/dbconnect").dbConnect()
// importing cors to enable request access from another host
const cors = require("cors")
const express = require("express")
const routes = require("./routes/userRoutes")

const corsOptions = {
    origin: "http://127.0.0.1:6000"
}


const app = express()
app.use(cors(corsOptions))
// middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.use("/", routes)



module.exports = app
