
const { application } = require('express')
const express = require('express')
const app = express()
const port = 3000

app.get("/", (req, res)=>{
    res.send("Hello Shivanand")
})


app.get("/socials",(req, res)=>{
    res.send("Instagram")
})

app.get("/features",(req, res)=>{
    // res.send("A app bult for testing")
    res.status(200).send("A app bult for testing")

})

app.get("/insta",(req, res)=>{
    const instagram = {
        useName: "Shivanand_10",
        followers: 200,
        follow: 300,
    }
    res.status(200).json({instagram})
})

app.get("/api/user/:name",(req, res)=>{
    console.log(req.params.name);
    res.status(200).json({params: req.params.name})
})




app.listen(port, ()=>{
    console.log(`I'm listening at port ${port}`);
})