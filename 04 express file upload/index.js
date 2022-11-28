const express = require("express")


const app = express()
app.set("view engine", "ejs")

app.use(express.json())
app.use(express.urlencoded({extended: true}))
// view engine middleware

app.get("/", (req, res)=>{
    res.send("home page")
})

app.get("/myget", (req, res)=>{
    console.log(req.body);
    res.send(req.body)
})

//rendreing the page
app.get("/getform", (req, res)=>{
    res.render("getform")
})

app.listen(4000, ()=>{
    console.log("server is running at port 4000");
})